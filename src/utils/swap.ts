import { asset, extended_asset, Asset, ExtendedAsset } from "eos-common";

export function countTotalFeeAmount(
  amountSending: Asset,
  totalFeePercent: Asset,
  minSwapAmount?: number,
  minFeeAmount?: number
): Asset;

export function countTotalFeeAmount(
  amountSending: ExtendedAsset,
  totalFeePercent: Asset,
  minSwapAmount?: number,
  minFeeAmount?: number
): ExtendedAsset;

export function countTotalFeeAmount(
  amountSending: unknown,
  totalFeePercent: Asset,
  minSwapAmount: number = 800,
  minFeeAmount: number = 2
): unknown {
  if (amountSending instanceof Asset) {
    if (
      amountSending.isGreaterThanOrEqual(
        asset(minSwapAmount, amountSending.symbol)
      )
    ) {
      return Asset.times(amountSending, totalFeePercent.amount)
        .div(10 ** totalFeePercent.symbol.precision())
        .div(100);
    } else {
      return asset(minFeeAmount, amountSending.symbol);
    }
  } else if (amountSending instanceof ExtendedAsset) {
    if (
      amountSending.quantity.isGreaterThanOrEqual(
        asset(minSwapAmount, amountSending.quantity.symbol)
      )
    ) {
      return ExtendedAsset.times(amountSending, totalFeePercent.amount)
        .div(10 ** totalFeePercent.symbol.precision())
        .div(100);
    } else {
      return extended_asset(minFeeAmount, amountSending.get_extended_symbol());
    }
  } else {
    throw new Error("Failed countTotalFeeAmount");
  }
}

export function countAmountSending(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  amountReceiving: Asset,
  poolFee: Asset,
  platformFee: Asset,
  maxFee?: Asset
): Readonly<[Asset, Asset]>;

export function countAmountSending(
  baseTokenReserve: ExtendedAsset,
  quoteTokenReserve: ExtendedAsset,
  amountReceiving: ExtendedAsset,
  poolFee: Asset,
  platformFee: Asset,
  maxFee?: Asset
): Readonly<[ExtendedAsset, ExtendedAsset]>;

export function countAmountSending(
  baseTokenReserve: unknown,
  quoteTokenReserve: unknown,
  amountReceiving: unknown,
  poolFee: Asset,
  platformFee: Asset,
  maxFee: Asset = asset(10000, poolFee.symbol)
): unknown {
  if (
    baseTokenReserve instanceof Asset &&
    quoteTokenReserve instanceof Asset &&
    amountReceiving instanceof Asset
  ) {
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
  } else if (
    baseTokenReserve instanceof ExtendedAsset &&
    quoteTokenReserve instanceof ExtendedAsset &&
    amountReceiving instanceof ExtendedAsset
  ) {
    const totalFeePercent = Asset.plus(poolFee, platformFee);

    const amountIn = countAmountIn(
      baseTokenReserve,
      quoteTokenReserve,
      amountReceiving
    );
    const sum = Asset.plus(maxFee, totalFeePercent);

    const amountSending = ExtendedAsset.times(amountIn, sum.amount)
      .div(10 ** sum.symbol.precision())
      .div(100);

    const totalFee = countTotalFeeAmount(amountSending, totalFeePercent);
    return [amountSending, totalFee];
  } else {
    throw new Error("Failed countAmountSending");
  }
}

export function countAmountIn(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  amountReceiving: Asset
): Readonly<Asset>;

export function countAmountIn(
  baseTokenReserve: ExtendedAsset,
  quoteTokenReserve: ExtendedAsset,
  amountReceiving: ExtendedAsset
): Readonly<ExtendedAsset>;

export function countAmountIn(
  baseTokenReserve: unknown,
  quoteTokenReserve: unknown,
  amountReceiving: unknown
): unknown {
  if (
    baseTokenReserve instanceof Asset &&
    quoteTokenReserve instanceof Asset &&
    amountReceiving instanceof Asset
  ) {
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
      const newBaseTokenReserve = Asset.minus(
        baseTokenReserve,
        amountReceiving
      );
      const newQuoteTokenReserve = asset(
        k.divide(newBaseTokenReserve.amount),
        quoteTokenReserve.symbol
      );

      return Asset.minus(newQuoteTokenReserve, quoteTokenReserve);
    }
  } else if (
    baseTokenReserve instanceof ExtendedAsset &&
    quoteTokenReserve instanceof ExtendedAsset &&
    amountReceiving instanceof ExtendedAsset
  ) {
    const k = baseTokenReserve.quantity.amount.times(
      quoteTokenReserve.quantity.amount
    );

    if (
      amountReceiving
        .get_extended_symbol()
        .isEqual(quoteTokenReserve.get_extended_symbol())
    ) {
      const newQuoteTokenReserve = ExtendedAsset.minus(
        quoteTokenReserve,
        amountReceiving
      );
      const newBaseTokenReserve = new ExtendedAsset(
        k.divide(newQuoteTokenReserve.quantity.amount),
        baseTokenReserve.get_extended_symbol()
      );

      return ExtendedAsset.minus(newBaseTokenReserve, baseTokenReserve);
    } else {
      const newBaseTokenReserve = ExtendedAsset.minus(
        baseTokenReserve,
        amountReceiving
      );
      const newQuoteTokenReserve = new ExtendedAsset(
        k.divide(newBaseTokenReserve.quantity.amount),
        quoteTokenReserve.get_extended_symbol()
      );

      return ExtendedAsset.minus(newQuoteTokenReserve, quoteTokenReserve);
    }
  } else {
    throw new Error("Failed countAmountIn");
  }
}

