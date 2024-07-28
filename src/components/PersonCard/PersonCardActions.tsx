import { Avatar, IconButton, CardActions, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Person } from '@features/swapi/models/person';
import { blue, deepOrange, green, red } from '@mui/material/colors';
import MovieIcon from '@mui/icons-material/Movie';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import './PersonCardActions.css';

interface PersonCardAtionsProps {
  person: Person;
}
function PersonCardActions({ person }: PersonCardAtionsProps) {
  const actionButtons = useMemo(
    () => [
      { Icon: MovieIcon, length: person.films.length, color: blue[200] },
      { Icon: PetsIcon, length: person.species.length, color: green[200] },
      { Icon: DirectionsCarIcon, length: person.vehicles.length, color: red[200] },
      { Icon: RocketLaunchIcon, length: person.starships.length, color: deepOrange[200] },
    ],
    [person]
  );

  return (
    <CardActions className="PersonCardActions">
      <Stack direction="row" justifyContent="center" width="100%" spacing={2}>
        {actionButtons
          .filter((button) => button.length)
          .map((button) => (
            <IconButton key={button.color}>
              <Avatar className="PersonCardActions--Avatar" sx={{ color: button.color }}>
                <button.Icon />
                <Typography className="PersonCardActions--Count" color="#333333" fontWeight={600} fontSize={14}>
                  {button.length}
                </Typography>
              </Avatar>
            </IconButton>
          ))}
      </Stack>
    </CardActions>
  );
}

export default PersonCardActions;
