import { Box, Button } from '@mui/material';
import React from 'react';

interface PaginationProps {
  prevDisabled: boolean;
  nextDisabled: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}
const Pagination = React.memo<PaginationProps>(({ prevDisabled, nextDisabled, onPrevClick, onNextClick }) => {
  return (
    <Box display="flex" justifyContent="space-between" mt={4} mb={4}>
      <Button variant="contained" disabled={prevDisabled} onClick={onPrevClick}>
        Previous
      </Button>
      <Button variant="contained" disabled={nextDisabled} onClick={onNextClick}>
        Next
      </Button>
    </Box>
  );
});

export default Pagination;
