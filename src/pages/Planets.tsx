import { useMemo } from 'react';
import { connect } from 'react-redux';
import { Planet } from '@features/swapi/models/planet';
import { planets } from '@features/swapi/swapiSlices';
import { Grid } from '@mui/material';
import { RootState } from '@store/index';
import PlanetCard from 'components/PlanetCard';
import PlanetCardPlaceholder from 'components/PlanetCard/PlanetCardPlaceholder';
import withDeferredLoading from 'hocs/withDeferredLoading';
import withSwapiListPage, { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { createSwapiListMapToStateProps } from '@features/swapi/utils';

const DeferredPlanetCard = withDeferredLoading(PlanetCard, PlanetCardPlaceholder);
const PLACEHOLDER_ITEMS = [0, 1, 2];

function PlanetsList({ pageResults, status }: SwapiListPageProps<Planet>) {
  const isPending = useMemo(() => status === 'loading', [status]);
  return pageResults.map((result) => (
    <Grid key={result.id} item xs={12} sm={6} md={4}>
      <DeferredPlanetCard wProps={{ planet: result }} disabled={isPending} />
    </Grid>
  ));
}

function Placeholder() {
  return PLACEHOLDER_ITEMS.map((index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <PlanetCardPlaceholder />
    </Grid>
  ));
}

const planetsSelector = (state: RootState) => state.swapi.planets;
const mapStateToProps = createSwapiListMapToStateProps(planetsSelector);
const PlanetsListPage = withSwapiListPage('Planets', PlanetsList, Placeholder, planets);
const PlanetsConnected = connect(mapStateToProps)(PlanetsListPage);

export default PlanetsConnected;
