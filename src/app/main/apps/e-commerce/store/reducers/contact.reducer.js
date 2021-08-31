import * as Actions from '../actions';

const initialState = {
  data: null
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CONTACT: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_CONTACT: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default contactReducer;
