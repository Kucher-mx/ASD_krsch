import React from "react";
import { CoinType } from "../../redux/types/reducer.types";
import ListItem from "../ListItem/ListItem.component";

import "./List.css";

type Props = {
  data: CoinType[];
  inputValue: string;
};

const List = (props: Props) => {
  const filteredList = props.data.filter((el) =>
    el.name.toLowerCase().includes(props.inputValue)
  );
  return (
    <div className="list">
      <ul>
        {filteredList.map((item) => (
          <ListItem listItem={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default List;
