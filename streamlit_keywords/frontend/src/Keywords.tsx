import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib";

interface PythonArgs {
  label: string;
  text: string;
  initialValue: string[];
  maxKeywords?: number;
}

const Keywords = (props: ComponentProps) => {
  const { label, text, initialValue, maxKeywords }: PythonArgs =
    props.args;
  const { theme } = props;

  const [value, setValue] = useState<string[]>(initialValue || []);
  const [inputValue, setInputValue] = useState<string>("");

  // Initialize placeholderText state
  const [placeholderText, setPlaceholderText] = useState<string>(text);

  const handleChange = (_event: any, newValue: string[]) => {
    // Enforce maxKeywords limit if provided
    if (maxKeywords && maxKeywords > 0 && newValue.length > maxKeywords) {
      newValue = newValue.slice(0, maxKeywords);
    }
    setValue(newValue);
    Streamlit.setComponentValue(newValue);
  };

  const handleInputChange = (_event: any, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const handleDelete = (tagToDelete: string) => () => {
    const newValue = value.filter((tag) => tag !== tagToDelete);
    setValue(newValue);
    Streamlit.setComponentValue(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const trimmedInput = inputValue.trim();
      if (!value.includes(trimmedInput)) {
        if (maxKeywords && value.length >= maxKeywords) {
          return;
        }
        const newValue = [...value, trimmedInput];
        setValue(newValue);
        Streamlit.setComponentValue(newValue);
        setInputValue("");
      } else {
        setInputValue("");
      }
    }
  };

  // Update placeholderText based on the number of tags
  useEffect(() => {
    if (maxKeywords && value.length >= maxKeywords) {
      setPlaceholderText("Maximum number of keywords reached");
    } else {
      setPlaceholderText(text);
    }
  }, [value, maxKeywords, text]);

  useEffect(() => {
    Streamlit.setFrameHeight();
    Streamlit.setComponentValue(value);
  });

  return (
    <div style={{ padding: "6px 0" }}>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={value}
        inputValue={inputValue}
        clearIcon={
          <ClearIcon
            sx={{
              backgroundColor: `${theme?.textColor}90`, // Added 20% opacity textColor background
              borderRadius: '50%',
              padding: '3px',
              fontSize: '18px',
              color: theme?.secondaryBackgroundColor, // X color matches secondary background
              '&:hover': {
                backgroundColor: theme?.textColor,
                color: theme?.secondaryBackgroundColor, // Maintain X color on hover
              }
            }}
          />
        }
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              onDelete={handleDelete(option)}
              sx={{
                backgroundColor: theme?.primaryColor,
                borderColor: 'transparent', // Remove border
                borderRadius: '8px', // Increase border radius for more rounded appearance
                "& .MuiChip-label": {
                  color: theme?.backgroundColor,
                },
                "& .MuiChip-deleteIcon": {
                  color: `${theme?.backgroundColor}90`,
                  backgroundColor: 'transparent',
                  "&:hover": {
                    color: theme?.backgroundColor,
                  },
                },
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholderText}  // Use dynamic placeholderText
            type="search"
            slotProps={{
              htmlInput: params.inputProps,
            }}
            sx={{
              backgroundColor: theme?.secondaryBackgroundColor,
              borderRadius: 3,
              "& input[type='search']::-webkit-search-cancel-button": {
                display: "none",
              },
              "& input[type='search']::-webkit-search-decoration": {
                display: "none",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                "& fieldset": {
                  borderColor: theme?.backgroundColor,
                },
                "&:hover fieldset": {
                  borderColor: theme?.backgroundColor,
                },
                "&.Mui-focused fieldset": {
                  border: 1,
                  borderColor: theme?.primaryColor,
                },
                "& input": {
                  color: theme?.textColor,
                },
                "& input::placeholder": {
                  color: `${theme?.textColor}99`, // Lower opacity text color
                },
              },
              "& .MuiOutlinedInput-input": {
                color: theme?.textColor,
              },
              "& .MuiInputLabel-root": {
                color: theme?.textColor,
                "&.Mui-focused": {
                  color: theme?.primaryColor,
                },
              },
              "& .MuiInput-input": {
                color: theme?.textColor,
                "&::placeholder": {
                  color: `${theme?.textColor}99`,
                  // opacity: disabled ? 0.5 : 1,
                },

                "&.Mui-disabled": {
                  cursor: "not-allowed",
                },
              },
              "& .MuiFormLabel-root": {
                color: theme?.textColor,
                "&.Mui-focused": {
                  color: theme?.primaryColor,
                },
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default withStreamlitConnection(Keywords);