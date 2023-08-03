import { Name, Asset, ExtendedAsset, Sym, ExtendedSymbol } from "eos-common";
import { SwapActionGenerator } from "../actions";
import {
  EosioAuthorizationObject,
  EosioActionObject,
  EosioTransactionObject,
} from "../types";

/* tslint:disable:variable-name */

export class SwapTransactionGenerator {
  constructor(
    readonly auth: EosioAuthorizationObject[],
    readonly actGen: SwapActionGenerator
  ) {}

  async addLiquidity(
    owner: Name,
    symbol: Sym,
    poolId: number,
    baseToken: ExtendedAsset,
    quoteToken: ExtendedAsset,
    isBalanceExist: boolean = true
  ): Promise<EosioTransactionObject> {
    const openAction = await this.actGen.open(
      this.auth,
      this.actGen.contract,
      owner.to_string(),
      symbol.toString(),
      owner.to_string()
    );
    const baseTransferAction = await this.actGen.transfer(
      this.auth,
      baseToken.contract.to_string(),
      owner.to_string(),
      this.actGen.contract,
      baseToken.quantity.to_string(),
      `deposit:${poolId}`
    );
    const quoteTransferAction = await this.actGen.transfer(
      this.auth,
      quoteToken.contract.to_string(),
      owner.to_string(),
      this.actGen.contract,
      quoteToken.quantity.to_string(),
      `deposit:${poolId}`
    );
    if (isBalanceExist) {
      return this._pack(baseTransferAction.concat(quoteTransferAction));
    } else {
      return this._pack(
        openAction.concat(baseTransferAction, quoteTransferAction)
      );
    }
  }

  async removeLiquidity(
    owner: Name,
    quantity: Asset,
    baseToken: ExtendedSymbol,
    quoteToken: ExtendedSymbol,
    isBalancesExist: boolean = true
  ): Promise<EosioTransactionObject> {
    const baseOpenAction = await this.actGen.open(
      this.auth,
      baseToken.get_contract().to_string(),
      owner.to_string(),
      baseToken.get_symbol().toString(),
      owner.to_string()
    );
    const quoteOpenAction = await this.actGen.open(
      this.auth,
      quoteToken.get_contract().to_string(),
      owner.to_string(),
      quoteToken.get_symbol().toString(),
      owner.to_string()
    );
    const withdrawAction = await this.actGen.withdraw(
      this.auth,
      owner.to_string(),
      quantity.to_string()
    );
    if (isBalancesExist) {
      return this._pack(withdrawAction);
    } else {
      return this._pack(baseOpenAction.concat(quoteOpenAction, withdrawAction));
    }
  }

  async swapWithMinReceived(
    from: Name,
    amountFrom: ExtendedAsset,
    amountTo: ExtendedAsset,
    route: string,
    isBalanceExist: boolean = true
  ): Promise<EosioTransactionObject> {
    const openAction = await this.actGen.open(
      this.auth,
      amountTo.contract.to_string(),
      from.to_string(),
      amountTo.quantity.symbol.toString(),
      from.to_string()
    );
    const transferAction = await this.actGen.transfer(
      this.auth,
      amountFrom.contract.to_string(),
      from.to_string(),
      this.actGen.contract,
      amountFrom.quantity.to_string(),
      `swap:${route};min:${amountTo.quantity.amount}`
    );
    if (isBalanceExist) {
      return this._pack(transferAction);
    } else {
      return this._pack(openAction.concat(transferAction));
    }
  }

  async swapByMarketPrice(
    from: Name,
    amountFrom: ExtendedAsset,
    amountTo: ExtendedAsset,
    route: string,
    isBalanceExist: boolean = true
  ): Promise<EosioTransactionObject> {
    const openAction = await this.actGen.open(
      this.auth,
      amountTo.contract.to_string(),
      from.to_string(),
      amountTo.quantity.symbol.toString(),
      from.to_string()
    );
    const transferAction = await this.actGen.transfer(
      this.auth,
      amountFrom.contract.to_string(),
      from.to_string(),
      this.actGen.contract,
      amountFrom.quantity.to_string(),
      `swap:${route}`
    );
    if (isBalanceExist) {
      return this._pack(transferAction);
    } else {
      return this._pack(openAction.concat(transferAction));
    }
  }

  protected _pack(acts: EosioActionObject<any>[]): EosioTransactionObject {
    return { actions: acts };
  }
}
