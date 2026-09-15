import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  LoginForm,
  LoginSubmitButtonView,
} from "@/components/admin/LoginForm";

describe("LoginForm", () => {
  it("shows one generic message for failed authentication", () => {
    const html = renderToStaticMarkup(
      <LoginForm action={async () => {}} hasError />,
    );

    expect(html).toContain("Credenciales inválidas");
    expect(html).not.toContain("correo o la contraseña");
  });

  it("disables submission and communicates progress while pending", () => {
    const html = renderToStaticMarkup(<LoginSubmitButtonView pending />);

    expect(html).toContain("disabled");
    expect(html).toContain("aria-disabled=\"true\"");
    expect(html).toContain("Ingresando…");
  });
});
