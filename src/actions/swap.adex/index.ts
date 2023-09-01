import { AdexSwap } from "../../types";

/* tslint:disable:variable-name */

export class SwapActionGenerator {
  constructor(readonly contract: string) {}

  async open(
    authorization: AdexSwap.AuthorizationObject[],
    contract: string,
    owner: string,
    symbol: string,
    ram_payer: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(contract, authorization, "open", {
      owner,
      symbol,
      ram_payer,
    });
  }

  async close(
    authorization: AdexSwap.AuthorizationObject[],
    owner: string,
    symbol: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "close", {
      owner,
      symbol,
    });
  }

  async withdraw(
    authorization: AdexSwap.AuthorizationObject[],
    owner: string,
    quantity: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "withdraw", {
      owner,
      quantity,
    });
  }

  async create(
    authorization: AdexSwap.AuthorizationObject[],
    issuer: string,
    maximum_supply: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "create", {
      issuer,
      maximum_supply,
    });
  }

  async issue(
    authorization: AdexSwap.AuthorizationObject[],
    to: string,
    quantity: string,
    memo: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "issue", {
      to,
      quantity,
      memo,
    });
  }

  async retire(
    authorization: AdexSwap.AuthorizationObject[],
    from: string,
    quantity: string,
    memo: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "retire", {
      from,
      quantity,
      memo,
    });
  }

  async transfer(
    authorization: AdexSwap.AuthorizationObject[],
    contract: string,
    from: string,
    to: string,
    quantity: string,
    memo: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(contract, authorization, "transfer", {
      from,
      to,
      quantity,
      memo,
    });
  }

  async createPool(
    authorization: AdexSwap.AuthorizationObject[],
    base_token: string,
    quote_token: string,
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "createpool", {
      base_token,
      quote_token
    });
  }

  async removePool(
    authorization: AdexSwap.AuthorizationObject[],
    base_token: string,
    quote_token: string
  ): Promise<AdexSwap.ActionObject[]> {
    return this._pack(this.contract, authorization, "removepool", {
      base_token,
      quote_token
    });
  }

  protected _pack(
    account: string,
    authorization: AdexSwap.AuthorizationObject[],
    name: string,
    data:
      | AdexSwap.OpenActionData
      | AdexSwap.CloseActionData
      | AdexSwap.WithdrawActionData
      | AdexSwap.CreateActionData
      | AdexSwap.IssueActionData
      | AdexSwap.RetireActionData
      | AdexSwap.TransferActionData
      | AdexSwap.CreatePoolActionData
      | AdexSwap.RemovePoolActionData
  ): AdexSwap.ActionObject[] {
    return [{ account, name, authorization, data }];
  }
}
