import React from 'react';
import { StarShip } from '@features/swapi/models/transport';
import { CardContent, CardHeader, Typography } from '@mui/material';
import StyledCard from 'components/Card';

interface StarshipCardProps {
  starship: StarShip;
}

const StarshipCard = React.memo<StarshipCardProps>(({ starship }) => {
  return (
    <StyledCard>
      <CardHeader title={starship.name} subheader={`Class ${starship.starshipClass}`} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Model:</strong> {starship.model}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Manufacturer:</strong> {starship.manufacturer}
        </Typography>
        {starship.costInCredits !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Cost in Credits:</strong> {starship.costInCredits}
          </Typography>
        )}
        {starship.hyperdriveRating !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Hyperdrive Rating:</strong> {starship.hyperdriveRating}
          </Typography>
        )}
        {starship.MGLT !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>MGLT:</strong> {starship.MGLT}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
});

export default StarshipCard;
