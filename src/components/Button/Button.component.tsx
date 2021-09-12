import React from "react";
import { Button as ButtonMaterial } from "@material-ui/core";

import "./button.css";

type Props = {
  title: string;
  onClickHandler: any;
};

const Button = (props: Props) => {
  return (
    <div>
      <ButtonMaterial onClick={() => props.onClickHandler()}>
        {props.title}
      </ButtonMaterial>
    </div>
  );
};

export default Button;
