import API from "./api";

export const getEvents = () => API.get("/events");

export const getEventById = (id: string) =>
  API.get(`/events/${id}`);

export const createEvent = (data: any) =>
  API.post("/events", data);

export const deleteEvent = (id: string) =>
  API.delete(`/events/${id}`);
