export interface DefaultParams {
  limit?: string;
  offset?: string;
  sort?: string;
}

export interface HistoryParams extends DefaultParams {
  before?: string;
  after?: string;
}

export interface GetPoolsParams extends DefaultParams {
  id?: number;
  code?: string;
  pool_sha256?: string;
  token_sha256?: string;
}

export interface GetAccountsParams extends DefaultParams {
  account?: string;
  code?: string;
}

export interface GetStatsParams extends DefaultParams {
  code?: string;
}

export interface GetDepositsParams extends DefaultParams {
  id?: number;
  pool_sha256?: string;
  account?: string;
}

export interface GetActionsParams extends HistoryParams {
  account?: string;
  name?: string;
}

export interface GetLiquidityByAccountParams extends DefaultParams {}

export interface GetGlobalVolumeParams extends HistoryParams {}

export interface GetGlobalLiquidityParams extends HistoryParams {}

export interface GetGlobalTransactionsParams extends HistoryParams {}

export interface GetNewsPostsParams extends DefaultParams {}

export interface GetPoolsVolumeParams extends HistoryParams {
  pool_sha256?: string;
}

export interface GetPoolsLiquidityParams extends HistoryParams {
  pool_sha256?: string;
}

export interface GetPoolsPriceParams extends HistoryParams {
  pool_sha256?: string;
}

export interface GetPoolsTransactionsParams extends HistoryParams {
  pool_sha256?: string;
}
