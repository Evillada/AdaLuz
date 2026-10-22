import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { OvalFrame } from "@/components/brand/OvalFrame";

describe("OvalFrame", () => {
  it("shows the image inside the oval with an optional halo", () => {
    const html = renderToStaticMarkup(
      <OvalFrame imageUrl="/reference/hero.jpg" halo stage="hero-media" />,
    );

    expect(html).toContain('data-stage="hero-media"');
    expect(html).toContain("oval-frame");
    expect(html).toContain("oval-halo");
    expect(html).toContain('url(&quot;/reference/hero.jpg&quot;)');
    expect(html).not.toContain("data-placeholder");
  });

  it("falls back to a cream placeholder without an image", () => {
    const html = renderToStaticMarkup(<OvalFrame imageUrl={null} thin />);

    expect(html).toContain('data-placeholder="cream"');
    expect(html).toContain("oval-frame--thin");
    expect(html).not.toContain("oval-halo");
  });
});

describe("BrandWatermark", () => {
  it("renders the symbol as a decorative image", () => {
    const html = renderToStaticMarkup(<BrandWatermark className="w-40" />);

    expect(html).toContain("adaluz-symbol.png");
    expect(html).toContain('alt=""');
    expect(html).toContain('aria-hidden="true"');
  });
});
