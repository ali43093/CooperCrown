import * as Actions from '../actions';

const initialState = {
  data: null,
  email: null,
  password: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ACCOUNT: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SET_CHANGE_EMAIL: {
      return {
        ...state,
        email: action.payload
      };
    }
    case Actions.SET_CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload
      };
    }
    case Actions.SAVE_PRODUCT: {
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

export default productReducer;
