import React from 'react';
import { Planet } from '@features/swapi/models/planet';
import { CardContent, CardHeader, Typography } from '@mui/material';
import StyledCard from 'components/Card';

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard = React.memo<PlanetCardProps>(({ planet }) => {
  return (
    <StyledCard>
      <CardHeader title={planet.name} subheader={`Gravity ${planet.gravity}`} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Climate:</strong> {planet.climate}
        </Typography>
        {planet.population !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Population:</strong> {planet.population}
          </Typography>
        )}
        {planet.orbitalPeriod !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Orbital Period:</strong> {planet.orbitalPeriod}
          </Typography>
        )}
        {planet.rotationPeriod !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Rotation Period:</strong> {planet.rotationPeriod}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
});

export default PlanetCard;
