import { Name, ExtendedAsset } from "eos-common";
import { EosioTokenActionGenerator } from "../../actions";
import {
  EosioAuthorizationObject,
  EosioActionObject,
  EosioTransactionObject,
} from "../../types";

/* tslint:disable:variable-name */

export class EosioTokenTransactionGenerator {
  constructor(
    readonly auth: EosioAuthorizationObject[],
    readonly actGen: EosioTokenActionGenerator
  ) {}

  async transfer(
    from: Name,
    to: Name,
    quantity: ExtendedAsset,
    memo: string
  ): Promise<EosioTransactionObject> {
    const transferAction = await this.actGen.transfer(
      this.auth,
      quantity.contract.to_string(),
      from.to_string(),
      to.to_string(),
      quantity.quantity.to_string(),
      memo
    );

    return this._pack(transferAction);
  }

  protected _pack(acts: EosioActionObject<any>[]): EosioTransactionObject {
    return { actions: acts };
  }
}
