import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import TopBar from "../header/Topbar";
import { useState } from "react";
import { DrawerComponent } from "../header/DrawerComponent";
import type { LayoutContext } from "../../types/layout.types";

const drawerWidth = 240;


export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaVoz, setBusquedaVoz] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <TopBar
        busqueda={busqueda}
        busquedaVoz={() => {setBusquedaVoz(!busquedaVoz)}}
        search={(val: string) => setBusqueda(val)}
        create={() => setOpenCreateModal(true)}
        onMenuClick={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerComponent
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            closeDrawer={() => setMobileOpen(false)}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
            },
          }}
        >
          <DrawerComponent
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, flexGrow: 1, overflow: "auto" }}>
          <Outlet
            context={
              {
                mobileOpen,
                handleDrawerToggle,
                busqueda,
                setBusqueda,
                openCreateModal,
                setOpenCreateModal,
                busquedaVoz,
                setBusquedaVoz
              } satisfies LayoutContext
            }
          />{" "}
        </Box>
      </Box>
      <div
    style={{
        position: "fixed",
        bottom: 30,
        right: 30
    }}
>
</div>
    </Box>
  );
};

export default Layout;
