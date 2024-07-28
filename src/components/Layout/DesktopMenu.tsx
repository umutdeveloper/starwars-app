import { Button } from '@mui/material';
import { MENU_ITEMS } from './constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

function DesktopMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent, to: string) => {
    if (location.pathname === to) {
      event.preventDefault();
    } else {
      navigate(to);
    }
  };

  return MENU_ITEMS.map((item) => (
    <Button
      key={item.text}
      color="inherit"
      component={Link}
      to={item.to}
      onClick={(event) => handleClick(event, item.to)}
      {...(item.to === location.pathname && { sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } })}
    >
      {item.text}
    </Button>
  ));
}

export default DesktopMenu;
