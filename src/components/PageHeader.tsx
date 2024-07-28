import { Box, Typography } from '@mui/material';
import React from 'react';

interface PageHeaderProps {
  header: string;
  totalPage: number;
  currentPage: number;
}
const PageHeader = React.memo<PageHeaderProps>(({ header, totalPage, currentPage }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
      <Typography variant="h5" fontWeight={600}>
        {header}
      </Typography>
      {totalPage > 0 && (
        <Typography color={'#999999'}>
          Page {currentPage}/{totalPage}
        </Typography>
      )}
    </Box>
  );
});

export default PageHeader;
