import { useMemo } from 'react';
import { connect } from 'react-redux';
import { Vehicle } from '@features/swapi/models/transport';
import { vehicles } from '@features/swapi/swapiSlices';
import { Grid } from '@mui/material';
import { RootState } from '@store/index';
import VehicleCard from 'components/VehicleCard';
import VehicleCardPlaceholder from 'components/VehicleCard/VehicleCardPlaceholder';
import withDeferredLoading from 'hocs/withDeferredLoading';
import withSwapiListPage, { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { createSwapiListMapToStateProps } from '@features/swapi/utils';

const DeferredVehicleCard = withDeferredLoading(VehicleCard, VehicleCardPlaceholder);
const PLACEHOLDER_ITEMS = [0, 1, 2];

function VehiclesList({ pageResults, status }: SwapiListPageProps<Vehicle>) {
  const isPending = useMemo(() => status === 'loading', [status]);
  return pageResults.map((result) => (
    <Grid key={result.id} item xs={12} sm={6} md={4}>
      <DeferredVehicleCard wProps={{ vehicle: result }} disabled={isPending} />
    </Grid>
  ));
}

function Placeholder() {
  return PLACEHOLDER_ITEMS.map((index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <VehicleCardPlaceholder />
    </Grid>
  ));
}

const vehiclesSelector = (state: RootState) => state.swapi.vehicles;
const mapStateToProps = createSwapiListMapToStateProps(vehiclesSelector);
const VehiclesListPage = withSwapiListPage('Vehicles', VehiclesList, Placeholder, vehicles);
const VehiclesConnected = connect(mapStateToProps)(VehiclesListPage);

export default VehiclesConnected;
