import { asset, Asset, ExtendedAsset } from "eos-common";
import bigInt from "big-integer";

export function countAddLiquidity(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  amountToAdd: Asset
): Readonly<[Asset, Asset]>;

export function countAddLiquidity(
  baseTokenReserve: ExtendedAsset,
  quoteTokenReserve: ExtendedAsset,
  amountToAdd: ExtendedAsset
): Readonly<[ExtendedAsset, ExtendedAsset]>;

export function countAddLiquidity(
  baseTokenReserve: unknown,
  quoteTokenReserve: unknown,
  amountToAdd: unknown
): unknown {
  if (
    baseTokenReserve instanceof Asset &&
    quoteTokenReserve instanceof Asset &&
    amountToAdd instanceof Asset
  ) {
    if (amountToAdd.symbol.isEqual(baseTokenReserve.symbol)) {
      const quoteAmount = bigInt(amountToAdd.amount)
        .times(quoteTokenReserve.amount)
        .divide(baseTokenReserve.amount);
      return [amountToAdd, asset(quoteAmount, quoteTokenReserve.symbol)];
    } else {
      const baseAmount = bigInt(amountToAdd.amount)
        .times(baseTokenReserve.amount)
        .divide(quoteTokenReserve.amount);
      return [asset(baseAmount, baseTokenReserve.symbol), amountToAdd];
    }
  } else if (
    baseTokenReserve instanceof ExtendedAsset &&
    quoteTokenReserve instanceof ExtendedAsset &&
    amountToAdd instanceof ExtendedAsset
  ) {
    if (
      amountToAdd
        .get_extended_symbol()
        .isEqual(baseTokenReserve.get_extended_symbol())
    ) {
      const quoteAmount = bigInt(amountToAdd.quantity.amount)
        .times(quoteTokenReserve.quantity.amount)
        .divide(baseTokenReserve.quantity.amount);
      return [
        amountToAdd,
        new ExtendedAsset(quoteAmount, quoteTokenReserve.get_extended_symbol()),
      ];
    } else {
      const baseAmount = bigInt(amountToAdd.quantity.amount)
        .times(baseTokenReserve.quantity.amount)
        .divide(quoteTokenReserve.quantity.amount);
      return [
        new ExtendedAsset(baseAmount, baseTokenReserve.get_extended_symbol()),
        amountToAdd,
      ];
    }
  } else {
    throw new Error("Failed countAddLiquidity");
  }
}

export function countRemoveLiquidity(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  liquidityAmount: Asset,
  liquiditySupply: Asset
): Readonly<[Asset, Asset]>;

export function countRemoveLiquidity(
  baseTokenReserve: ExtendedAsset,
  quoteTokenReserve: ExtendedAsset,
  liquidityAmount: Asset,
  liquiditySupply: Asset
): Readonly<[ExtendedAsset, ExtendedAsset]>;

export function countRemoveLiquidity(
  baseTokenReserve: unknown,
  quoteTokenReserve: unknown,
  liquidityAmount: Asset,
  liquiditySupply: Asset
): unknown {
  if (baseTokenReserve instanceof Asset && quoteTokenReserve instanceof Asset) {
    const baseAmount = Asset.times(
      baseTokenReserve,
      liquidityAmount.amount
    ).div(liquiditySupply.amount);
    const quoteAmount = Asset.times(
      quoteTokenReserve,
      liquidityAmount.amount
    ).div(liquiditySupply.amount);
    return [baseAmount, quoteAmount];
  } else if (
    baseTokenReserve instanceof ExtendedAsset &&
    quoteTokenReserve instanceof ExtendedAsset
  ) {
    const baseAmount = ExtendedAsset.times(
      baseTokenReserve,
      liquidityAmount.amount
    ).div(liquiditySupply.amount);
    const quoteAmount = ExtendedAsset.times(
      quoteTokenReserve,
      liquidityAmount.amount
    ).div(liquiditySupply.amount);
    return [baseAmount, quoteAmount];
  } else {
    throw new Error("Failed countRemoveLiquidity");
  }
}
