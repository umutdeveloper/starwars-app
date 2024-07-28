import { render, screen } from '@testing-library/react';
import FilmCard from './index';
import { Film } from '@features/swapi/models/film';
import { vi } from 'vitest';
import withMarkup from 'utils/withMarkup';

const mockFilm: Film = {
  id: 1,
  title: 'A New Hope',
  episodeId: 4,
  openingCrawl: 'It is a period of civil war...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  releaseDate: '1977-05-25',
  characters: [],
  planets: [],
  starships: [],
  species: [],
  vehicles: [],
  created: '',
  edited: '',
};

describe('FilmCard Component', () => {
  it('renders correctly with film data', () => {
    render(<FilmCard film={mockFilm} peopleNames="Luke Skywalker, Leia Organa" onRequestPeopleNames={() => {}} />);

    const getByTextWithMarkup = withMarkup(screen.getByText);
    expect(screen.getByText(mockFilm.title)).toBeInTheDocument();
    expect(screen.getByText(`Episode ${mockFilm.episodeId}`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.openingCrawl)).toBeInTheDocument();
    expect(getByTextWithMarkup(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(getByTextWithMarkup(`Producer: ${mockFilm.producer}`)).toBeInTheDocument();
    expect(getByTextWithMarkup(`Release Date: ${mockFilm.releaseDate}`)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker, Leia Organa')).toBeInTheDocument();
  });

  it('renders skeleton when peopleNames is not provided', () => {
    render(<FilmCard film={mockFilm} peopleNames="" onRequestPeopleNames={() => {}} />);

    expect(screen.getByText('People:')).toBeInTheDocument();
    expect(screen.getByTestId('people-skeleton')).toBeInTheDocument();
  });

  it('calls onRequestPeopleNames on mount', () => {
    const onRequestPeopleNames = vi.fn();
    render(<FilmCard film={mockFilm} peopleNames="" onRequestPeopleNames={onRequestPeopleNames} />);

    expect(onRequestPeopleNames).toHaveBeenCalledWith(mockFilm);
  });
});
