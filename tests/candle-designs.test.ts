import { describe, expect, it } from "vitest";

import { candleDesigns, getDesignOfTheDayIndex } from "@/lib/candle-designs";

describe("getDesignOfTheDayIndex", () => {
  it("keeps the same design for the whole day in Colombia", () => {
    const morning = new Date("2026-09-30T06:00:00-05:00");
    const night = new Date("2026-09-30T23:59:00-05:00");

    expect(getDesignOfTheDayIndex(morning)).toBe(getDesignOfTheDayIndex(night));
  });

  it("moves to the next design at midnight in Colombia", () => {
    const beforeMidnight = new Date("2026-09-30T23:59:00-05:00");
    const afterMidnight = new Date("2026-10-01T00:01:00-05:00");

    expect(getDesignOfTheDayIndex(afterMidnight)).toBe(
      (getDesignOfTheDayIndex(beforeMidnight) + 1) % candleDesigns.length,
    );
  });

  it("cycles through every design before repeating", () => {
    const start = new Date("2026-01-01T12:00:00-05:00");
    const seen = new Set(
      candleDesigns.map((_, offset) =>
        getDesignOfTheDayIndex(new Date(start.getTime() + offset * 86_400_000)),
      ),
    );

    expect(seen.size).toBe(candleDesigns.length);
  });
});
