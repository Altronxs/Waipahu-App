import { useIsFocused } from "expo-router/react-navigation";
import { useEffect, useRef, useState } from "react";

type FocusGateProps = {
  children: React.ReactNode;
  /** Delay unmount by this many ms after blur, to survive quick in-and-out navigation. */
  unmountDelay?: number;
};

export function FocusGate({ children, unmountDelay = 0 }: FocusGateProps) {
  const isFocused = useIsFocused();
  const [shouldRender, setShouldRender] = useState(isFocused);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFocused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setShouldRender(true);
    } else if (unmountDelay > 0) {
      timerRef.current = setTimeout(() => setShouldRender(false), unmountDelay);
    } else {
      setShouldRender(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isFocused, unmountDelay]);

  return shouldRender ? <>{children}</> : null;
}