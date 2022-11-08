import { expect } from "chai";
import { ExtendedAsset, Name, Sym, Asset, ExtendedSymbol } from "eos-common";
import { toTokenHash, toPairHash, countPrice } from "../../src/utils";

// tslint:disable-next-line:no-var-requires

describe("Format Utils Tests", () => {
  const eosExtendedAsset = new ExtendedAsset(
    new Asset("1.0000 EOS"),
    new Name("eosio.token")
  );
  const usdtExtendedAsset = new ExtendedAsset(
    new Asset("1.0000 USDT"),
    new Name("tethertether")
  );

  it("Token Hash Test", async () => {
    const eosHash = toTokenHash(eosExtendedAsset.get_extended_symbol());
    expect(eosHash).to.deep.equal(
      "501f2c4f6a23db9aea632f64d0fc051f223dfeb3d0469e838c4b3b5db9fd20e3"
    );

    const usdtHash = toTokenHash(usdtExtendedAsset.get_extended_symbol());
    expect(usdtHash).to.deep.equal(
      "669a655b92e7356db7ad1563f068da8432e3420b8e3d3bc7091c60506dbbaa1a"
    );
  }).timeout(2000);

  it("Token Hash ExtendedAsset Test", async () => {
    const eosHash = toTokenHash(eosExtendedAsset);
    expect(eosHash).to.deep.equal(
      "501f2c4f6a23db9aea632f64d0fc051f223dfeb3d0469e838c4b3b5db9fd20e3"
    );

    const usdtHash = toTokenHash(usdtExtendedAsset);
    expect(usdtHash).to.deep.equal(
      "669a655b92e7356db7ad1563f068da8432e3420b8e3d3bc7091c60506dbbaa1a"
    );
  }).timeout(2000);

  it("Pair Hash Test", async () => {
    const pairHash = toPairHash(
      eosExtendedAsset.get_extended_symbol(),
      usdtExtendedAsset.get_extended_symbol()
    );
    expect(pairHash).to.deep.equal(
      "201351d371153460f7ef4843c3058bab40774a9a1e927975214136ec64def387"
    );

    const reversePairHash = toPairHash(
      usdtExtendedAsset.get_extended_symbol(),
      eosExtendedAsset.get_extended_symbol()
    );
    expect(reversePairHash).to.deep.equal(
      "58ec996ac0d2a59d50a1da57f47f423b27a4980528bb128f826c1d7b21b9723f"
    );
  }).timeout(2000);

  it("Pair Hash ExtendedAsset Test", async () => {
    const pairHash = toPairHash(eosExtendedAsset, usdtExtendedAsset);
    expect(pairHash).to.deep.equal(
      "201351d371153460f7ef4843c3058bab40774a9a1e927975214136ec64def387"
    );

    const reversePairHash = toPairHash(usdtExtendedAsset, eosExtendedAsset);
    expect(reversePairHash).to.deep.equal(
      "58ec996ac0d2a59d50a1da57f47f423b27a4980528bb128f826c1d7b21b9723f"
    );
  }).timeout(2000);
});
