import React, { Dispatch, useEffect } from "react";

import { connect } from "react-redux";
import { setDataAction, setLoading } from "./redux/actions";
import { Action, CoinType, StateType } from "./redux/types/reducer.types";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import List from "./components/List/List.component";
import Header from "./components/Header/Header.component";
import { fetchDataAndSet } from "./helpers/helpers";

type Props = {
  data: CoinType[];
  inputValue: string;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setData: (data: CoinType[]) => void;
};

const App = (props: Props) => {
  useEffect(() => {
    fetchDataAndSet({
      url: "https://api.nomics.com/v1/currencies/ticker?key=1e911955aee02245962e1da42d7edb1528a05475&&interval=1d,30d&convert=EUR&attributes=id,name,logo_url,price,price_timestamp&page=1&per-page=50",
      setToState: props.setData,
      setLoading: props.setLoading,
    });
  }, []);
  return (
    <div className="app">
      {props.isLoading ? (
        <Loader type="ThreeDots" color="#000000" height={300} width={500} />
      ) : (
        <>
          <Header />
          <List data={props.data} inputValue={props.inputValue} />
        </>
      )}
    </div>
  );
};

const MapStateToProps = (state: StateType) => {
  return {
    data: state.data,
    inputValue: state.inputValue,
    isLoading: state.loading,
  };
};

const MapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    setData: (data: CoinType[]) => dispatch(setDataAction(data)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
