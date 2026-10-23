import { ViewTransition } from "react";

export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="route-in" exit="route-out" default="none">
      <div className="site-page-enter">{children}</div>
    </ViewTransition>
  );
}
