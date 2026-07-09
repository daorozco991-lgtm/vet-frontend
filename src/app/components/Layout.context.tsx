import { useOutletContext } from "react-router-dom";

export function useLayoutContext() {
  return useOutletContext<LayoutContext>();
}
type LayoutContext = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  busqueda: string;
  setBusqueda: (value: string) => void;
  openCreateModal: boolean; 
  setOpenCreateModal: (value: boolean) => void;
};
