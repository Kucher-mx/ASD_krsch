export type CoinType = {
  name: string;
  id: string;
  logo_url: string;
  price: number;
  rank: number;
  status: string;
  "1d": {
    price_change: string;
  };
};

export type ExportedCoinType = Record<
  string,
  {
    name: string;
    logo_url: string;
    price: number;
    rank: number;
    status: string;
    "1d": {
      price_change: string;
    };
  }
>;

export type StateType = {
  data: CoinType[];
  inputValue: string;
  selectValue: string;
  loading: boolean;
};

export type Action = {
  type: string;
  payload: any;
};
