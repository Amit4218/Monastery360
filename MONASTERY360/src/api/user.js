import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const getData = async () => {
  try {
    const data = await axios.get(`${BASEURL}/user/get-booking-data`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    const homeStayBookings = localStorage.setItem(
      "homeStayBooking",
      data.data.HomeStayData
    );

    const tourBookings = localStorage.setItem(
      "tourBookings",
      data.data.tourData
    );

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const postHomeStay = async ({
  id,
  name,
  distance,
  location,
  price,
  rating,
  reviews,
  image,
  host,
  checkIn,
  checkOut,
  guests,
  fullName,
  email,
  phone,
}) => {
  try {
    const response = await axios.post(
      `${BASEURL}/user/home-stay`,
      {
        id,
        name,
        distance,
        location,
        price,
        rating,
        reviews,
        image,
        host,
        checkIn,
        checkOut,
        guests,
        fullName,
        email,
        phone,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.user;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const postTour = async ({
  type,
  tourName,
  date,
  guest,
  cab,
  guide,
  fullName,
  email,
  phone,
  specialRequests,
  totalPrice,
}) => {
  try {
    const response = await axios.post(
      `${BASEURL}/user/tour`,
      {
        type,
        tourName,
        date,
        guest,
        cab,
        guide,
        fullName,
        email,
        phone,
        specialRequests,
        totalPrice,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.user;
  } catch (error) {
    console.error(error);
    return;
  }
};
