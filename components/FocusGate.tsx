import { useIsFocused } from "expo-router/react-navigation";
import { useEffect, useState } from "react";

type FocusGateProps = {
  children: React.ReactNode;
  /** Delay unmount by this many ms after blur, to survive quick in-and-out navigation. */
  unmountDelay?: number;
};

export function FocusGate({ children, unmountDelay = 0 }: FocusGateProps) {
  const isFocused = useIsFocused();
  const [shouldRender, setShouldRender] = useState(isFocused);

  // Mount as soon as the screen is focused. Adjusting state during render
  // (instead of in an effect) avoids the extra cascading render.
  if (isFocused && !shouldRender) {
    setShouldRender(true);
  }

  // After blur, unmount once the delay passes. If the screen regains focus
  // first, the cleanup cancels the pending unmount.
  useEffect(() => {
    if (isFocused) return undefined;
    const timer = setTimeout(() => setShouldRender(false), unmountDelay);
    return () => clearTimeout(timer);
  }, [isFocused, unmountDelay]);

  return shouldRender ? <>{children}</> : null;
}