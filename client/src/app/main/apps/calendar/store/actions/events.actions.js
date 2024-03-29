import axios from 'axios';
import firebaseService from 'app/services/firebaseService';

export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';

export const getEvents = () => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('appointments')
      .get();
    let test = [];

    response.forEach((doc) => {
      let event = doc.data();
      event.start = event.start.toDate();
      event.end = event.end.toDate();
      event.firebaseId = doc.id;
      test.push(event);
    });

    dispatch({
      type: GET_EVENTS,
      payload: test
    });
  } catch (error) {
    console.log(error);
  }
};

export function openNewEventDialog(data) {
  return {
    type: OPEN_NEW_EVENT_DIALOG,
    data
  };
}

export function closeNewEventDialog() {
  return {
    type: CLOSE_NEW_EVENT_DIALOG
  };
}

export function openEditEventDialog(data) {
  return {
    type: OPEN_EDIT_EVENT_DIALOG,
    data
  };
}

export function closeEditEventDialog() {
  return {
    type: CLOSE_EDIT_EVENT_DIALOG
  };
}

export function addEvent(newEvent) {
  return (dispatch, getState) => {
    const request = axios.post('/api/calendar-app/add-event', {
      newEvent
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: ADD_EVENT
        })
      ]).then(() => dispatch(getEvents()))
    );
  };
}

export function updateEvent(event) {
  return (dispatch, getState) => {
    const request = axios.post('/api/calendar-app/update-event', {
      event
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: UPDATE_EVENT
        })
      ]).then(() => dispatch(getEvents()))
    );
  };
}

export function removeEvent(eventId) {
  return (dispatch, getState) => {
    const request = axios.post('/api/calendar-app/remove-event', {
      eventId
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: REMOVE_EVENT
        })
      ]).then(() => dispatch(getEvents()))
    );
  };
}
