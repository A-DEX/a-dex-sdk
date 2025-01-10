import { Asset, ExtendedAsset } from "eos-common";
import bigInt from "big-integer";

export function countPrice(baseToken: Asset, quoteToken: Asset): Asset;
export function countPrice(
  baseToken: ExtendedAsset,
  quoteToken: ExtendedAsset
): ExtendedAsset;

export function countPrice(baseToken: unknown, quoteToken: unknown): unknown {
  if (baseToken instanceof Asset && quoteToken instanceof Asset) {
    const precisionDelta =
      quoteToken.symbol.precision() - baseToken.symbol.precision();
    const y = quoteToken.symbol.precision() - precisionDelta;
    const price = bigInt(quoteToken.amount)
      .times(10 ** y)
      .divide(baseToken.amount);
    return new Asset(price, quoteToken.symbol);
  } else if (
    baseToken instanceof ExtendedAsset &&
    quoteToken instanceof ExtendedAsset
  ) {
    const precisionDelta =
      quoteToken.quantity.symbol.precision() -
      baseToken.quantity.symbol.precision();
    const y = quoteToken.quantity.symbol.precision() - precisionDelta;
    const price = bigInt(quoteToken.quantity.amount)
      .times(10 ** y)
      .divide(baseToken.quantity.amount);
    return new ExtendedAsset(
      new Asset(price, quoteToken.get_extended_symbol().get_symbol()),
      quoteToken.contract
    );
  } else {
    throw new Error("Failed countPrice");
  }
}

export function countTotal(amount: Asset, price: Asset): Asset;
export function countTotal(
  amount: ExtendedAsset,
  price: ExtendedAsset
): ExtendedAsset;

export function countTotal(amount: unknown, price: unknown): unknown {
  if (amount instanceof Asset && price instanceof Asset) {
    const precisionDelta = price.symbol.precision() - amount.symbol.precision();
    const y = price.symbol.precision() - precisionDelta;
    const total = bigInt(price.amount)
      .times(amount.amount)
      .divide(10 ** y);
    return new Asset(total, price.symbol);
  } else if (
    amount instanceof ExtendedAsset &&
    price instanceof ExtendedAsset
  ) {
    const precisionDelta =
      price.get_extended_symbol().get_symbol().precision() -
      amount.get_extended_symbol().get_symbol().precision();
    const y =
      price.get_extended_symbol().get_symbol().precision() - precisionDelta;
    const total = bigInt(price.quantity.amount)
      .times(amount.quantity.amount)
      .divide(10 ** y);
    return new ExtendedAsset(
      new Asset(total, price.get_extended_symbol().get_symbol()),
      price.contract
    );
  } else {
    throw new Error("Failed countTotal");
  }
}

export function countChange(
  oldValue: Asset,
  newValue: Asset,
  digits?: number | undefined
): string;
export function countChange(
  oldValue: ExtendedAsset,
  newValue: ExtendedAsset,
  digits?: number | undefined
): string;

export function countChange(
  oldValue: unknown,
  newValue: unknown,
  digits: number | undefined = 2
): string {
  if (oldValue instanceof Asset && newValue instanceof Asset) {
    const change =
      (Number(Asset.minus(newValue, oldValue).amount) /
        Number(oldValue.amount)) *
      100;
    return change.toFixed(digits);
  } else if (
    oldValue instanceof ExtendedAsset &&
    newValue instanceof ExtendedAsset
  ) {
    const change =
      (Number(ExtendedAsset.minus(newValue, oldValue).quantity.amount) /
        Number(oldValue.quantity.amount)) *
      100;
    return change.toFixed(digits);
  } else {
    throw new Error("Failed countChange");
  }
}
