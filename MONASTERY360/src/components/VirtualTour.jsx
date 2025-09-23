import { useEffect, useRef } from "react";

const VirtualTour = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleDeviceMotion = (e) => {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.contentWindow.postMessage(
          {
            type: "devicemotion",
            deviceMotionEvent: {
              acceleration: e.acceleration,
              accelerationIncludingGravity: e.accelerationIncludingGravity,
              rotationRate: e.rotationRate,
              interval: e.interval,
              timeStamp: e.timeStamp,
            },
          },
          "*"
        );
      }
    };

    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="tour-embeded"
      name="ranka_monestry"
      src="https://tour.panoee.net/iframe/68cffb442021a246b1906045"
      frameBorder="0"
      width="100%"
      height="400px"
      scrolling="no"
      allowvr="yes"
      allow="vr; xr; accelerometer; gyroscope; autoplay;"
      allowFullScreen={false}
      webkitallowfullscreen={false}
      mozallowfullscreen={false}
      loading="eager"
    />
  );
};

export default VirtualTour;
