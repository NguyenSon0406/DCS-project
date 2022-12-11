import React,{ useState,useRef} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  TableRow,
  TableHead,
  TableSortLabel,
  TextField,
  TableCell,
} from "@mui/material";

export default function TableHeader(props) {
    
    const inputElement = useRef("");
    // search function
    const searchHandle = () => {
       props.searchHandle(inputElement.current.value)
      }
    
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell
            key={column.id}
            align="center"
            style={{
              minWidth: column.minWidth,
              background: "#D8D8D8",
              fontSize: "15px",
            }}
          >
            {column.id === "action" ? (
              <>
                <TextField
                  variant="filled"
                  size="small"
                  sx={{ width: "100%", overflow: "hidden" }}
                  label="Search"
                  value={props.searchTerm}
                  inputRef={inputElement}
                  onChange={searchHandle}
                  autoFocus={true}
                  InputProps={{
                    endAdornment: <SearchIcon />,
                  }}
                />
              </>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
