import { sha256 } from "js-sha256";
import { ExtendedAsset, ExtendedSymbol } from "eos-common";

export function toTokenHash(token: ExtendedSymbol): string;
export function toTokenHash(token: ExtendedAsset): string;

export function toTokenHash(token: unknown): string {
  if (token instanceof ExtendedSymbol) {
    return sha256(`${token.toString()}`);
  } else if (token instanceof ExtendedAsset) {
    return sha256(`${token.get_extended_symbol().toString()}`);
  } else {
    throw new Error("Failed toTokenHAsh");
  }
}

export function toPairHash(
  baseToken: ExtendedSymbol,
  quoteToken: ExtendedSymbol
): string;
export function toPairHash(
  baseToken: ExtendedAsset,
  quoteToken: ExtendedAsset
): string;

export function toPairHash(baseToken: unknown, quoteToken: unknown): string {
  if (
    baseToken instanceof ExtendedSymbol &&
    quoteToken instanceof ExtendedSymbol
  ) {
    return sha256(`${baseToken.toString()}/${quoteToken.toString()}`);
  } else if (
    baseToken instanceof ExtendedAsset &&
    quoteToken instanceof ExtendedAsset
  ) {
    return sha256(
      `${baseToken.get_extended_symbol().toString()}/${quoteToken
        .get_extended_symbol()
        .toString()}`
    );
  } else {
    throw new Error("Failed toPairHash");
  }
}
