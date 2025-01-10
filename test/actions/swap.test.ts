import { expect } from "chai";
import { EosioAuthorizationObject } from "../../src/types";
import { SwapActionGenerator } from "../../src/actions";
import { Name, Sym, ExtendedSymbol } from "eos-common";

// tslint:disable-next-line:no-var-requires

describe("Swap Action Generator Tests", () => {
  const auth: EosioAuthorizationObject[] = [
    {
      actor: "tester",
      permission: "active",
    },
  ];
  const actionsGen = new SwapActionGenerator("swap.adex");

  it("Open Action Object", async () => {
    const act = await actionsGen.open(
      auth,
      "swap.a-dex",
      "tester",
      "0,LPA",
      "tester"
    );
    expect(act).to.deep.equal([
      {
        account: "swap.a-dex",
        name: "open",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { owner: "tester", symbol: "0,LPA", ram_payer: "tester" },
      },
    ]);
  }).timeout(2000);

  it("Close Action Object", async () => {
    const act = await actionsGen.close(auth, "tester", "0,LPA");
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "close",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { owner: "tester", symbol: "0,LPA" },
      },
    ]);
  }).timeout(2000);

  it("Withdraw Action Object", async () => {
    const act = await actionsGen.withdraw(auth, "tester", "1000 LPA");
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "withdraw",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { owner: "tester", quantity: "1000 LPA" },
      },
    ]);
  }).timeout(2000);

  it("Create Action Object", async () => {
    const act = await actionsGen.create(
      auth,
      "swap.a-dex",
      "4611686018427387903 LPA"
    );
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "create",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          issuer: "swap.a-dex",
          maximum_supply: "4611686018427387903 LPA",
        },
      },
    ]);
  }).timeout(2000);

  it("Issue Action Object", async () => {
    const act = await actionsGen.issue(auth, "tester", "46116 LPA", "hola");
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "issue",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { to: "tester", quantity: "46116 LPA", memo: "hola" },
      },
    ]);
  }).timeout(2000);

  it("Retire Action Object", async () => {
    const act = await actionsGen.retire(auth, "tester", "46116 LPA", "hola");
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "retire",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { from: "tester", quantity: "46116 LPA", memo: "hola" },
      },
    ]);
  }).timeout(2000);

  it("Transfer Action Object", async () => {
    const act = await actionsGen.transfer(
      auth,
      "swap.a-dex",
      "tester",
      "tester2",
      "46116 LPA",
      "hola"
    );
    expect(act).to.deep.equal([
      {
        account: "swap.a-dex",
        name: "transfer",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          from: "tester",
          to: "tester2",
          quantity: "46116 LPA",
          memo: "hola",
        },
      },
    ]);
  }).timeout(2000);

  it("Create Pool Action Object", async () => {
    const act = await actionsGen.createPool(
      auth,
      JSON.stringify(
        new ExtendedSymbol(new Sym("EOS", 4), new Name("eosio.token")).toJSON()
      ),
      JSON.stringify(
        new ExtendedSymbol(
          new Sym("USDT", 4),
          new Name("tethertether")
        ).toJSON()
      )
    );
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "createpool",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          base_token: '{"sym":"4,EOS","contract":"eosio.token"}',
          quote_token: '{"sym":"4,USDT","contract":"tethertether"}',
        },
      },
    ]);
  }).timeout(2000);

  it("Remove Pool Action Object", async () => {
    const act = await actionsGen.createPool(
      auth,
      JSON.stringify(
        new ExtendedSymbol(new Sym("EOS", 4), new Name("eosio.token")).toJSON()
      ),
      JSON.stringify(
        new ExtendedSymbol(
          new Sym("USDT", 4),
          new Name("tethertether")
        ).toJSON()
      )
    );
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "createpool",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          base_token: '{"sym":"4,EOS","contract":"eosio.token"}',
          quote_token: '{"sym":"4,USDT","contract":"tethertether"}',
        },
      },
    ]);
  }).timeout(2000);

  it("Deposit Action Object", async () => {
    const act = await actionsGen.deposit(
      auth,
      "tester",
      "1"
    );
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "deposit",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          owner: 'tester',
          pool_id: '1',
        },
      },
    ]);
  }).timeout(2000);

  it("Refund Action Object", async () => {
    const act = await actionsGen.refund(
      auth,
      "tester",
      "1"
    );
    expect(act).to.deep.equal([
      {
        account: "swap.adex",
        name: "refund",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          owner: 'tester',
          pool_id: '1',
        },
      },
    ]);
  }).timeout(2000);
});
