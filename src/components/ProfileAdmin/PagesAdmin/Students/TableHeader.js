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
    const {orderDirection, valueToOrderBy, handleSort} = props;

    const inputElement = useRef("");
    // search function
    const searchHandle = () => {
       props.searchHandle(inputElement.current.value)
      }
    const createSortHandle = (property) => (event) => {
      handleSort(event,property);
    }
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column, index) => (
          <TableCell
            key={index}
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
            ) : 
            column.id === "firstName" ? 
            <TableSortLabel
             active = {valueToOrderBy === "firstName"}
             direction= {valueToOrderBy === "firstName" ? orderDirection: "asc"}
             onClick={createSortHandle('firstName')}>
              {column.label}
            </TableSortLabel> 
            : column.label
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
