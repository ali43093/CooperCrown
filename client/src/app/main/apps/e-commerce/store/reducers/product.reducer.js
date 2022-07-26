import * as Actions from '../actions';

const initialState = {
	data: null
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.ADD_PRODUCT: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.GET_PRODUCT: {
			return {
				...state,
				data: action.payload
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
