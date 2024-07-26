import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from './constants';

interface MobileMenuProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}
const MobileMenu = React.memo<MobileMenuProps>(({ drawerOpen, toggleDrawer }) => {
  const location = useLocation();
  return (
    <>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          {MENU_ITEMS.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.to}
              onClick={toggleDrawer}
              selected={item.to === location.pathname}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
});

export default MobileMenu;
