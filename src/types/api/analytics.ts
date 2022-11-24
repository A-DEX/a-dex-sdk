export type GetGlobalVolumeChart = {
  timestamp: string;
  value: string;
};

export type GetGlobalLiquidityChart = {
  timestamp: string;
  value: string;
};

export type GetGlobalTransactionsChart = {
  timestamp: string;
  total: string;
  swap: string;
  added: string;
  removed: string;
  transfer: string;
};

export type GetPoolsVolumeChart = {
  timestamp: string;
  sha256: string;
  total_volume: string;
  base_volume: string;
  quote_volume: string;
};

export type GetPoolsLiquidityChart = {
  timestamp: string;
  sha256: string;
  value: string;
};

export type GetPoolsPriceChart = {
  timestamp: string;
  sha256: string;
  value: string;
};

export type GetPoolsTransactionsChart = {
  timestamp: string;
  sha256: string;
  total: string;
  swap: string;
  added: string;
  removed: string;
  transfer: string;
};

export type TransferData = {
  from: string;
  to: string;
  quantity: string;
  quantity_precision: number;
  quantity_symbol_code: string;
  quantity_amount: string;
  memo: string;
};

export type SwapLogData = {
  pool_id: string;
  owner: string;
  quantity_in: string;
  quantity_in_quantity: string;
  quantity_in_precision: number;
  quantity_in_symbol_code: string;
  quantity_in_amount: string;
  quantity_in_contract: string;
  quantity_in_sha256: string;
  quantity_out: string;
  quantity_out_quantity: string;
  quantity_out_precision: number;
  quantity_out_symbol_code: string;
  quantity_out_amount: string;
  quantity_out_contract: string;
  quantity_out_sha256: string;
  pool_fee: string;
  pool_fee_quantity: string;
  pool_fee_precision: number;
  pool_fee_symbol_code: string;
  pool_fee_amount: string;
  platform_fee: string;
  platform_fee_quantity: string;
  platform_fee_precision: number;
  platform_fee_symbol_code: string;
  platform_fee_amount: string;
};

export type AddLiquidityLogData = {
  pool_id: string;
  pool_code: string;
  pool_sha256: string;
  owner: string;
  quantity: string;
  quantity_precision: number;
  quantity_symbol_code: string;
  quantity_amount: string;
  base_token: string;
  base_token_quantity: string;
  base_token_precision: number;
  base_token_symbol_code: string;
  base_token_amount: string;
  base_token_contract: string;
  base_token_sha256: string;
  quote_token: string;
  quote_token_quantity: string;
  quote_token_precision: number;
  quote_token_symbol_code: string;
  quote_token_amount: string;
  quote_token_contract: string;
  quote_token_sha256: string;
};

export type RemoveLiquidityLogData = {
  pool_id: string;
  pool_code: string;
  pool_sha256: string;
  owner: string;
  quantity: string;
  quantity_precision: number;
  quantity_symbol_code: string;
  quantity_amount: string;
  base_token: string;
  base_token_quantity: string;
  base_token_precision: number;
  base_token_symbol_code: string;
  base_token_amount: string;
  base_token_contract: string;
  base_token_sha256: string;
  quote_token: string;
  quote_token_quantity: string;
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
};