import React, { Dispatch } from "react";
import { NativeSelect } from "@material-ui/core";

import "./select.css";
import { connect } from "react-redux";
import { SetSelectValue } from "../../redux/actions";
import { Action, StateType } from "../../redux/types/reducer.types";

type Props = {
  name: "sort" | "second";
  options: { value: string; optionName: string }[];
  selectValue: string;
  setSelectValue: (val: string) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = (props: Props) => {
  return (
    <div className="select_wrapper">
      <NativeSelect
        value={props.selectValue}
        onChange={(e) => {
          props.setSelectValue(e.target.value);
          props.onChangeHandler(e);
        }}
        inputProps={{
          name: props.name,
          id: props.name + "_id",
        }}
        className="select"
      >
        <option value="default">by rank (default)</option>
        {props.options.map(({ optionName, value }) => (
          <option value={value} key={value + "_key"}>
            {optionName}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  selectValue: state.selectValue,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setSelectValue: (val: string) => dispatch(SetSelectValue(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
