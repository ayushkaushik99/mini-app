import React, { useState, useMemo, useCallback } from 'react';
import Form from './pages/Form';
import TableComponent from './pages/Table';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Box } from '@mui/material';
import { initialErrors, initialFormData, mockData } from './utils/constants';
import { isNonEmptyString, isValidDate, isValidEmail, isValidWholeNumber } from './utils/common';

const App = () => {
  // State hooks
  const [tableData, setTableData] = useState(mockData);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Form submission handler
  const handleFormSubmit = useCallback(
    (formData) => {
      if (selectedRowId !== null) {
        // Edit existing row
        setTableData((prevData) =>
          prevData.map((row) => (row.id === selectedRowId ? { ...row, ...formData } : row))
        );
      } else {
        // Add a new row
        const newRow = { id: Date.now(), ...formData };
        setTableData((prevData) => [...prevData, newRow]);
      }
      // Reset form-related state
      setSelectedRowId(null);
      setIsAccordionOpen(false);
    },
    [selectedRowId]
  );

  // Row deletion handler
  const handleDelete = useCallback(
    (id) => {
      setTableData((prevData) => prevData.filter((row) => row.id !== id));
    },
    []
  );

  // Row editing handler
  const handleEdit = useCallback(
    (id) => {
      if (tableData.length > 0) {
        const selectedRow = tableData.find((row) => row.id === id);
        if (selectedRow) {
          // Set form data to the selected row
          setSelectedRowId(id);
          setFormData(selectedRow);
          setIsAccordionOpen(true);
        }
      }
    },
    [tableData]
  );

  // Row copying handler
  const handleCopy = useCallback(
    (id) => {
      if (tableData.length > 0) {
        const selectedRow = tableData.find((row) => row.id === id);
        if (selectedRow) {
          // Copy the selected row with a new ID
          const newRow = { ...selectedRow, id: Date.now() };
          setTableData((prevData) => [...prevData, newRow]);
        }
      }
    },
    [tableData]
  );

  // Form validation function
  const isFormValid = () => {
    return (
      [
        isNonEmptyString(formData?.name),
        isNonEmptyString(formData?.email),
        isValidEmail(formData?.email),
        isValidWholeNumber(formData?.age),
        isNonEmptyString(formData?.gender),
        isNonEmptyString(formData?.status),
        isNonEmptyString(formData?.date),
        isValidDate(formData?.date),
      ].every(Boolean)
    );
  }

  // Click handler for "Add Data" button
  const handleAddDataClick = () => {
    // Reset form data and toggle the accordion
    setFormData(initialFormData);
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Memoized table data for performance optimization
  const memoizedTableData = useMemo(() => tableData, [tableData]);

  return (
    <Container maxWidth="xxl">
      <Typography padding={"40px 0px"} variant="h3" gutterBottom textAlign={"center"}>
        Mini App
      </Typography>
      <Box width={"100%"} textAlign={"right"} marginBottom={"20px"}>
        {/* Button to add new data */}
        <Button variant="contained" size="large" color="primary" onClick={handleAddDataClick}>
          Add Data
        </Button>
      </Box>
      {/* Accordion for the form */}
      <Accordion expanded={isAccordionOpen}>
        <AccordionSummary style={{ display: "none" }}>
        </AccordionSummary>
        <AccordionDetails>
          {/* Form component */}
          <Form
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            isFormValid={isFormValid}
          />
        </AccordionDetails>
      </Accordion>
      {/* Render table component if there is data */}
      {memoizedTableData.length > 0 && (
        <TableComponent
          data={memoizedTableData}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onCopy={handleCopy}
        />
      )}
    </Container>
  );
};

export default App;
