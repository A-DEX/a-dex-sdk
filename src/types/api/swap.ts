export type GetHealth = {
  success: boolean;
  data: {
    version: string;
    postgres: {
      status: string;
      readers: [
        {
          block_num: string;
        }
      ];
    };
    redis: {
      status: string;
    };
    chain: {
      status: string;
      head_block: number;
      head_time: number;
    };
  };
  query_time: number;
};

export type Pool = {
  id: string;
  code: string;
  sha256: string;
  base_token_precision: number;
  base_token_symbol_code: string;
  base_token_amount: string;
  base_token_contract: string;
  quote_token_precision: number;
  quote_token_symbol_code: string;
  quote_token_amount: string;
  quote_token_contract: string;
  pool_fee_precision: number;
  pool_fee_symbol_code: string;
  pool_fee_amount: string;
  platform_fee_precision: number;
  platform_fee_symbol_code: string;
  platform_fee_amount: string;
  created_at: string;
  updated_at: string;
};

export type GetPools = {
  success: boolean;
  data: Pool[];
  pagination: {
    count: string;
    total: string;
  };
};

export type Account = {
  account_name: string;
  balance_precision: number;
  balance_symbol_code: string;
  balance_amount: string;
};

export type GetAccounts = {
  success: boolean;
  data: Account[];
  pagination: {
    count: string;
    total: string;
  };
};

export type Stat = {
  supply_precision: number;
  supply_symbol_code: string;
  supply_amount: string;
  max_supply_precision: number;
  max_supply_symbol_code: string;
  max_supply_amount: string;
  issuer: string;
};

export type GetStats = {
  success: boolean;
  data: Stat[];
  pagination: {
    count: string;
    total: string;
  };
};

export type Deposit = {
  pool_id: string;
  pool_sha256: string;
  owner: string;
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

export type GetDeposits = {
  success: boolean;
  data: Deposit[];
  pagination: {
    count: string;
    total: string;
  };
};

export type Liquidity = {
  id: string;
  code: string;
  sha256: string;
  ratio: string;
  current_liquidity: {
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
  liquidity_capital: {
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
};

export type GetLiquidityByAccount = {
  success: boolean;
  data: Liquidity[];
  pagination: {
    count: string;
    total: string;
  };
};
