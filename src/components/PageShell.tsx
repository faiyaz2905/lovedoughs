import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({
  children,
  minimalHeader = false,
  hideFooter = false,
}: {
  children: ReactNode;
  minimalHeader?: boolean;
  hideFooter?: boolean;
}) {
  return (
    <div className="min-h-screen bg-blush">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-chocolate focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header minimal={minimalHeader} />
      <main id="main">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
