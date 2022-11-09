import { expect } from "chai";
import { Asset, ExtendedAsset, Name } from "eos-common";
import { countPrice, countTotal } from "../../src/utils";

describe("Math Utils Tests", () => {
  it("Count EOS-USDT Price Test", async () => {
    const eosPrice = countPrice(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT")
    );
    expect(eosPrice.to_string()).to.deep.equal("4.0000 USDT");

    const usdtPrice = countPrice(
      new Asset("4.0000 USDT"),
      new Asset("1.0000 EOS")
    );
    expect(usdtPrice.to_string()).to.deep.equal("0.2500 EOS");
  }).timeout(2000);

  it("Count EOS-USDT ExtendedAsset Price Test", async () => {
    const eosPrice = countPrice(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether"))
    );
    expect(eosPrice.toString()).to.deep.equal("4.0000 USDT@tethertether");

    const usdtPrice = countPrice(
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token"))
    );
    expect(usdtPrice.toString()).to.deep.equal("0.2500 EOS@eosio.token");
  }).timeout(2000);

  it("Count PBTC-USDT Price Test", async () => {
    const usdtPrice = countPrice(
      new Asset("1.00000000 PBTC"),
      new Asset("30000.0000 USDT")
    );
    expect(usdtPrice.to_string()).to.deep.equal("30000.0000 USDT");

    const pbtcPrice = countPrice(
      new Asset("30000.0000 USDT"),
      new Asset("1.00000000 PBTC")
    );
    expect(pbtcPrice.to_string()).to.deep.equal("0.00003333 PBTC");
  }).timeout(2000);

  it("Count USDT-PBTC Price Test", async () => {
    const usdtPrice = countPrice(
      new Asset("1.0000 USDT"),
      new Asset("0.00003333 PBTC")
    );
    expect(usdtPrice.to_string()).to.deep.equal("0.00003333 PBTC");

    const pbtcPrice = countPrice(
      new Asset("0.00003333 PBTC"),
      new Asset("1.0000 USDT")
    );
    expect(pbtcPrice.to_string()).to.deep.equal("30003.0003 USDT");
  }).timeout(2000);

  it("Count EOS-USDT Total Test", async () => {
    const total = countTotal(new Asset("1.0000 EOS"), new Asset("4.0000 USDT"));
    expect(total.toString()).to.deep.equal("4.0000 USDT");
  }).timeout(2000);

  it("Count EOS-USDT Total ExtendedAsset Test", async () => {
    const total = countTotal(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether"))
    );
    expect(total.toString()).to.deep.equal("4.0000 USDT@tethertether");
  }).timeout(2000);

  it("Count EOS-USDC Total Test", async () => {
    const total = countTotal(
      new Asset("1.0000 EOS"),
      new Asset("4.00000 USDC")
    );
    expect(total.toString()).to.deep.equal("4.00000 USDC");
  }).timeout(2000);

  it("Count EOS-USDC Total ExtendedAsset Test", async () => {
    const total = countTotal(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.00000 USDC"), new Name("usdc.ptokens"))
    );
    expect(total.toString()).to.deep.equal("4.00000 USDC@usdc.ptokens");
  }).timeout(2000);

  it("Count PBTC-USDT Total Test", async () => {
    const total = countTotal(
      new Asset("1.00000000 PBTC"),
      new Asset("20000.0000 USDT")
    );
    expect(total.toString()).to.deep.equal("20000.0000 USDT");
  }).timeout(2000);

  it("Count PBTC-USDT Total ExtendedAsset Test", async () => {
    const total = countTotal(
      new ExtendedAsset(new Asset("1.00000000 PBTC"), new Name("btc.ptokens")),
      new ExtendedAsset(new Asset("20000.0000 USDT"), new Name("tethertether"))
    );
    expect(total.toString()).to.deep.equal("20000.0000 USDT@tethertether");
  }).timeout(2000);
});
