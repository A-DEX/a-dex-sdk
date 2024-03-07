import { expect } from "chai";
import { EosioAuthorizationObject } from "../../src/types";
import { EosioTokenActionGenerator } from "../../src/actions";
import { Name, Sym, ExtendedSymbol } from "eos-common";

// tslint:disable-next-line:no-var-requires

describe("Eosio Token Action Generator Tests", () => {
  const auth: EosioAuthorizationObject[] = [
    {
      actor: "tester",
      permission: "active",
    },
  ];
  const actionsGen = new EosioTokenActionGenerator("eosio.token");

  it("Open Action Object", async () => {
    const act = await actionsGen.open(auth, "tester", "4,EOS", "tester");
    expect(act).to.deep.equal([
      {
        account: "eosio.token",
        name: "open",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { owner: "tester", symbol: "4,EOS", ram_payer: "tester" },
      },
    ]);
  }).timeout(2000);

  it("Close Action Object", async () => {
    const act = await actionsGen.close(auth, "tester", "4,EOS");
    expect(act).to.deep.equal([
      {
        account: "eosio.token",
        name: "close",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { owner: "tester", symbol: "4,EOS" },
      },
    ]);
  }).timeout(2000);

  it("Create Action Object", async () => {
    const act = await actionsGen.create(
      auth,
      "eosio",
      "461168601842738.7903 EOS"
    );
    expect(act).to.deep.equal([
      {
        account: "eosio.token",
        name: "create",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          issuer: "eosio",
          maximum_supply: "461168601842738.7903 EOS",
        },
      },
    ]);
  }).timeout(2000);

  it("Issue Action Object", async () => {
    const act = await actionsGen.issue(auth, "tester", "1.0000 EOS", "hola");
    expect(act).to.deep.equal([
      {
        account: "eosio.token",
        name: "issue",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { to: "tester", quantity: "1.0000 EOS", memo: "hola" },
      },
    ]);
  }).timeout(2000);

  it("Retire Action Object", async () => {
    const act = await actionsGen.retire(auth, "1.0000 EOS", "hola");
    expect(act).to.deep.equal([
      {
        account: "eosio.token",
        name: "retire",
        authorization: [{ actor: "tester", permission: "active" }],
        data: { quantity: "1.0000 EOS", memo: "hola" },
      },
    ]);
  }).timeout(2000);

  it("Transfer Action Object", async () => {
    const act = await actionsGen.transfer(
      auth,
      "eosio.token",
      "tester",
      "tester2",
      "1.0000 EOS",
      "hola"
    );
    expect(act).to.deep.equal([
      {
        account: "eosio.token",
        name: "transfer",
        authorization: [{ actor: "tester", permission: "active" }],
        data: {
          from: "tester",
          to: "tester2",
          quantity: "1.0000 EOS",
          memo: "hola",
        },
      },
    ]);
  }).timeout(2000);
});
