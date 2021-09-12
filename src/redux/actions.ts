import { CoinType } from "./types/reducer.types";
import { types } from "./actionTypes";

export const setDataAction = (data: CoinType[]) => ({
  type: types.SET_DATA,
  payload: data,
});

export const SetInputValue = (value: string) => ({
  type: types.SET_INPUT_VALUE,
  payload: value,
});

export const SetSelectValue = (value: string) => ({
  type: types.SET_SELECT_VALUE,
  payload: value,
});

export const updateDashboard = (data: CoinType[]) => ({
  type: types.UPDATE_DASHBOARD,
  payload: { data },
});

export const setLoading = (loading: boolean) => ({
  type: types.SET_LOADING,
  payload: loading,
});
