import { expect } from "chai";
import { EosioAuthorizationObject } from "../../src/types";
import { EosioTokenActionGenerator } from "../../src/actions";
import { EosioTokenTransactionGenerator } from "../../src/transactions";
import { ExtendedAsset, Name, Asset } from "eos-common";

// tslint:disable-next-line:no-var-requires

describe("Eosio Token Transaction Generator Tests", () => {
  const auth: EosioAuthorizationObject[] = [
    {
      actor: "tester",
      permission: "active",
    },
  ];
  const actionsGen = new EosioTokenActionGenerator("eosio.token");
  const trxGen = new EosioTokenTransactionGenerator(auth, actionsGen);

  it("Transfer", async () => {
    const trx = await trxGen.transfer(
      new Name("tester"),
      new Name("receiver"),
      new ExtendedAsset(new Asset("1.0000 EOS"), new Name("eosio.token")),
      "test memo"
    );
    expect(trx).to.deep.equal({
      actions: [
        {
          account: "eosio.token",
          name: "transfer",
          authorization: [{ actor: "tester", permission: "active" }],
          data: {
            from: "tester",
            to: "receiver",
            quantity: "1.0000 EOS",
            memo: "test memo",
          },
        },
      ],
    });
  }).timeout(2000);
});
