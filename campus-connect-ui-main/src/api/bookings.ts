import API from "./api";

export const bookEvent = (eventId: string) =>
  API.post(`/bookings/${eventId}`);

export const getMyBookings = () =>
  API.get("/bookings/me");