import React, { useEffect } from 'react';
import { Film } from '@features/swapi/models/film';
import { CardContent, CardHeader, Skeleton, Typography } from '@mui/material';
import StyledCard from 'components/Card';

interface FilmCardProps {
  film: Film;
  peopleNames: string;
  onRequestPeopleNames: (film: Film) => void;
}

const FilmCard = React.memo<FilmCardProps>(({ film, peopleNames, onRequestPeopleNames }) => {
  useEffect(() => onRequestPeopleNames(film), [onRequestPeopleNames, film]);

  return (
    <StyledCard>
      <CardHeader title={film.title} subheader={`Episode ${film.episodeId}`} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {film.openingCrawl}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Director:</strong> {film.director}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Producer:</strong> {film.producer}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Release Date:</strong> {film.releaseDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
          <strong>People:</strong> {peopleNames ? peopleNames : <Skeleton variant="rectangular" width="100%" height={22} sx={{ borderRadius: 4 }} />}
        </Typography>
      </CardContent>
    </StyledCard>
  );
});

export default FilmCard;
