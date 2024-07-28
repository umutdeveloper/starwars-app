import React from 'react';
import { Species } from '@features/swapi/models/species';
import { CardContent, CardHeader, Typography } from '@mui/material';
import StyledCard from 'components/Card';

interface SpeciesCardProps {
  species: Species;
}

const SpeciesCard = React.memo<SpeciesCardProps>(({ species }) => {
  return (
    <StyledCard className="SpeciesCard">
      <CardHeader title={species.name} subheader={`Designation ${species.designation}`} />
      <CardContent>
        {species.averageHeight !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Average Height:</strong> {species.averageHeight}
          </Typography>
        )}
        {species.averageLifespan !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Average Lifespan:</strong> {species.averageLifespan}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Classification:</strong> {species.classification}
        </Typography>
        {species.eyeColors.length > 0 && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Eye Colors:</strong> {species.eyeColors.join(', ')}
          </Typography>
        )}
        {species.hairColors.length > 0 && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Hair Colors:</strong> {species.hairColors.join(', ')}
          </Typography>
        )}
        {species.skinColors.length > 0 && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Skin Colors:</strong> {species.skinColors.join(', ')}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
});

export default SpeciesCard;
