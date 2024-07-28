import { debounce, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import Clear from '@mui/icons-material/Clear';
import './SearchBox.css';

const DEBOUNCE_TIME_MS = 300;

interface SearchBoxProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  inputRef?: React.MutableRefObject<HTMLInputElement | undefined>;
}
const SearchBox = React.memo<SearchBoxProps>(({ onChange, disabled, inputRef }) => {
  const [value, setValue] = useState('');
  const debouncedOnChange = useMemo(() => debounce((value: string) => onChange(value), DEBOUNCE_TIME_MS), [onChange]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(value);
      debouncedOnChange(value);
    },
    [debouncedOnChange]
  );

  const clearField = useCallback(() => {
    if (value) {
      handleChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [value, handleChange]);

  return (
    <TextField
      inputRef={inputRef}
      className="SearchBox"
      label="Search"
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      {...(disabled !== undefined && { disabled })}
      InputProps={{
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={clearField}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SearchBox;
