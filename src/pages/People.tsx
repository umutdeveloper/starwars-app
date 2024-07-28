import { useMemo } from 'react';
import { connect } from 'react-redux';
import { Person } from '@features/swapi/models/person';
import { people } from '@features/swapi/swapiSlices';
import { Grid } from '@mui/material';
import { RootState } from '@store/index';
import PersonCard from 'components/PersonCard';
import PersonCardPlaceholder from 'components/PersonCard/PersonCardPlaceholder';
import withDeferredLoading from 'hocs/withDeferredLoading';
import withSwapiListPage, { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { createSwapiListMapToStateProps } from '@features/swapi/utils';

const DeferredPeopleCard = withDeferredLoading(PersonCard, PersonCardPlaceholder);
const PLACEHOLDER_ITEMS = [0, 1, 2];

function PeopleList({ pageResults, status }: SwapiListPageProps<Person>) {
  const isPending = useMemo(() => status === 'loading', [status]);
  return pageResults.map((result) => (
    <Grid key={result.id} item xs={12} sm={6} md={4}>
      <DeferredPeopleCard wProps={{ person: result }} disabled={isPending} />
    </Grid>
  ));
}

function Placeholder() {
  return PLACEHOLDER_ITEMS.map((index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <PersonCardPlaceholder />
    </Grid>
  ));
}

const peopleSelector = (state: RootState) => state.swapi.people;
const mapStateToProps = createSwapiListMapToStateProps(peopleSelector);
const PeopleListPage = withSwapiListPage('People', PeopleList, Placeholder, people);
const PeopleConnected = connect(mapStateToProps)(PeopleListPage);

export default PeopleConnected;
