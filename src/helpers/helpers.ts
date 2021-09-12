import { CoinType, ExportedCoinType } from "./../redux/types/reducer.types";

export type fetchDataParams = {
  url: string;
  setToState: (data: CoinType[]) => void;
  setLoading: (bool: boolean) => void;
};

export const fetchDataAndSet = async (params: fetchDataParams) => {
  params.setLoading(true);
  fetch(params.url)
    .then((res) => res.json())
    .then((parsedRes) => {
      params.setToState(parsedRes);
      params.setLoading(false);
    });
};

export const downloadData = (
  exportObj: CoinType[] | null,
  exportName: string
) => {
  if (!exportObj) {
    console.log("no data provided");
  }
  const reducedCoins = exportObj
    ?.map(({ name, id, logo_url, price, rank, status, ...rest }) => ({
      name,
      id,
      logo_url,
      price,
      rank,
      status,
      "1d": {
        price_change: rest["1d"].price_change,
      },
    }))
    .reduce((acc, item) => {
      const { id, ...rest } = item;
      acc[id] = { ...rest };
      return acc;
    }, {} as ExportedCoinType);

  const dataJson =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(reducedCoins));

  const downloadTriggerNode = document.createElement("a");
  downloadTriggerNode.setAttribute("href", dataJson);
  downloadTriggerNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadTriggerNode); // required for firefox
  downloadTriggerNode.click();
  downloadTriggerNode.remove();
};

const swap = (items: CoinType[], firstIndex: number, secondIndex: number) => {
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
};

const partition = (arr: CoinType[], left: number, right: number) => {
  let center: number =
      +arr[Math.floor((right + left) / 2)]["1d"]["price_change"],
    i = left,
    j = right;
  while (i <= j) {
    while (+arr[i]["1d"]["price_change"] < center) {
      i++;
    }
    while (+arr[j]["1d"]["price_change"] > center) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
};

export const quickSort = (arr: CoinType[], left: number, right: number) => {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right);
    if (left < index - 1) {
      quickSort(arr, left, index - 1);
    }
    if (index < right) {
      quickSort(arr, index, right);
    }
  }
  return arr;
};

export const shellSort = (arr: CoinType[]): CoinType[] => {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap].price > temp.price; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
};
