export type EosioAuthorizationObject = { actor: string; permission: string };

export type EosioActionObject<DataType> = {
  account: string;
  name: string;
  authorization: EosioAuthorizationObject[];
  data: DataType;
};

export type ResourcePayer = {
  payer: string;
  max_net_bytes: number;
  max_cpu_us: number;
  max_memory_bytes: number;
};

export type EosioTransactionObject = {
  expiration?: string;
  ref_block_num?: number;
  ref_block_prefix?: number;
  max_net_usage_words?: number;
  max_cpu_usage_ms?: number;
  delay_sec?: number;
  context_free_actions?: EosioActionObject<any>[];
  context_free_data?: Uint8Array[];
  actions: EosioActionObject<any>[];
  transaction_extensions?: [number, string][];
  resource_payer?: ResourcePayer;
};
