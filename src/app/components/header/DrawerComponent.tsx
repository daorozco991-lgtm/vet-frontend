import { CalendarMonth, Logout, People, Pets } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
type DrawerComponentProps = {
  busqueda: string;
  setBusqueda: (value: string) => void;
  closeDrawer?: () => void;
};

export const DrawerComponent = ({ setBusqueda, closeDrawer }: DrawerComponentProps) => {

  const navItems = [
    { text: "Citas", icon: <CalendarMonth fontSize="small" />, path: "/citas" },
    { text: "Mascotas", icon: <Pets fontSize="small" />, path: "/mascotas" },
    { text: "Dueños", icon: <People fontSize="small" />, path: "/duenos" },
  ];
  const user = {
    userName: localStorage.getItem("userName"),
    rol: localStorage.getItem("rol"),
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const initials = user.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : "??";
  const drawerComponent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
          minHeight: 64,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          boxShadow: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            <Link
              style={{ textDecoration: "none" }}
              to="#"
              onClick={() => window.location.reload()}
            >
              🐾
            </Link>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 17,
                lineHeight: 1.2,
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="#"
                onClick={() => window.location.reload()}
              >
                Huellitas
              </Link>
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 10.5,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="#"
                onClick={() => window.location.reload()}
              >
                Veterinaria
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: "12px 10px 0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            px: 1.25,
            pb: 1,
          }}
        >
          Menú
        </Typography>
        <List disablePadding>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: "2px" }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={() => {
                  setBusqueda("");
                  closeDrawer?.();
                }}
                sx={{
                  borderRadius: "9px",
                  px: 1.5,
                  py: 1,
                  gap: 1.25,
                  color: "#475569",
                  fontSize: 13.5,
                  fontWeight: 500,
                  "&:hover": { background: "#e3f2fd", color: "#1e88e5" },
                  "&.active": {
                    background: "#bbdefb",
                    color: "#0d47a1",
                    fontWeight: 600,
                  },
                  "&.active .icon-wrap": {
                    background: "rgba(30, 136, 229, 0.15)",
                  },
                  "&:hover .icon-wrap": {
                    background: "rgba(30, 136, 229, 0.1)",
                  },
                }}
              >
                <Box
                  className="icon-wrap"
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.15s",
                  }}
                >
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: "12px 10px 0" }}>
        <Box
          sx={{
            background: "rgba(30, 136, 229, 0.08)",
            borderRadius: "12px",
            p: "14px 12px",
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            mb: 2,
            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "rgba(30, 136, 229, 0.16)",
              color: "#0d47a1",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                color: "#0f172a",
                fontSize: 13,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.userName ?? "Usuario"}
            </Typography>
            <Typography sx={{ color: "#475569", fontSize: 11, mt: "1px" }}>
              {user.rol ?? "Rol"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mx: 1.25 }} />

        <Box sx={{ p: "10px 10px 16px" }}>
          <Button
            fullWidth
            startIcon={
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Logout fontSize="small" />
              </Box>
            }
            onClick={logout}
            sx={{
              justifyContent: "flex-start",
              gap: 1.25,
              px: 1.5,
              py: 1,
              borderRadius: "9px",
              color: "#0d47a1",
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              "&:hover": { background: "#e3f2fd" },
              boxShadow: 4,
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Box>
    </Box>
  );
  return drawerComponent;
};
