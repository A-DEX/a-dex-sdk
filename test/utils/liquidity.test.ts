import { expect } from "chai";
import { Name, Asset, ExtendedAsset } from "eos-common";
import { countAddLiquidity, countRemoveLiquidity } from "../../src/utils";

// tslint:disable-next-line:no-var-requires

describe("Liquidity Utils Tests", () => {
  it("Count Add Liquidity Test", async () => {
    const result = countAddLiquidity(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("0.5000 EOS")
    );
    expect(result[0].to_string()).to.deep.equal("0.5000 EOS");
    expect(result[1].to_string()).to.deep.equal("2.0000 USDT");

    const result2 = countAddLiquidity(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("2.0000 USDT")
    );
    expect(result2[0].to_string()).to.deep.equal("0.5000 EOS");
    expect(result2[1].to_string()).to.deep.equal("2.0000 USDT");
  }).timeout(2000);

  it("Count Add Liquidity ExtendedAsset Test", async () => {
    const result = countAddLiquidity(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new ExtendedAsset(new Asset("0.5000 EOS"), new Name("eosio.token"))
    );
    expect(result[0].toString()).to.deep.equal("0.5000 EOS@eosio.token");
    expect(result[1].toString()).to.deep.equal("2.0000 USDT@tethertether");

    const result2 = countAddLiquidity(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new ExtendedAsset(new Asset("2.0000 USDT"), new Name("tethertether"))
    );
    expect(result2[0].toString()).to.deep.equal("0.5000 EOS@eosio.token");
    expect(result2[1].toString()).to.deep.equal("2.0000 USDT@tethertether");
  }).timeout(2000);

  it("Count Remove Liquidity Test", async () => {
    const result = countRemoveLiquidity(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("10000 LPA"),
      new Asset("20000 LPA")
    );
    expect(result[0].to_string()).to.deep.equal("0.5000 EOS");
    expect(result[1].to_string()).to.deep.equal("2.0000 USDT");

    const result2 = countRemoveLiquidity(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("20000 LPA"),
      new Asset("20000 LPA")
    );
    expect(result2[0].to_string()).to.deep.equal("1.0000 EOS");
    expect(result2[1].to_string()).to.deep.equal("4.0000 USDT");

    const result3 = countRemoveLiquidity(
      new Asset("1.0000 EOS"),
      new Asset("4.0000 USDT"),
      new Asset("5000 LPA"),
      new Asset("20000 LPA")
    );
    expect(result3[0].to_string()).to.deep.equal("0.2500 EOS");
    expect(result3[1].to_string()).to.deep.equal("1.0000 USDT");
  }).timeout(2000);

  it("Count Remove Liquidity ExtendedAsset Test", async () => {
    const result = countRemoveLiquidity(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new Asset("10000 LPA"),
      new Asset("20000 LPA")
    );
    expect(result[0].toString()).to.deep.equal("0.5000 EOS@eosio.token");
    expect(result[1].toString()).to.deep.equal("2.0000 USDT@tethertether");

    const result2 = countRemoveLiquidity(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new Asset("20000 LPA"),
      new Asset("20000 LPA")
    );
    expect(result2[0].toString()).to.deep.equal("1.0000 EOS@eosio.token");
    expect(result2[1].toString()).to.deep.equal("4.0000 USDT@tethertether");

    const result3 = countRemoveLiquidity(
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      new Asset("5000 LPA"),
      new Asset("20000 LPA")
    );
    expect(result3[0].toString()).to.deep.equal("0.2500 EOS@eosio.token");
    expect(result3[1].toString()).to.deep.equal("1.0000 USDT@tethertether");
  }).timeout(2000);
});
