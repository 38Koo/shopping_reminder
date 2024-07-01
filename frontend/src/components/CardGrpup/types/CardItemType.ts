// TODO: priceの追加
// TODO: imagePathの追加

export type CardDataType = {
  item: {
    ID: string;
    itemName: string;
    stockCount: number;
    LastPurchaseDate: Date;
    UserItemID: number;
  };
  logSummary: {
    AveragePrice: number;
    AverageConsume: number;
    DaysLeftUntilNextPurchase: number;
    Latest: Date;
    UserID: number;
    UserItemID: number;
  };
};
