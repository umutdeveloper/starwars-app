import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React, { useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import loadable from '@loadable/component';

const DesktopMenu = loadable(() => import('./DesktopMenu'));
const MobileMenu = loadable(() => import('./MobileMenu'));

const Header = React.memo(() => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:640px)');

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            StarWars
          </Typography>
          {!isMobile && <DesktopMenu />}
        </Toolbar>
      </AppBar>
      {isMobile && <MobileMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />}
    </>
  );
});

export default Header;
