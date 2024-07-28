import React from 'react';
import { Avatar, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { Person } from '@features/swapi/models/person';
import { blue, deepOrange, green, red } from '@mui/material/colors';
import CardBadge from './CardBadge';
import PersonCardActions from './PersonCardActions';
import StyledCard from 'components/Card';
import './PersonCard.css';

interface PersonCardProps {
  person: Person;
}

function getPersonColor(name: string) {
  const colors = [blue[400], green[400], red[400], deepOrange[400]];
  const asciiValue = name.charCodeAt(0);
  const colorIndex = asciiValue % colors.length;
  return colors[colorIndex];
}

const PersonCard = React.memo<PersonCardProps>(({ person }) => {
  return (
    <StyledCard className="PersonCard">
      <CardBadge className="PersonCard--CardBadge" />
      <CardContent className="PersonCard--Content">
        <Avatar className="PersonCard--Avatar" sx={{ backgroundColor: getPersonColor(person.name) }}>
          {person.name[0]}
        </Avatar>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {person.name}
          </Typography>
          <Typography className="PersonCard--Description" fontWeight={400}>
            {person.birthYear} - {person.gender}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label={`Height: ${person.height} cm`} variant="outlined" />
          <Chip label={`Mass: ${person.mass} kg`} variant="outlined" />
        </Stack>
      </CardContent>
      <Divider className="PersonCard--Divider" />
      <PersonCardActions person={person} />
    </StyledCard>
  );
});

export default PersonCard;
