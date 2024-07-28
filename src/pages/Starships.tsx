import { useMemo } from 'react';
import { connect } from 'react-redux';
import { StarShip } from '@features/swapi/models/transport';
import { starships } from '@features/swapi/swapiSlices';
import { Grid } from '@mui/material';
import { RootState } from '@store/index';
import StarshipCard from 'components/StarshipCard';
import StarshipCardPlaceholder from 'components/StarshipCard/StarshipCardPlaceholder';
import withDeferredLoading from 'hocs/withDeferredLoading';
import withSwapiListPage, { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { createSwapiListMapToStateProps } from '@features/swapi/utils';

const DeferredStarshipCard = withDeferredLoading(StarshipCard, StarshipCardPlaceholder);
const PLACEHOLDER_ITEMS = [0, 1, 2];

function StarshipsList({ pageResults, status }: SwapiListPageProps<StarShip>) {
  const isPending = useMemo(() => status === 'loading', [status]);
  return pageResults.map((result) => (
    <Grid key={result.id} item xs={12} sm={6} md={4}>
      <DeferredStarshipCard wProps={{ starship: result }} disabled={isPending} />
    </Grid>
  ));
}

function Placeholder() {
  return PLACEHOLDER_ITEMS.map((index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <StarshipCardPlaceholder />
    </Grid>
  ));
}

const starshipsSelector = (state: RootState) => state.swapi.starships;
const mapStateToProps = createSwapiListMapToStateProps(starshipsSelector);
const StarshipsListPage = withSwapiListPage('Starships', StarshipsList, Placeholder, starships);
const StarshipsConnected = connect(mapStateToProps)(StarshipsListPage);

export default StarshipsConnected;
