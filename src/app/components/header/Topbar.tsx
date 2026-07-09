import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const drawerWidth = 240;

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  flex: "1 1 auto",
  minWidth: 0,
  maxWidth: 450,
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#fff",
    opacity: 1,
  },
}));

interface Props {
  busqueda: string;
  search: (value: string) => void;
  create: () => void;
  onMenuClick: () => void;
  pageTitle?: string;
}

export default function TopBar({
  busqueda,
  search,
  create,
  onMenuClick,
  pageTitle = "",
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            xs: "100%",
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            xs: 0,
            sm: `${drawerWidth}px`,
          },
          background: "linear-gradient(135deg, #1e88e5 0%, #1976d2  100%)",

          boxShadow: 4,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 1,
              display: {
                xs: "flex",
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {pageTitle && (
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              {pageTitle}
            </Typography>
          )}

          <SearchBar sx={{ boxShadow: 4 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => {
                search(e.target.value);
              }}
            />
          </SearchBar>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
            }}
          >
            <Button
              onClick={create}
              startIcon={<Add />}
              variant="outlined"
              color="inherit"
              size="small"
              sx={{
                ml: 1,
                textTransform: "none",
              }}
            >
              Nuevo
            </Button>
          </Box>

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <IconButton
              color="inherit"
              onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Mi perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mi cuenta</MenuItem>
      </Menu>

      <Menu
        id={mobileMenuId}
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={create}>
          <Add sx={{ mr: 1 }} />
          Nuevo
        </MenuItem>
      </Menu>
    </Box>
  );
}
