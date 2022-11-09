import { expect } from "chai";
import { parseQueryParams } from "../../src/utils";

describe("API Utils Tests", () => {
  it("Parse Query Params Test", () => {
    const result = parseQueryParams({
      limit: 10,
      offset: 10,
      action: "transfer",
      contract: undefined,
    });
    expect(result).to.deep.equal("limit=10&offset=10&action=transfer");
  }).timeout(2000);
});
