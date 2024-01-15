import { memo, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Memoizing the component to prevent unnecessary re-renders
const Pagination = memo(({ page, totalPages, onPageChange }) => {
  // Callback to handle page changes
  const handlePageChange = useCallback(
    (newPage) => {
      // Check if the new page is within valid bounds
      if (newPage >= 1 && newPage <= totalPages) {
        // Call the onPageChange function with the new page
        onPageChange(newPage);
      }
    },
    [onPageChange, totalPages]
  );

  return (
    <div>
      {/* First page button */}
      <IconButton onClick={() => handlePageChange(1)} disabled={page === 1}>
        <FirstPageIcon />
      </IconButton>
      {/* Previous page button */}
      <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <NavigateBeforeIcon />
      </IconButton>
      {/* Display current page and total pages */}
      <span>{`Page ${page} of ${totalPages}`}</span>
      {/* Next page button */}
      <IconButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        <NavigateNextIcon />
      </IconButton>
      {/* Last page button */}
      <IconButton onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>
        <LastPageIcon />
      </IconButton>
    </div>
  );
});

export default Pagination;
