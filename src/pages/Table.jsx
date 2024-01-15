import React, { useState, useMemo, useCallback } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { toCamelCase } from '../utils/common';
import Pagination from '../components/Pagination';
import { Box, TextField } from '@mui/material';

// Component for sortable column header
const SortableColumnHeader = ({ title, sortConfig, onClick }) => {
  // Convert title to camelCase for sorting
  const columnName = useMemo(() => toCamelCase(title), [title]);

  return (
    <TableCell>
      <Button onClick={() => onClick(columnName)}>
        {title}
        {sortConfig.key === columnName && (
          <>
            {sortConfig.direction === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </>
        )}
      </Button>
    </TableCell>
  );
};

// TableComponent
const TableComponent = ({ data, onDelete, onEdit, onCopy }) => {
  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'descending' });
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Set the number of items to display per page
  const itemsPerPage = 5;

  // Handle sorting
  const handleSort = useCallback((key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  // Sort data based on sort configuration
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortConfig.key) {
        const keyA = a[sortConfig.key];
        const keyB = b[sortConfig.key];

        if (sortConfig.direction === 'ascending') {
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
        } else {
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
        }
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  // Handle page change in pagination
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Calculate start and end indices for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get paginated data
  const paginatedData = useMemo(() => filteredData.slice(startIndex, endIndex), [
    filteredData,
    startIndex,
    endIndex,
  ]);

  // Calculate summary for numeric fields
  const calculateSummary = useCallback(() => {
    const numericFields = ['age']; // Add other numeric fields if needed
    const summary = {};

    numericFields.forEach((field) => {
      summary[field] = paginatedData.reduce((total, row) => total + Number(row[field]), 0);
    });

    return summary;
  }, [paginatedData]);

  // Memoize summary calculation
  const summary = useMemo(calculateSummary, [calculateSummary]);

  return (
    <div>
      {/* Search input */}
      <Box>
        <TextField
          fullWidth
          type="text"
          placeholder="Type here to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {/* Table container */}
      <TableContainer component={Paper}>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <SortableColumnHeader title="Name" sortConfig={sortConfig} onClick={handleSort} />
              <SortableColumnHeader title="Email" sortConfig={sortConfig} onClick={handleSort} />
              <SortableColumnHeader title="Age" sortConfig={sortConfig} onClick={handleSort} />
              <SortableColumnHeader title="Gender" sortConfig={sortConfig} onClick={handleSort} />
              <SortableColumnHeader title="Date" sortConfig={sortConfig} onClick={handleSort} />
              <TableCell>Status</TableCell>
              <TableCell align='center'>Checked</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {/* Render rows */}
            {paginatedData.length > 0 ? paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align='center'>{row.isChecked ? 'Yes' : 'No'}</TableCell>
                {/* Actions buttons */}
                <TableCell align='center'>
                  <Button color="secondary" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                  <Button color="primary" onClick={() => onEdit(row.id)}>
                    <EditIcon />
                  </Button>
                  <Button color="primary" onClick={() => onCopy(row.id)}>
                    <FileCopyIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )) :
              <TableRow>
                <TableCell align='center' colSpan={8}><strong>No Data Found!</strong></TableCell>
              </TableRow>}
            {/* Summary Row */}
            {paginatedData.length > 0 && <TableRow>
              <TableCell colSpan={2}><strong>Summary</strong></TableCell>
              <TableCell><strong>{summary.age}</strong></TableCell>
              <TableCell colSpan={5}></TableCell>
            </TableRow>}
            {/* Pagination */}
            {paginatedData.length > 0 && <TableRow>
              <TableCell colSpan={8} align={"right"}>
                <Pagination
                  page={currentPage}
                  totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
