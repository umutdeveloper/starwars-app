import { people } from '@features/swapi/swapiSlices';
import { useAppDispatch } from '@hooks/redux';
import { useEffect } from 'react';

function People() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(people.fetchList({ page: 1, search: '' }));
  }, [dispatch]);

  return <div>People</div>;
}

export default People;
