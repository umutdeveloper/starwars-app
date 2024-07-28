import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { Film } from '@features/swapi/models/film';
import { films, people as peopleSlice } from '@features/swapi/swapiSlices';
import { Grid } from '@mui/material';
import { AppDispatch, RootState } from '@store/index';
import FilmCard from 'components/FilmCard';
import FilmCardPlaceholder from 'components/FilmCard/FilmCardPlaceholder';
import withDeferredLoading from 'hocs/withDeferredLoading';
import withSwapiListPage, { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { createSwapiListMapToStateProps } from '@features/swapi/utils';
import { useAppSelector } from '@hooks/redux';
import { createSelector } from '@reduxjs/toolkit';

const DeferredFilmCard = withDeferredLoading(FilmCard, FilmCardPlaceholder);
const PLACEHOLDER_ITEMS = [0, 1, 2];
const selectPeopleResults = (state: RootState) => state.swapi.people.results;
const selectPeopleNamesForFilm = (film: Film) =>
  createSelector([selectPeopleResults], (results) => {
    const filteredList = film.characters.filter((char) => !!results[char]);
    return filteredList.length === film.characters.length ? filteredList.map((char) => results[char].name).join(', ') : '';
  });

interface FilmItemProps {
  film: Film;
  isPending: boolean;
  dispatch: AppDispatch;
}
const FilmItem = React.memo(({ film, isPending, dispatch }: FilmItemProps) => {
  const peopleNames = useAppSelector(selectPeopleNamesForFilm(film));
  const requestPeopleNames = useCallback(() => {
    film.characters.forEach((char) => {
      dispatch(peopleSlice.requestItem(char));
    });
  }, [dispatch, film]);

  return <DeferredFilmCard wProps={{ film, peopleNames, onRequestPeopleNames: requestPeopleNames }} disabled={isPending} />;
});

function FilmsList({ pageResults, status, dispatch }: SwapiListPageProps<Film>) {
  const isPending = useMemo(() => status === 'loading', [status]);

  return pageResults.map((result) => (
    <Grid key={result.id} item xs={12} sm={6} md={4} mb={4}>
      <FilmItem film={result} dispatch={dispatch} isPending={isPending} />
    </Grid>
  ));
}

function Placeholder() {
  return PLACEHOLDER_ITEMS.map((index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <FilmCardPlaceholder />
    </Grid>
  ));
}

const filmsSelector = (state: RootState) => state.swapi.films;
const mapStateToProps = createSwapiListMapToStateProps(filmsSelector);
const FilmsListPage = withSwapiListPage('Films', FilmsList, Placeholder, films);
const FilmsConnected = connect(mapStateToProps)(FilmsListPage);

export default FilmsConnected;
