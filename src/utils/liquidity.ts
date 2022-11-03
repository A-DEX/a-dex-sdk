import { asset, Asset } from "eos-common";
import bigInt from "big-integer";

export function countAddLiquidity(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  amountToAdd: Asset
): Readonly<[Asset, Asset]> {
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
}

export function countRemoveLiquidity(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  liquidityAmount: Asset,
  liquiditySupply: Asset
): Readonly<[Asset, Asset]> {
  const baseAmount = Asset.times(baseTokenReserve, liquidityAmount.amount).div(
    liquiditySupply.amount
  );
  const quoteAmount = Asset.times(
    quoteTokenReserve,
    liquidityAmount.amount
  ).div(liquiditySupply.amount);
  return [baseAmount, quoteAmount];
}
