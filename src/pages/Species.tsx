import { useMemo } from 'react';
import { connect } from 'react-redux';
import { Species } from '@features/swapi/models/species';
import { species } from '@features/swapi/swapiSlices';
import { Grid } from '@mui/material';
import { RootState } from '@store/index';
import SpeciesCard from 'components/SpeciesCard';
import SpeciesCardPlaceholder from 'components/SpeciesCard/SpeciesCardPlaceholder';
import withDeferredLoading from 'hocs/withDeferredLoading';
import withSwapiListPage, { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { createSwapiListMapToStateProps } from '@features/swapi/utils';

const DeferredSpeciesCard = withDeferredLoading(SpeciesCard, SpeciesCardPlaceholder);
const PLACEHOLDER_ITEMS = [0, 1, 2];

function SpeciesList({ pageResults, status }: SwapiListPageProps<Species>) {
  const isPending = useMemo(() => status === 'loading', [status]);
  return pageResults.map((result) => (
    <Grid key={result.id} item xs={12} sm={6} md={4}>
      <DeferredSpeciesCard wProps={{ species: result }} disabled={isPending} />
    </Grid>
  ));
}

function Placeholder() {
  return PLACEHOLDER_ITEMS.map((index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <SpeciesCardPlaceholder />
    </Grid>
  ));
}

const speciesSelector = (state: RootState) => state.swapi.species;
const mapStateToProps = createSwapiListMapToStateProps(speciesSelector);
const SpeciesListPage = withSwapiListPage('Species', SpeciesList, Placeholder, species);
const SpeciesConnected = connect(mapStateToProps)(SpeciesListPage);

export default SpeciesConnected;
