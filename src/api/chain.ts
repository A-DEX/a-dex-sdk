import {
  GetCurrencyStats,
  GetCurrencyBalance,
  GetTableRowsPayload,
  PoolPayload,
} from "../interfaces";

export default class ChainApi {
  readonly nodeosUrl: string;
  readonly swapContract: string;
  readonly fetch: any;

  constructor(nodeosUrl: string, swapContract: string, fetch: any) {
    this.nodeosUrl = nodeosUrl;
    this.swapContract = swapContract;
    this.fetch = fetch;
  }

  async getCurrencyStats(payload: GetCurrencyStats): Promise<any> {
    return await this.fetch(`${this.nodeosUrl}/v1/chain/get_currency_stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  async getCurrencyBalance(payload: GetCurrencyBalance): Promise<any> {
    return await this.fetch(`${this.nodeosUrl}/v1/chain/get_currency_balance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  async getTableRows(payload: GetTableRowsPayload): Promise<any> {
    return await this.fetch(`${this.nodeosUrl}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  async getPoolByID(opts: PoolPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.swapContract,
      scope: this.swapContract,
      table: "pools",
      table_key: opts.id,
      lower_bound: opts.id,
      upper_bound: opts.id,
      key_type: "i64",
      index_position: "1",
    });
  }

  async getPoolByCode(opts: PoolPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.swapContract,
      scope: this.swapContract,
      table: "pools",
      table_key: opts.code,
      lower_bound: opts.code,
      upper_bound: opts.code,
      key_type: "i64",
      encode_type: "bytes",
      index_position: "2",
    });
  }

  async getPoolByPairSHA256(opts: PoolPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.swapContract,
      scope: this.swapContract,
      table: "pools",
      table_key: opts.pairSHA256,
      lower_bound: opts.pairSHA256,
      upper_bound: opts.pairSHA256,
      key_type: "sha256",
      index_position: "3",
    });
  }
}
