import { asset, Asset } from "eos-common";

export function countPrice(baseToken: Asset, quoteToken: Asset): Asset {
  const precisionDelta =
    quoteToken.symbol.precision() - baseToken.symbol.precision();
  const y = quoteToken.symbol.precision() - precisionDelta;
  return Asset.times(quoteToken, 10 ** y).div(baseToken.amount);
}

export function countTotalFeeAmount(
  amountSending: Asset,
  totalFeePercent: Asset,
  minSwapAmount = asset(800, amountSending.symbol),
  minFeeAmount = asset(2, amountSending.symbol)
): Asset {
  if (amountSending.isGreaterThanOrEqual(minSwapAmount)) {
    return Asset.times(amountSending, totalFeePercent.amount)
      .div(10 ** totalFeePercent.symbol.precision())
      .div(100);
  } else {
    return minFeeAmount;
  }
}

export function countAmountSending(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  poolFee: Asset,
  platformFee: Asset,
  maxFee = asset(10000, poolFee.symbol),
  amountReceiving: Asset
): Readonly<[Asset, Asset]> {
  const totalFeePercent = Asset.plus(poolFee, platformFee);

  const amountIn = countAmountIn(
    baseTokenReserve,
    quoteTokenReserve,
    amountReceiving
  );
  const sum = Asset.plus(maxFee, totalFeePercent);
  const amountSending = Asset.times(amountIn, sum.amount)
    .div(10 ** sum.symbol.precision())
    .div(100);

  const totalFee = countTotalFeeAmount(amountSending, totalFeePercent);
  return [amountSending, totalFee];
}

export function countAmountIn(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  amountReceiving: Asset
): Readonly<Asset> {
  const k = baseTokenReserve.amount.times(quoteTokenReserve.amount);

  if (amountReceiving.symbol.isEqual(quoteTokenReserve.symbol)) {
    const newQuoteTokenReserve = Asset.minus(
      quoteTokenReserve,
      amountReceiving
    );
    const newBaseTokenReserve = asset(
      k.divide(newQuoteTokenReserve.amount),
      baseTokenReserve.symbol
    );

    return Asset.minus(newBaseTokenReserve, baseTokenReserve);
  } else {
    const newBaseTokenReserve = Asset.minus(baseTokenReserve, amountReceiving);
    const newQuoteTokenReserve = asset(
      k.divide(newBaseTokenReserve.amount),
      quoteTokenReserve.symbol
    );

    return Asset.minus(newQuoteTokenReserve, quoteTokenReserve);
  }
}

export function countAmountReceiving(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  poolFee: Asset,
  platformFee: Asset,
  amountSending: Asset
): Readonly<[Asset, Asset]> {
  const totalFeePercent = Asset.plus(poolFee, platformFee);
  const totalFeeAmount = countTotalFeeAmount(amountSending, totalFeePercent);
  const amountIn = Asset.minus(amountSending, totalFeeAmount);
  const k = baseTokenReserve.amount.times(quoteTokenReserve.amount);

  if (amountIn.symbol.isEqual(quoteTokenReserve.symbol)) {
    const newQuoteTokenReserve = Asset.plus(quoteTokenReserve, amountIn);
    const newBaseTokenReserve = asset(
      k.divide(newQuoteTokenReserve.amount),
      baseTokenReserve.symbol
    );
    return [Asset.minus(baseTokenReserve, newBaseTokenReserve), totalFeeAmount];
  } else {
    const newBaseTokenReserve = Asset.plus(baseTokenReserve, amountIn);
    const newQuoteTokenReserve = asset(
      k.divide(newBaseTokenReserve.amount),
      quoteTokenReserve.symbol
    );
    return [
      Asset.minus(quoteTokenReserve, newQuoteTokenReserve),
      totalFeeAmount,
    ];
  }
}

export function countAtLeastGet(
  amountOut: Asset,
  slippage: Asset,
  maxSlippage = new Asset("100.00 PERCENT")
): Asset {
  const delta = Asset.minus(maxSlippage, slippage);
  return Asset.times(amountOut, delta.amount)
    .div(10 ** slippage.symbol.precision())
    .div(100);
}
