import { ViewTransition } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="site-page-enter">{children}</div>
    </ViewTransition>
  );
}
