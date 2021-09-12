import React, { Dispatch } from "react";
import Input from "../Input/Input.component";
import Logo from "../Logo/Logo.component";
import Select from "../Select/Select.component";
import Button from "../Button/Button.component";

import "./header.css";
import { Action } from "redux";
import {
  downloadData,
  fetchDataAndSet,
  quickSort,
  shellSort,
} from "../../helpers/helpers";
import { setDataAction, setLoading } from "../../redux/actions";
import { CoinType, StateType } from "../../redux/types/reducer.types";
import { connect } from "react-redux";

const sortOptions = [
  {
    value: "quick",
    optionName: "sort by prise change (quick)",
  },
  {
    value: "shell",
    optionName: "sort by price (shell)",
  },
];

type Props = {
  data: CoinType[];
  setLoading: (loading: boolean) => void;
  setData: (data: CoinType[]) => void;
};

const Header = (props: Props) => {
  const updateOnClickHandler = () =>
    fetchDataAndSet({
      url: "https://api.nomics.com/v1/currencies/ticker?key=1e911955aee02245962e1da42d7edb1528a05475&&interval=1d,30d&convert=EUR&attributes=id,name,logo_url,price,price_timestamp&page=1&per-page=50",
      setToState: props.setData,
      setLoading: props.setLoading,
    });

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "quick") {
      const sortedData = quickSort(props.data, 0, props.data.length - 1);
      props.setLoading(true);
      props.setData(sortedData);
      props.setLoading(false);
    } else if (e.target.value === "default") {
      const sortedData = props.data.sort(
        (itemOne, itemTwo) => itemOne.rank - itemTwo.rank
      );
      props.setLoading(true);
      props.setData(sortedData);
      props.setLoading(false);
    } else {
      // const sortedData = shellSort(props.data);
      const sortedData = props.data.sort(
        (itemOne, itemTwo) => itemTwo.price - itemOne.price
      );
      props.setLoading(true);
      props.setData(sortedData);
      props.setLoading(false);
    }
  };

  const downloadDataHandler = () =>
    downloadData(props.data || null, "cryptoDashboardData");
  return (
    <div className="header">
      <Logo title="crypto dashboard" />
      <div className="wrapper">
        <Select
          name="sort"
          options={sortOptions}
          onChangeHandler={onChangeHandler}
        />
        <Input />
        <div className="button_group">
          <Button
            title="Update dashboard"
            onClickHandler={updateOnClickHandler}
          />
          <Button title="Download data" onClickHandler={downloadDataHandler} />
        </div>
      </div>
    </div>
  );
};

const MapStateToProps = (state: StateType) => {
  return {
    data: state.data,
  };
};

const MapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    setData: (data: CoinType[]) => dispatch(setDataAction(data)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Header);
