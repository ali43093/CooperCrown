import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';

import firebaseService from 'app/services/firebaseService';
export const ADD_PRODUCT = '[E-COMMERCE APP] ADD PRODUCT';
export const GET_PRODUCT = '[E-COMMERCE APP] GET PRODUCT';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';

export const getProduct = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('showRooms')
      .doc(params)
      .get();

    const showRoom = { id: response.id, ...response.data() };
    dispatch({
      type: GET_PRODUCT,
      payload: showRoom
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveShowRoom = (data) => async (dispatch) => {
  delete data.uid;
  try {
    const dbConfig = (
      await firebaseService.firestoreDb
        .collection('dbConfig')
        .doc('dbConfig')
        .get()
    ).data();
    await firebaseService.firestoreDb
      .collection('showRooms')
      .add({ ...data, showRoomId: dbConfig?.showRoomId + 1 });
    await firebaseService.firestoreDb
      .collection('dbConfig')
      .doc('dbConfig')
      .update({
        showRoomId: dbConfig?.showRoomId + 1
      });
    dispatch(Actions.getShowRooms());
    dispatch(showMessage({ message: 'Show Room Saved' }));
  } catch (error) {
    console.log(error);
  }
};
export const updateShowRoom = (data) => async (dispatch) => {
  const uuid = data.id;
  delete data.id;
  try {
    await firebaseService.firestoreDb
      .collection('showRooms')
      .doc(uuid)
      .update(data);
    dispatch(Actions.getShowRooms());
    dispatch(showMessage({ message: 'Show Room Update' }));
  } catch (error) {
    console.log(error);
  }
};

export function newShowRoom() {
  const data = {
    uid: FuseUtils.generateGUID(),
    locationName: '',
    locationAddress: '',
    State: '',
    City: '',
    zipCode: ''
  };

  return {
    type: ADD_PRODUCT,
    payload: data
  };
}
