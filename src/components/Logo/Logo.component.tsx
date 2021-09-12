import React from "react";
import "./logo.css";

const Logo = (props: { title: string }) => {
  return <h1 className="title">{props.title}</h1>;
};

export default Logo;
