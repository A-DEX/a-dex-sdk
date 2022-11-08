import { doesNotMatch } from "assert";
import { expect } from "chai";
import { EosioAuthorizationObject } from "../../src/types";
import { SwapActionGenerator } from "../../src/actions";
import { SwapTransactionGenerator } from "../../src/transactions";
import { ExtendedAsset, Name, Sym, Asset, ExtendedSymbol } from "eos-common";

// tslint:disable-next-line:no-var-requires

describe("Transaction Generator Tests", () => {
  const auth: EosioAuthorizationObject[] = [
    {
      actor: "tester",
      permission: "active",
    },
  ];
  const actionsGen = new SwapActionGenerator("swap.adex");
  const trxGen = new SwapTransactionGenerator(auth, actionsGen);

  it("Add Liquidity Transaction Object", async () => {
    const trx = await trxGen.addLiquidity(
      new Name("tester"),
      new Sym("LPA", 0),
      0,
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether"))
    );
    expect(trx).to.deep.equal({
      actions: [
        {
          account: "swap.adex",
          name: "open",
          authorization: [{ actor: "tester", permission: "active" }],
          data: { owner: "tester", symbol: "0,LPA", ram_payer: "tester" },
        },
        {
          account: "eosio.token",
          name: "transfer",
          authorization: [{ actor: "tester", permission: "active" }],
          data: {
            from: "tester",
            to: "swap.adex",
            quantity: "1.0000 EOS",
            memo: "deposit:0",
          },
        },
        {
          account: "tethertether",
          name: "transfer",
          authorization: [{ actor: "tester", permission: "active" }],
          data: {
            from: "tester",
            to: "swap.adex",
            quantity: "4.0000 USDT",
            memo: "deposit:0",
          },
        },
      ],
    });
  }).timeout(2000);

  it("Remove Liquidity Transaction Object", async () => {
    const trx = await trxGen.removeLiquidity(
      new Name("tester"),
      new Asset("1000 LPA"),
      new ExtendedSymbol(new Sym("EOS", 4), new Name("eosio.token")),
      new ExtendedSymbol(new Sym("USDT", 4), new Name("tethertether"))
    );
    expect(trx).to.deep.equal({
      actions: [
        {
          account: "eosio.token",
          name: "open",
          authorization: [{ actor: "tester", permission: "active" }],
          data: { owner: "tester", symbol: "4,EOS", ram_payer: "tester" },
        },
        {
          account: "tethertether",
          name: "open",
          authorization: [{ actor: "tester", permission: "active" }],
          data: { owner: "tester", symbol: "4,USDT", ram_payer: "tester" },
        },
        {
          account: "swap.adex",
          name: "withdraw",
          authorization: [{ actor: "tester", permission: "active" }],
          data: { owner: "tester", quantity: "1000 LPA" },
        },
      ],
    });
  }).timeout(2000);

  it("Swap By Market Price Transaction Object", async () => {
    const trx = await trxGen.swapByMarketPrice(
      new Name("tester"),
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      "1-2-3"
    );
    expect(trx).to.deep.equal({
      actions: [
        {
          account: "tethertether",
          name: "open",
          authorization: [{ actor: "tester", permission: "active" }],
          data: { owner: "tester", symbol: "4,USDT", ram_payer: "tester" },
        },
        {
          account: "eosio.token",
          name: "transfer",
          authorization: [{ actor: "tester", permission: "active" }],
          data: {
            from: "tester",
            to: "swap.adex",
            quantity: "1.0000 EOS",
            memo: "swap:1-2-3",
          },
        },
      ],
    });
  }).timeout(2000);

  it("Swap With Min Received Amount Transaction Object", async () => {
    const trx = await trxGen.swapWithMinReceived(
      new Name("tester"),
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      new ExtendedAsset(new Asset("4.0000 USDT"), new Name("tethertether")),
      "1-2-3"
    );
    expect(trx).to.deep.equal({
      actions: [
        {
          account: "tethertether",
          name: "open",
          authorization: [{ actor: "tester", permission: "active" }],
          data: { owner: "tester", symbol: "4,USDT", ram_payer: "tester" },
        },
        {
          account: "eosio.token",
          name: "transfer",
          authorization: [{ actor: "tester", permission: "active" }],
          data: {
            from: "tester",
            to: "swap.adex",
            quantity: "1.0000 EOS",
            memo: "swap:1-2-3;min:40000",
          },
        },
      ],
    });
  }).timeout(2000);
});
