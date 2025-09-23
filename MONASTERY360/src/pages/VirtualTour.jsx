import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMonasteryStore } from "../store/monasteryStore";

const IframeErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <div className="p-4 bg-red-100 text-red-700 rounded text-center">
      Virtual Tour failed to load. Please try again later.
    </div>
  ) : (
    <div
      onError={() => setHasError(true)}
      onLoad={() => setHasError(false)}
      className="w-full"
    >
      {children}
    </div>
  );
};

const VirtualTour = () => {
  const { id } = useParams();
  const monastery = useMonasteryStore((state) => state.getMonasteryById(id));

  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Guard: Monastery not found
  if (!monastery) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Monastery not found.
        </h2>
      </div>
    );
  }

  // Guard: No virtual tour
  if (!monastery.hasVirtualTour || !monastery.virtualTourId) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          Virtual tour not available for {monastery.name}.
        </h2>
      </div>
    );
  }

  // Set offline_id before iframe loads
  useEffect(() => {
    window.offline_id = monastery.virtualTourId;
  }, [monastery]);

  // Optional: Device motion handling
  useEffect(() => {
    const handleDeviceMotion = (e) => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !loaded) return;

      const safeEvent = {
        acceleration: {
          x: e.acceleration?.x ?? 0,
          y: e.acceleration?.y ?? 0,
          z: e.acceleration?.z ?? 0,
        },
        accelerationIncludingGravity: {
          x: e.accelerationIncludingGravity?.x ?? 0,
          y: e.accelerationIncludingGravity?.y ?? 0,
          z: e.accelerationIncludingGravity?.z ?? 0,
        },
        rotationRate: {
          alpha: e.rotationRate?.alpha ?? 0,
          beta: e.rotationRate?.beta ?? 0,
          gamma: e.rotationRate?.gamma ?? 0,
        },
        interval: e.interval,
        timeStamp: e.timeStamp,
      };

      iframe.contentWindow.postMessage(
        { type: "devicemotion", deviceMotionEvent: safeEvent },
        "*"
      );
    };

    window.addEventListener("devicemotion", handleDeviceMotion);
    return () => window.removeEventListener("devicemotion", handleDeviceMotion);
  }, [loaded]);

  return (
    <IframeErrorBoundary>
      <iframe
        ref={iframeRef}
        id="tour-embeded"
        name={monastery.name}
        src={`https://tour.panoee.net/iframe/${monastery.virtualTourId}`}
        frameBorder="0"
        width="100%"
        height="500px"
        scrolling="no"
        allow="accelerometer; gyroscope; autoplay"
        allowFullScreen
        loading="eager"
        title={`Virtual Tour of ${monastery.name}`}
        onLoad={() => setLoaded(true)}
      />
    </IframeErrorBoundary>
  );
};

export default VirtualTour;
