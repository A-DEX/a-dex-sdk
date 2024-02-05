export interface GetPoolsParams {
  limit?: string;
  offset?: string;
  sort?: string;
  id?: number;
  code?: string;
  pool_sha256?: string;
  token_sha256?: string;
}

export interface GetAccountsParams {
  limit?: string;
  offset?: string;
  sort?: string;
  account?: string;
  code?: string;
}

export interface GetStatsParams {
  limit?: string;
  offset?: string;
  sort?: string;
  code?: string;
}

export interface GetDepositsParams {
  limit?: string;
  offset?: string;
  sort?: string;
  id?: number;
  pool_sha256?: string;
  account?: string;
}

export interface GetActionsParams {
  limit?: string;
  offset?: string;
  sort?: string;
  before?: string;
  after?: string;
  account?: string;
  name?: string;
}

export interface GetLiquidityByAccountParams {
  limit?: string;
  offset?: string;
  sort?: string;
  id?: number;
  code?: string;
  pool_sha256?: string;
}

export interface GetGlobalVolumeParams {
  before?: string;
  after?: string;
}

export interface GetGlobalLiquidityParams {
  before?: string;
  after?: string;
}

export interface GetGlobalTransactionsParams {
  before?: string;
  after?: string;
}

export interface GetNewsPostsParams {
  limit?: string;
  offset?: string;
  sort?: string;
}

export interface GetPoolsVolumeParams {
  before?: string;
  after?: string;
  pool_sha256?: string;
}

export interface GetPoolsLiquidityParams {
  before?: string;
  after?: string;
  pool_sha256?: string;
}

export interface GetPoolsPriceParams {
  before?: string;
  after?: string;
  pool_sha256?: string;
}

export interface GetPoolsTransactionsParams {
  before?: string;
  after?: string;
  pool_sha256?: string;
}
