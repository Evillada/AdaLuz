import { describe, expect, it } from "vitest";

import { onlyPublished } from "@/lib/data/published";

describe("onlyPublished", () => {
  it("filters out unpublished items", () => {
    expect(
      onlyPublished([
        { published: true, id: "a" },
        { published: false, id: "b" },
      ]),
    ).toEqual([{ published: true, id: "a" }]);
  });
});
