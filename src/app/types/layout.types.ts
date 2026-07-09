export type LayoutContext = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  busqueda: string;
  setBusqueda: (value: string) => void;
  openCreateModal: boolean;
  setOpenCreateModal: (value: boolean) => void;
};

export const DRAWER_WIDTH = 240;
