import {
  GetPoolsParams,
  GetStatsParams,
  GetLiquidityByAccountParams,
  GetGlobalVolumeParams,
  GetGlobalLiquidityParams,
  GetGlobalTransactionsParams,
  GetPoolsVolumeParams,
  GetPoolsLiquidityParams,
  GetPoolsPriceParams,
  GetPoolsTransactionsParams,
  GetActionsParams,
} from "../interfaces";
import {
  GetPools,
  GetStat,
  GetLiquidityByAccount,
  GetGlobalVolumeChart,
  GetGlobalLiquidityChart,
  GetGlobalTransactionsChart,
  GetPoolsVolumeChart,
  GetPoolsLiquidityChart,
  GetPoolsPriceChart,
  GetPoolsTransactionsChart,
  GetActions,
} from "../types";

import { parseQueryParams } from "../utils";

export class RpcApi {
  readonly baseUrl: string;
  readonly fetch: any;

  constructor(baseUrl: string, fetch: any) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }

  async get<T>(path: string, params?: any): Promise<T> {
    const queryParams = Object.assign({}, params);
    const response = await this.fetch(
      this.baseUrl + path + "?" + parseQueryParams(queryParams),
      {
        method: "GET",
      }
    );
    return await response.json();
  }

  async post<T>(path: string, body: any): Promise<T> {
    const response = await this.fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async getPools(params?: GetPoolsParams) {
    return await this.get<GetPools>("/swap/v1/pools", params);
  }

  async getStats(params?: GetStatsParams) {
    return await this.get<GetStat>("/swap/v1/stats", params);
  }

  async getLiquidityByAccount(
    account: string,
    params?: GetLiquidityByAccountParams
  ) {
    return await this.get<GetLiquidityByAccount>(
      `/swap/v1/liquidity/${account}`,
      params
    );
  }

  async getGlobalVolumeChart(params?: GetGlobalVolumeParams) {
    return await this.get<GetGlobalVolumeChart>(
      "/analytics/v1/charts/global/volume",
      params
    );
  }

  async getGlobalLiquidityChart(params?: GetGlobalLiquidityParams) {
    return await this.get<GetGlobalLiquidityChart>(
      "/analytics/v1/charts/global/liquidity",
      params
    );
  }

  async getGlobalTransactionsChart(params?: GetGlobalTransactionsParams) {
    return await this.get<GetGlobalTransactionsChart>(
      "/analytics/v1/charts/global/transactions",
      params
    );
  }

  async getPoolsVolumeChart(params?: GetPoolsVolumeParams) {
    return await this.get<GetPoolsVolumeChart>(
      "/analytics/v1/charts/pools/volume",
      params
    );
  }

  async getPoolsLiquidityChart(params?: GetPoolsLiquidityParams) {
    return await this.get<GetPoolsLiquidityChart>(
      "/analytics/v1/charts/pools/liquidity",
      params
    );
  }

  async getPoolsPriceChart(params?: GetPoolsPriceParams) {
    return await this.get<GetPoolsPriceChart>(
      "/analytics/v1/charts/pools/price",
      params
    );
  }

  async getPoolsTransactionsChart(params?: GetPoolsTransactionsParams) {
    return await this.get<GetPoolsTransactionsChart>(
      "/analytics/v1/charts/pools/transactions",
      params
    );
  }

  async getActions(params?: GetActionsParams) {
    return await this.get<GetActions>("/analytics/v1/actions", params);
  }
}
