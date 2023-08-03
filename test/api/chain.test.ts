import { expect } from "chai";
import fetch from "node-fetch";
import {
  GetCurrencyStats,
  GetCurrencyBalance,
  PoolPayload,
} from "../../src/interfaces";
import { ChainApi } from "../../src/api";

// tslint:disable-next-line:no-var-requires

describe("Chain Api Tests", () => {
  const api = new ChainApi(
    "https://telos-testnet.a-dex.xyz",
    "swap.dex",
    fetch
  );

  it("Get Currency Stats Test", async () => {
    const res = await api.getCurrencyStats({
      code: "swap.adex",
      symbol: "LPA",
    });
    const json = await res.json();
    expect(json).to.be.a("object");
  }).timeout(2000);

  it("Get Currency Balance Test", async () => {
    const res = await api.getCurrencyBalance({
      code: "swap.adex",
      account: "testerjungl3",
      symbol: "LPA",
    });
    const json = await res.json();
    expect(json).to.be.a("array");
  }).timeout(20000);

  it("Get Pool By ID Test", async () => {
    const res = await api.getPoolByID({
      id: "1",
    });
    const json = await res.json();
    expect(json).to.be.a("object");
  }).timeout(20000);

  it("Get Pool By Code Test", async () => {
    const res = await api.getPoolByCode({
      code: "LPA",
    });
    const json = await res.json();
    expect(json).to.be.a("object");
  }).timeout(20000);

  it("Get Pool By SHA256 Test", async () => {
    const resp = await api.getPoolByPairSHA256({
      pairSHA256:
        "b08da8e4fdf0c9aa360622017e2f45297cf63042f82f11dba54f48fd09770619",
    });
    const json = await resp.json();
    expect(json).to.be.a("object");
  }).timeout(20000);
});
