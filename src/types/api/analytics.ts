export type GlobalVolumeChart = {
  timestamp: string;
  precision: number;
  symbol_code: string;
  amount: string;
};

export type GetGlobalVolumeChart = {
  success: boolean;
  data: GlobalVolumeChart[];
};

export type GlobalLiquidityChart = {
  timestamp: string;
  precision: number;
  symbol_code: string;
  amount: string;
};

export type GetGlobalLiquidityChart = {
  success: boolean;
  data: GlobalLiquidityChart[];
  pagination: {
    count: string;
    total: string;
  };
};

export type GlobalTransactionsChart = {
  timestamp: string;
  total: string;
  swap: string;
  added: string;
  removed: string;
  transfer: string;
};

export type GetGlobalTransactionsChart = {
  success: boolean;
  data: GlobalTransactionsChart[];
  pagination: {
    count: string;
    total: string;
  };
};

export type PoolsVolumeChart = {
  timestamp: string;
  sha256: string;
  precision: number;
  symbol_code: string;
  amount: string;
};

export type GetPoolsVolumeChart = {
  success: boolean;
  data: PoolsVolumeChart[];
  pagination: {
    count: string;
    total: string;
  };
};

export type PoolsLiquidityChart = {
  timestamp: string;
  sha256: string;
  precision: number;
  symbol_code: string;
  amount: string;
};

export type GetPoolsLiquidityChart = {
  success: boolean;
  data: PoolsLiquidityChart[];
};

export type PoolsPriceChart = {
  timestamp: string;
  sha256: string;
  precision: number;
  symbol_code: string;
  amount: string;
};

export type GetPoolsPriceChart = {
  success: boolean;
  data: PoolsPriceChart[];
  pagination: {
    count: string;
    total: string;
  };
};

export type PoolsTransactionsChart = {
  timestamp: string;
  sha256: string;
  total: string;
  swap: string;
  added: string;
  removed: string;
  transfer: string;
};

export type GetPoolsTransactionsChart = {
  success: boolean;
  data: PoolsTransactionsChart[];
  pagination: {
    count: string;
    total: string;
  };
};

export type TransferData = {
  from: string;
  to: string;
  quantity_precision: number;
  quantity_symbol_code: string;
  quantity_amount: string;
  memo: string;
};

export type SwapLogData = {
  pool_id: string;
  owner: string;
  quantity_in_precision: number;
  quantity_in_symbol_code: string;
  quantity_in_amount: string;
  quantity_in_contract: string;
  quantity_in_sha256: string;
  quantity_out_precision: number;
  quantity_out_symbol_code: string;
  quantity_out_amount: string;
  quantity_out_contract: string;
  quantity_out_sha256: string;
  pool_fee_precision: number;
  pool_fee_symbol_code: string;
  pool_fee_amount: string;
  platform_fee_precision: number;
  platform_fee_symbol_code: string;
  platform_fee_amount: string;
};

export type AddLiquidityLogData = {
  pool_id: string;
  owner: string;
  quantity_precision: number;
  quantity_symbol_code: string;
  quantity_amount: string;
  base_token_precision: number;
  base_token_symbol_code: string;
  base_token_amount: string;
  base_token_contract: string;
  base_token_sha256: string;
  quote_token_precision: number;
  quote_token_symbol_code: string;
  quote_token_amount: string;
  quote_token_contract: string;
  quote_token_sha256: string;
};

export type RemoveLiquidityLogData = {
  pool_id: string;
  owner: string;
  quantity_precision: number;
  quantity_symbol_code: string;
  quantity_amount: string;
  base_token_precision: number;
  base_token_symbol_code: string;
  base_token_amount: string;
  base_token_contract: string;
  base_token_sha256: string;
  quote_token_precision: number;
  quote_token_symbol_code: string;
  quote_token_amount: string;
  quote_token_contract: string;
  quote_token_sha256: string;
};

export type Authorization = {
  actor: string;
  permission: string;
};

export type Action = {
  global_sequence: string;
  block_num: string;
  block_time: string;
  producer: string;
  trx_id: string;
  notified: string[];
  account: string;
  name: string;
  authorization: Authorization[];
  data:
    | TransferData
    | SwapLogData
    | AddLiquidityLogData
    | RemoveLiquidityLogData;
};

export type GetActions = {
  success: boolean;
  data: Action[];
  pagination: {
    count: string;
    total: string;
  };
};
