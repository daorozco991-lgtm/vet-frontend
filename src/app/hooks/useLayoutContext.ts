import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../types/layout.types";

export function useLayoutContext() {
  return useOutletContext<LayoutContext>();
}
