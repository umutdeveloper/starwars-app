import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Drawer, List, ListItemButton, ListItemText, IconButton, useMediaQuery } from '@mui/material';
import { Link, Location, Outlet, useLocation } from 'react-router-dom';
import { Routes } from 'utils/routes';
import MenuIcon from '@mui/icons-material/Menu';

const MENU_ITEMS = [
    { text: 'People', to: Routes.People },
    { text: 'Films', to: Routes.Films },
    { text: 'Planets', to: Routes.Planets },
    { text: 'Species', to: Routes.Species },
    { text: 'Starships', to: Routes.Starships },
    { text: 'Vehicles', to: Routes.Vehicles },
];

interface DrawerContentProps { toggleDrawer: () => void; activeRoute: string }
const DrawerContent = React.memo<DrawerContentProps>(({ toggleDrawer, activeRoute }) => (
    <List>
        {MENU_ITEMS.map((item) => (
            <ListItemButton
                key={item.text}
                component={Link}
                to={item.to}
                onClick={toggleDrawer}
                selected={item.to === activeRoute}
            >
                <ListItemText primary={item.text} />
            </ListItemButton>
        ))}
    </List>
));

interface MenuContentProps { location: Location }
const MenuContent = React.memo<MenuContentProps>(({ location }) => (
    MENU_ITEMS.map((item) => (
        <Button
            key={item.text}
            color="inherit"
            component={Link}
            to={item.to}
            sx={{ backgroundColor: item.to === location.pathname ? 'rgba(0, 0, 0, 0.04)' : 'inherit' }}
        >
            {item.text}
        </Button>
    ))
));

function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:640px)');
    const location = useLocation();

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
                    {!isMobile && <MenuContent location={location} />}
                </Toolbar>
            </AppBar>
            {isMobile && (
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <DrawerContent toggleDrawer={toggleDrawer} activeRoute={location.pathname} />
                </Drawer>
            )}
            <Container>
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;
