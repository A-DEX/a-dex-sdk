export namespace AdexSwap {
  export type ExtendedSymbol = {
    sym: string;
    contract: string;
  };

  export type ExtendedAsset = {
    quantity: string;
    contract: string;
  };

  export type OpenActionData = {
    owner: string;
    symbol: string;
    ram_payer: string;
  };

  export type CloseActionData = {
    owner: string;
    symbol: string;
  };

  export type WithdrawActionData = {
    owner: string;
    quantity: string;
  };

  export type CreateActionData = {
    issuer: string;
    maximum_supply: string;
  };

  export type IssueActionData = {
    to: string;
    quantity: string;
    memo: string;
  };

  export type RetireActionData = {
    from: string;
    quantity: string;
    memo: string;
  };

  export type TransferActionData = {
    from: string;
    to: string;
    quantity: string;
    memo: string;
  };

  export type CreatePoolActionData = {
    base_token: string;
    quote_token: string;
  };

  export type RemovePoolActionData = {
    base_token: string;
    quote_token: string;
  };

  export type SwapLogActionData = {
    pool_id: string;
    owner: string;
    quantity_in: ExtendedAsset;
    quantity_out: ExtendedAsset;
    pool_fee: ExtendedAsset;
    platform_fee: ExtendedAsset;
  };

  export type AddLiquidityLogActionData = {
    pool_id: string;
    owner: string;
    quantity: string;
    base_token: ExtendedAsset;
    quote_token: ExtendedAsset;
  };

  export type RemoveLiquidityLogActionData = {
    pool_id: string;
    owner: string;
    quantity: string;
    base_token: ExtendedAsset;
    quote_token: ExtendedAsset;
  };

  export type AuthorizationObject = { actor: string; permission: string };

  export type ActionObject = {
    account: string;
    name: string;
    authorization: AuthorizationObject[];
    data:
      | OpenActionData
      | CloseActionData
      | WithdrawActionData
      | CreateActionData
      | IssueActionData
      | RetireActionData
      | TransferActionData
      | CreatePoolActionData
      | RemovePoolActionData;
  };
}