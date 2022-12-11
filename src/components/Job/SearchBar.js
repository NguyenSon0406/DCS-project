import React,{useState,useRef} from 'react'
import {Box, Button, Select, MenuItem,Menu, FilledInput,InputAdornment} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles({
    wrapper:{
        backgroundColor:"#fff",
        display:"flex",
        boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
        borderRadius:'5px',
        alignItems:"center",
        "& > *" :{
            
            height:"45px",
            margin:"8px",
        },
    },
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const SearchBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const inputElement = useRef("");

  const getSearchTerm = () => {
    props.searchKeyWord(inputElement.current.value);
}
  return (
    <Box p={2} className={classes.wrapper}>
        <FilledInput 
        placeholder='Input keyword to search' 
        inputRef={inputElement}
        disableUnderline
        margin='dense'
        value={props.term}
        sx={{width:"75%", 
        textAlign:"center", 
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"}}
        onChange= {getSearchTerm}
        autoFocus
        endAdornment= {<InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>}
        />
        <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        sx={{fontWeight:"bold", width:"25%"}}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Request University
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          
          Request Potential Student List
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          
          Set a Schedule
        </MenuItem>
       
        <MenuItem onClick={handleClose} disableRipple>
          
          Contacts
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          More
        </MenuItem>
      </StyledMenu>
    </Box>
  )
}



export default SearchBar

