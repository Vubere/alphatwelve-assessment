// src/components/SideNav.tsx
import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse, Tooltip } from "@mui/material";
import { Home, Info, Menu, ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Constants for drawer width
const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;

// Styled Drawer component with conditional width
const DrawerStyled = styled(Drawer)<{ open: boolean }>(({ theme, open }) => ({
  width: open ? drawerWidthExpanded : drawerWidthCollapsed,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidthExpanded : drawerWidthCollapsed,
    transition: theme?.transitions?.create?.("width", {
      easing: theme?.transitions?.easing?.sharp,
      duration: theme?.transitions?.duration?.enteringScreen,
    }),
    overflowX: "hidden",
  },
}));

const SideNav: React.FC = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [isSubMenuOpen, setSubMenuOpen] = useState(true);

  const handleDrawerToggle = () => {
    setNavOpen(!isNavOpen);
  };

  const handleSubMenuToggle = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <>
      <IconButton onClick={handleDrawerToggle}>
        <Menu />
      </IconButton>

      <DrawerStyled variant="permanent" open={isNavOpen}>
        <List>
          <Tooltip title={isNavOpen ? "" : "Home"} placement="right">
            <ListItem component="li">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              {isNavOpen && <ListItemText primary="Home" />}
            </ListItem>
          </Tooltip>
          <Tooltip title={isNavOpen ? "" : "About"} placement="right">
            <ListItem component="li" onClick={handleSubMenuToggle}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              {isNavOpen && <ListItemText primary="About" />}
              {isNavOpen && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
          </Tooltip>

          {isNavOpen && (
            <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem component="li">
                  <ListItemText inset primary="Our Team" />
                </ListItem>
                <ListItem component="li">
                  <ListItemText inset primary="Our History" />
                </ListItem>
              </List>
            </Collapse>
          )}
        </List>
      </DrawerStyled>
    </>
  );
};

export default SideNav;
