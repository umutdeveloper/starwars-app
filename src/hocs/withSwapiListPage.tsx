import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { APIStatus } from 'models/types';
import { AppDispatch } from '@store/index';
import { SliceDetails } from '@features/swapi/swapiSlices';
import { Base } from '@features/swapi/models/base';
import PageHeader from 'components/PageHeader';
import SearchBox from 'components/SearchBox';
import Pagination from 'components/Pagination';

export interface SwapiListPageProps<T> {
  pageResults: T[];
  hasPrev: boolean | null;
  hasNext: boolean | null;
  count: number;
  pagination: { page: number; search: string; pageSize: number };
  status: APIStatus;
  error: string | null;
  dispatch: AppDispatch;
}

const withSwapiListPage = <W extends { [K in keyof W]: W[K] }, T extends Base>(
  header: string,
  ListComponent: React.ComponentType<SwapiListPageProps<W>>,
  PlaceholderComponent: React.ComponentType<Record<string, never>>,
  sliceDetails: SliceDetails<T>
) => {
  const HOC: React.FC<SwapiListPageProps<W>> = (props) => {
    const { pageResults, hasPrev, hasNext, count, pagination, status, error, dispatch } = props;
    if (error) {
      throw new Error(error); // This will be caught by the ErrorBoundary
    }

    const inputRef = useRef<HTMLInputElement>();
    const handleSearchQueryChange = useCallback((text: string) => dispatch(sliceDetails.search(text)), [dispatch]);
    const isPending = useMemo(() => status === 'loading', [status]);
    const isPendingForNoItems = useMemo(() => !pageResults.length && isPending, [pageResults, isPending]);
    const isNotFound = useMemo(() => !pageResults.length && !isPending && status !== 'idle', [pageResults, isPending, status]);
    const goPreviousPage = useCallback(() => dispatch(sliceDetails.prevPage()), [dispatch]);
    const goNextPage = useCallback(() => dispatch(sliceDetails.nextPage()), [dispatch]);
    const totalPage = useMemo(
      () => (count % pagination.pageSize === 0 ? count / pagination.pageSize : Math.floor(count / pagination.pageSize) + 1),
      [count, pagination.pageSize]
    );

    useEffect(() => {
      return () => {
        dispatch(sliceDetails.reset());
      };
    }, [dispatch]);

    useEffect(() => {
      dispatch(sliceDetails.fetchList(pagination));
      window.scrollTo(0, 0);
    }, [dispatch, pagination]);

    useEffect(() => {
      if (!isPending && pagination.page === 1) {
        inputRef.current?.focus();
      }
    }, [isPending, pagination.page, pagination.search]);

    return (
      <>
        <PageHeader header={`${header} List (${count} ${count > 1 ? 'items' : 'item'})`} totalPage={totalPage} currentPage={pagination.page} />
        <SearchBox inputRef={inputRef} disabled={isPending} onChange={handleSearchQueryChange} />
        <Grid container spacing={2}>
          {isPendingForNoItems && <PlaceholderComponent />}
          {isNotFound && (
            <Box mt={4} mb={4} width="100%">
              <Typography textAlign="center" variant="h6">
                No Items Found
              </Typography>
            </Box>
          )}
          {pageResults.length !== 0 && <ListComponent {...(props as SwapiListPageProps<W>)} />}
        </Grid>
        {totalPage > 1 && (
          <Pagination prevDisabled={!hasPrev || isPending} nextDisabled={!hasNext || isPending} onPrevClick={goPreviousPage} onNextClick={goNextPage} />
        )}
      </>
    );
  };

  return HOC;
};

export default withSwapiListPage;
