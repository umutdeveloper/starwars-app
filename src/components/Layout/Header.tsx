import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import RocketOutlined from '@mui/icons-material/RocketOutlined';
import loadable from '@loadable/component';

const DesktopMenu = loadable(() => import('./DesktopMenu'));
const MobileMenu = loadable(() => import('./MobileMenu'));

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:720px)');

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography className="Header--Logo" variant="h4" fontWeight={700} sx={{ flexGrow: 1, display: 'flex', gap: '10px', alignItems: 'center' }}>
            <RocketOutlined />
            StarWars
          </Typography>
          {!isMobile && <DesktopMenu />}
        </Toolbar>
      </AppBar>
      {isMobile && <MobileMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />}
    </>
  );
}

export default Header;
