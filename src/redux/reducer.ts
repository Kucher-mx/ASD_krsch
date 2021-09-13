import { types } from "./actionTypes";
import { Action, StateType } from "./types/reducer.types";
const initialState: StateType = {
  data: [],
  inputValue: "",
  selectValue: "",
  loading: true,
};

export default function rootReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.SET_DATA:
      return { ...state, data: action.payload };
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.SET_INPUT_VALUE:
      return { ...state, inputValue: action.payload };
    case types.SET_SELECT_VALUE:
      return {
        ...state,
        selectValue: action.payload.value,
      };
    default:
      return state;
  }
}