export function countAmountReceiving(
  baseTokenReserve: Asset,
  quoteTokenReserve: Asset,
  poolFee: Asset,
  platformFee: Asset,
  amountSending: Asset
): Readonly<[Asset, Asset]>;

export function countAmountReceiving(
  baseTokenReserve: ExtendedAsset,
  quoteTokenReserve: ExtendedAsset,
  poolFee: Asset,
  platformFee: Asset,
  amountSending: ExtendedAsset
): Readonly<[ExtendedAsset, ExtendedAsset]>;

export function countAmountReceiving(
  baseTokenReserve: unknown,
  quoteTokenReserve: unknown,
  poolFee: Asset,
  platformFee: Asset,
  amountSending: unknown
): unknown {
  if (
    baseTokenReserve instanceof Asset &&
    quoteTokenReserve instanceof Asset &&
    amountSending instanceof Asset
  ) {
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
      return [
        Asset.minus(baseTokenReserve, newBaseTokenReserve),
        totalFeeAmount,
      ];
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
  } else if (
    baseTokenReserve instanceof ExtendedAsset &&
    quoteTokenReserve instanceof ExtendedAsset &&
    amountSending instanceof ExtendedAsset
  ) {
    const totalFeePercent = Asset.plus(poolFee, platformFee);
    const totalFeeAmount = countTotalFeeAmount(amountSending, totalFeePercent);
    const amountIn = ExtendedAsset.minus(amountSending, totalFeeAmount);
    const k = baseTokenReserve.quantity.amount.times(
      quoteTokenReserve.quantity.amount
    );

    if (
      amountIn
        .get_extended_symbol()
        .isEqual(quoteTokenReserve.get_extended_symbol())
    ) {
      const newQuoteTokenReserve = ExtendedAsset.plus(
        quoteTokenReserve,
        amountIn
      );
      const newBaseTokenReserve = new ExtendedAsset(
        k.divide(newQuoteTokenReserve.quantity.amount),
        baseTokenReserve.get_extended_symbol()
      );
      return [
        ExtendedAsset.minus(baseTokenReserve, newBaseTokenReserve),
        totalFeeAmount,
      ];
    } else {
      const newBaseTokenReserve = ExtendedAsset.plus(
        baseTokenReserve,
        amountIn
      );
      const newQuoteTokenReserve = new ExtendedAsset(
        k.divide(newBaseTokenReserve.quantity.amount),
        quoteTokenReserve.get_extended_symbol()
      );
      return [
        ExtendedAsset.minus(quoteTokenReserve, newQuoteTokenReserve),
        totalFeeAmount,
      ];
    }
  } else {
    throw new Error("Failed countAmountReceiving");
  }
}

export function countAtLeastGet(
  amountOut: Asset,
  slippage: Asset,
  maxSlippage?: Asset
): Asset;

export function countAtLeastGet(
  amountOut: ExtendedAsset,
  slippage: Asset,
  maxSlippage?: Asset
): ExtendedAsset;

export function countAtLeastGet(
  amountOut: unknown,
  slippage: Asset,
  maxSlippage: Asset = new Asset("100.00 PERCENT")
): unknown {
  if (amountOut instanceof Asset) {
    const delta = Asset.minus(maxSlippage, slippage);
    return Asset.times(amountOut, delta.amount)
      .div(10 ** slippage.symbol.precision())
      .div(100);
  } else if (amountOut instanceof ExtendedAsset) {
    const delta = Asset.minus(maxSlippage, slippage);
    return ExtendedAsset.times(amountOut, delta.amount)
      .div(10 ** slippage.symbol.precision())
      .div(100);
  } else {
    throw new Error("Failed countAtLeastGet");
  }
}
