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

export interface GetStatsParams extends DefaultParams {
  code?: string;
}

export interface GetLiquidityByAccountParams extends DefaultParams {}

export interface GetGlobalVolumeParams extends HistoryParams {}

export interface GetGlobalLiquidityParams extends HistoryParams {}

export interface GetGlobalTransactionsParams extends HistoryParams {}

export interface GetActionsParams extends HistoryParams {
  notified?: string;
  name?: string;
}
