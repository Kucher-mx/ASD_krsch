import React, { Dispatch } from "react";
import { Input } from "@material-ui/core";

import "./input.css";
import { connect } from "react-redux";
import { Action, StateType } from "../../redux/types/reducer.types";
import { SetInputValue } from "../../redux/actions";

const InputCmp = (props: {
  inputValue: string;
  setInputValue: (val: string) => void;
}) => {
  return (
    <div className="input_wrapper">
      <Input
        className="input"
        placeholder="Enter currency name"
        value={props.inputValue}
        onChange={(e) => props.setInputValue(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  inputValue: state.inputValue,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setInputValue: (val: string) => dispatch(SetInputValue(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputCmp);
