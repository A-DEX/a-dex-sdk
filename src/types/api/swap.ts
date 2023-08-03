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

export type GetStat = {
  success: boolean;
  data: Stat[];
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
};
