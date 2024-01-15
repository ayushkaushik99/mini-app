import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, FormControlLabel, Radio, RadioGroup, Grid } from '@mui/material';
import { initialErrors, initialFormData } from '../utils/constants';
import { isNonEmptyString, isValidDate, isValidEmail, isValidWholeNumber } from '../utils/common';

const Form = React.memo(({ onSubmit, formData, setFormData, errors, setErrors, isFormValid }) => {
  // Input change handler
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === 'checkbox' ? checked : value;
      setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    },
    [setFormData]
  );

  // Input blur handler for validation
  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      let error = '';

      if (!value.trim()) {
        error = `${name} is required`;
      } else {
        switch (name) {
          case 'email':
            if (!isValidEmail(value)) {
              error = 'Please enter a valid email';
            }
            break;
          case 'age':
            if (!isValidWholeNumber(value)) {
              error = 'Please enter a valid whole number for age';
            }
            break;
          case 'date':
            if (!isValidDate(value)) {
              error = 'Please enter a valid date';
            }
            break;
          case 'name':
          case 'gender':
          case 'status':
            if (!isNonEmptyString(value)) {
              error = `Please enter a non-empty ${name}`;
            }
            break;
          // Add more cases for other fields if needed
          default:
            break;
        }
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    },
    [setErrors]
  );

  // Form submission handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // Check if all errors are empty (form is valid)
      const isFormValid = Object.values(errors).every((error) => !error);
      if (isFormValid) {
        // Submit form data and reset state
        onSubmit(formData);
        setFormData(initialFormData);
        setErrors(initialErrors);
      }
    },
    [onSubmit, formData, setFormData, setErrors, errors]
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* Grid layout for form inputs */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {/* Name input */}
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            helperText={errors.name}
            error={Boolean(errors.name)}
          />
        </Grid>
        <Grid item xs={3}>
          {/* Email input */}
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            helperText={errors.email}
            error={Boolean(errors.email)}
          />
        </Grid>
        <Grid item xs={2}>
          {/* Age input */}
          <TextField
            label="Age"
            variant="outlined"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            helperText={errors.age}
            error={Boolean(errors.age)}
          />
        </Grid>
        <Grid item xs={2}>
          {/* Gender select input */}
          <TextField
            label="Gender"
            variant="outlined"
            name="gender"
            select
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          {/* Date input */}
          <TextField
            variant="outlined"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            helperText={errors.date}
            error={Boolean(errors.date)}
          />
        </Grid>
        <Grid item xs={2}>
          {/* Radio input */}
          <RadioGroup
            name="status"
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <FormControlLabel value="active" control={<Radio />} label="Active" />
            <FormControlLabel value="inactive" control={<Radio />} label="In Active" />
          </RadioGroup>
        </Grid>
        <Grid mt={"20px"} item xs={2}>
          {/* Checkbox input */}
          <FormControlLabel
            control={
              <Checkbox
                id="checkbox"
                name="isChecked"
                checked={formData.isChecked}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            }
            label="Check me"
          />
        </Grid>
        <Grid width={"100%"} textAlign={"end"}>
          {/* Submit button */}
          <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});

export default Form;
