import { EosioAuthorizationObject, EosioActionObject } from "../types";

/* tslint:disable:variable-name */

export class SwapActionGenerator {
  constructor(readonly contract: string) {}

  async open(
    authorization: EosioAuthorizationObject[],
    contract: string,
    owner: string,
    symbol: string,
    ram_payer: string
  ): Promise<EosioActionObject[]> {
    return this._pack(contract, authorization, "open", {
      owner,
      symbol,
      ram_payer,
    });
  }

  async close(
    authorization: EosioAuthorizationObject[],
    owner: string,
    symbol: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "close", {
      owner,
      symbol,
    });
  }

  async withdraw(
    authorization: EosioAuthorizationObject[],
    owner: string,
    quantity: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "withdraw", {
      owner,
      quantity,
    });
  }

  async create(
    authorization: EosioAuthorizationObject[],
    issuer: string,
    maximum_supply: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "create", {
      issuer,
      maximum_supply,
    });
  }

  async issue(
    authorization: EosioAuthorizationObject[],
    to: string,
    quantity: string,
    memo: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "issue", {
      to,
      quantity,
      memo,
    });
  }

  async retire(
    authorization: EosioAuthorizationObject[],
    from: string,
    quantity: string,
    memo: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "retire", {
      from,
      quantity,
      memo,
    });
  }

  async transfer(
    authorization: EosioAuthorizationObject[],
    contract: string,
    from: string,
    to: string,
    quantity: string,
    memo: string
  ): Promise<EosioActionObject[]> {
    return this._pack(contract, authorization, "transfer", {
      from,
      to,
      quantity,
      memo,
    });
  }

  async createPool(
    authorization: EosioAuthorizationObject[],
    base_token: string,
    quote_token: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "createpool", {
      base_token,
      quote_token,
    });
  }

  async removePool(
    authorization: EosioAuthorizationObject[],
    base_token: string,
    quote_token: string
  ): Promise<EosioActionObject[]> {
    return this._pack(this.contract, authorization, "removepool", {
      base_token,
      quote_token,
    });
  }

  protected _pack(
    account: string,
    authorization: EosioAuthorizationObject[],
    name: string,
    data: any
  ): EosioActionObject[] {
    return [{ account, name, authorization, data }];
  }
}
