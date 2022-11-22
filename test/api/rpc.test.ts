import { expect } from "chai";
import fetch from "node-fetch";
import RpcApi from "../../src/api/rpc";

// tslint:disable-next-line:no-var-requires

describe("Rpc Api Tests", () => {
  const api = new RpcApi("http://localhost:8080/api", fetch);

  it("Get Pools Test", async () => {
    const res = await api.getPools();
    expect(res).to.be.a("object");
  }).timeout(2000);

  it("Get Stats Test", async () => {
    const res = await api.getStats();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Liquidity By Account Test", async () => {
    const res = await api.getLiquidityByAccount("testerjungl3");
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Actions Test", async () => {
    const res = await api.getActions();
    expect(res).to.be.a("object");
  }).timeout(20000);
});
