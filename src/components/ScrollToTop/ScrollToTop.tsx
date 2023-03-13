import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Script to scroll page to top on page change */
export default function ScrollToTop({ children }: any) {
  const { pathname } = useLocation();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
