import { sha256 } from "js-sha256";
import { ExtendedSymbol } from "eos-common";

export function toTokenHash(token: ExtendedSymbol): string {
  return sha256(`${token.toString()}`);
}

export function toPairHash(
  baseToken: ExtendedSymbol,
  quoteToken: ExtendedSymbol
): string {
  return sha256(`${baseToken.toString()}/${quoteToken.toString()}`);
}
