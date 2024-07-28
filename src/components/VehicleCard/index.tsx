import React from 'react';
import { Vehicle } from '@features/swapi/models/transport';
import { CardContent, CardHeader, Typography } from '@mui/material';
import StyledCard from 'components/Card';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = React.memo<VehicleCardProps>(({ vehicle }) => {
  return (
    <StyledCard className="VehicleCard">
      <CardHeader title={vehicle.name} subheader={`Class ${vehicle.vehicleClass}`} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Model:</strong> {vehicle.model}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Manufacturer:</strong> {vehicle.manufacturer}
        </Typography>
        {vehicle.costInCredits !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Cost in Credits:</strong> {vehicle.costInCredits}
          </Typography>
        )}
        {vehicle.maxAtmospheringSpeed !== null && (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Max Atmosphering Speed:</strong> {vehicle.maxAtmospheringSpeed}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
});

export default VehicleCard;
