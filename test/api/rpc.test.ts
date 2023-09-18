import { expect } from "chai";
import fetch from "node-fetch";
import { RpcApi } from "../../src/api";

// tslint:disable-next-line:no-var-requires

describe("Rpc Api Tests", () => {
  const api = new RpcApi("https://jungle4.a-dex.io/api", fetch);

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

  it("Get Global Volume Chart Test", async () => {
    const res = await api.getGlobalVolumeChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Global Liquidity Chart Test", async () => {
    const res = await api.getGlobalLiquidityChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Global Transactions Chart Test", async () => {
    const res = await api.getGlobalTransactionsChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Pools Volume Chart Test", async () => {
    const res = await api.getPoolsVolumeChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Pools Liquidity Chart Test", async () => {
    const res = await api.getPoolsLiquidityChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Pools Price Chart Test", async () => {
    const res = await api.getPoolsPriceChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Pools Transactions Chart Test", async () => {
    const res = await api.getPoolsTransactionsChart();
    expect(res).to.be.a("object");
  }).timeout(20000);

  it("Get Actions Test", async () => {
    const res = await api.getActions();
    expect(res).to.be.a("object");
  }).timeout(20000);
});
