import { getZoneName } from "../Country";

describe("Country", () => {
  it("returns country code as zoneName()", () => {
    const zoneName = getZoneName("GB");
    expect(zoneName).toBe("United Kingdom (UK)");
  });

  it("returns state code as zoneName()", () => {
    const zoneName = getZoneName("US:NY");
    expect(zoneName).toBe("New York");
  });
});
