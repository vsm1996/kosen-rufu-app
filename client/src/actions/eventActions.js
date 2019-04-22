import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "./types";

// Add event
export const addEvent = eventData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/events", eventData)
    .then(res =>
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Event
export const getEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/events/${id}`)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT,
        payload: null
      })
    );
};

// Get Events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/api/events")
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/events/like/${id}`)
    .then(res => dispatch(getEvents()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/events/unlike/${id}`)
    .then(res => dispatch(getEvents()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add comment
export const addComment = (eventId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/events/comment/${eventId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete comment
export const deleteComment = (eventId, commentId) => dispatch => {
  axios
    .delete(`/api/events/comment/${eventId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Event
export const deleteEvent = id => dispatch => {
  axios
    .delete(`/api/events/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EVENT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: err.response.data
      })
    );
};

// Set loading state

export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

// Clear errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
