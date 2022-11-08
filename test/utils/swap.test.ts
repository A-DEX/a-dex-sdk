import { expect } from "chai";
import { Asset, ExtendedAsset, Name } from "eos-common";
import {
  countPrice,
  countTotalFeeAmount,
  countAmountSending,
  countAmountIn,
  countAmountReceiving,
  countAtLeastGet,
} from "../../src/utils";

// tslint:disable-next-line:no-var-requires

describe("Swap Utils Tests", () => {
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

  it("Count Total Fee Amount Test", async () => {
    const totalFee = countTotalFeeAmount(
      new Asset("4.0000 USDT"),
      new Asset("0.25 PERCENT")
    );
    expect(totalFee.to_string()).to.deep.equal("0.0100 USDT");

    const totalFee2 = countTotalFeeAmount(
      new Asset("0.0800 USDT"),
      new Asset("0.25 PERCENT")
    );
    expect(totalFee2.to_string()).to.deep.equal("0.0002 USDT");

    const totalFee3 = countTotalFeeAmount(
      new Asset("0.0000 USDT"),
      new Asset("0.25 PERCENT")
    );
    expect(totalFee3.to_string()).to.deep.equal("0.0002 USDT");
  }).timeout(2000);

  it("Count Total Fee Amount ExtendedAsset Test", async () => {
    const totalFee = countTotalFeeAmount(
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new Asset("0.25 PERCENT")
    );
    expect(totalFee.toString()).to.deep.equal("0.0100 USDT@tethertether");

    const totalFee2 = countTotalFeeAmount(
      new ExtendedAsset(new Asset("0.0800 USDT"), new Name("tethertether")),
      new Asset("0.25 PERCENT")
    );
    expect(totalFee2.toString()).to.deep.equal("0.0002 USDT@tethertether");

    const totalFee3 = countTotalFeeAmount(
      new ExtendedAsset(new Asset("0.0000 USDT"), new Name("tethertether")),
      new Asset("0.25 PERCENT")
    );
    expect(totalFee3.toString()).to.deep.equal("0.0002 USDT@tethertether");
  }).timeout(2000);

  it("Count EOS-USDT Amount In Test", async () => {
    const amountIn = countAmountIn(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("1.3302 USDT")
    );
    expect(amountIn.to_string()).to.deep.equal("0.4982 EOS");
  }).timeout(2000);

  it("Count EOS-USDT Amount In ExtendedAsset Test", async () => {
    const amountIn = countAmountIn(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new ExtendedAsset(new Asset("1.3302 USDT"), new Name("tethertether"))
    );
    expect(amountIn.toString()).to.deep.equal("0.4982 EOS@eosio.token");
  }).timeout(2000);

  it("Count EOS-USDT Amount Sending Test", async () => {
    const [amountSending, totalFee] = countAmountSending(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("1.3302 USDT"),
      new Asset("0.20 PERCENT"),
      new Asset("0.05 PERCENT"),
      new Asset("100.00 PERCENT")
    );
    expect(amountSending.to_string()).to.deep.equal("0.4994 EOS");
    expect(totalFee.to_string()).to.deep.equal("0.0012 EOS");
  }).timeout(2000);

  it("Count EOS-USDT Amount Sending ExtendedAsset Test", async () => {
    const [amountSending, totalFee] = countAmountSending(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new ExtendedAsset(new Asset("1.3302 USDT"), new Name("tethertether")),
      new Asset("0.20 PERCENT"),
      new Asset("0.05 PERCENT"),
      new Asset("100.00 PERCENT")
    );

    expect(amountSending.toString()).to.deep.equal("0.4994 EOS@eosio.token");
    expect(totalFee.toString()).to.deep.equal("0.0012 EOS@eosio.token");
  }).timeout(2000);

  it("Count EOS-USDT Amount Sending Overflow Test", async () => {
    const [amountSending, totalFee] = countAmountSending(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("5.0000 USDT"),
      new Asset("0.20 PERCENT"),
      new Asset("0.05 PERCENT"),
      new Asset("100.00 PERCENT")
    );
    expect(amountSending.to_string()).to.deep.equal("-5.0125 EOS");
    expect(totalFee.to_string()).to.deep.equal("0.0002 EOS");
  }).timeout(2000);

  it("Count USDT-EOS Amount Receiving Test", async () => {
    const [amountReceiving, totalFee] = countAmountReceiving(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("0.20 PERCENT"),
      new Asset("0.05 PERCENT"),
      new Asset("4.0000 USDT")
    );
    expect(amountReceiving.to_string()).to.deep.equal("0.4994 EOS");
    expect(totalFee.to_string()).to.deep.equal("0.0100 USDT");
  }).timeout(2000);

  it("Count USDT-EOS Amount In Test", async () => {
    const amountIn = countAmountIn(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("1.3302 USDT")
    );
    expect(amountIn.to_string()).to.deep.equal("0.4982 EOS");
  }).timeout(2000);

  it("Count USDT-EOS Amount Sending Test", async () => {
    const [amountSending, totalFee] = countAmountSending(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("1.3302 USDT"),
      new Asset("0.20 PERCENT"),
      new Asset("0.05 PERCENT"),
      new Asset("100.00 PERCENT")
    );
    expect(amountSending.to_string()).to.deep.equal("0.4994 EOS");
    expect(totalFee.to_string()).to.deep.equal("0.0012 EOS");
  }).timeout(2000);

  it("Count EOS-USDT Amount Receiving Test", async () => {
    const [amountReceiving, totalFee] = countAmountReceiving(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("0.20 PERCENT"),
      new Asset("0.05 PERCENT"),
      new Asset("0.4994 EOS")
    );
    expect(amountReceiving.to_string()).to.deep.equal("1.3302 USDT");
    expect(totalFee.to_string()).to.deep.equal("0.0012 EOS");
  }).timeout(2000);

  it("Count At Least Get Test", async () => {
    const atLeastGet = countAtLeastGet(
      new Asset("0.4994 EOS"),
      new Asset("1.00 PERCENT")
    );
    expect(atLeastGet.to_string()).to.deep.equal("0.4944 EOS");
  }).timeout(2000);

  it("Count At Least Get ExtendedAsset Test", async () => {
    const atLeastGet = countAtLeastGet(
      new ExtendedAsset(new Asset("0.4994 EOS"), new Name("eosio.token")),
      new Asset("1.00 PERCENT")
    );
    expect(atLeastGet.toString()).to.deep.equal("0.4944 EOS@eosio.token");
  }).timeout(2000);
});
