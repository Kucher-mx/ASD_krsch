import React from "react";
import { CoinType } from "../../redux/types/reducer.types";
import "./listItem.css";

type Props = {
  listItem: CoinType;
};

const ListItem = (props: Props) => {
  const { logo_url, name, rank, status, price } = props.listItem;
  return (
    <div className="list-item">
      <div className="left">
        <div className="img_wrapper">
          <img src={logo_url} alt="" className="list-item_img" />
        </div>

        <span className="coinParam name">{name}</span>

        <span className="coinParam price">{price}</span>
      </div>

      <div className="right">
        <span className="price-change">
          {parseFloat(props.listItem["1d"].price_change).toFixed(2)}
        </span>
        {parseFloat(props.listItem["1d"].price_change) < 0 ? (
          <i className="arrow down"></i>
        ) : (
          <i className="arrow up"></i>
        )}
        <span className="coinParam rank">rank: {rank}</span>
        <span className="coinParam status">{status}</span>
      </div>
    </div>
  );
};

export default ListItem;
