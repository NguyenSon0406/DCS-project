import React,{useState,useRef} from 'react'
import {Box, Button, MenuItem,Menu, FilledInput} from "@mui/material";
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
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
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
  const getTypeSort = (type) => {
    props.handleTypeSort(type);
    console.log(type);
    handleClose();
  }
  return (
    <Box p={2} className={classes.wrapper}>
        <FilledInput 
        placeholder='Input keyword to search' 
        inputRef={inputElement}
        disableUnderline
        value={props.term}
        sx={{width:"65%"}}
        onChange= {getSearchTerm}
        > <i className="search icon"/></FilledInput>
        <Button variant='contained'
        startIcon={<SearchIcon/>} 
        sx={{fontWeight:"bold",width:"15%"}} >Search</Button>
        <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        sx={{fontWeight:"bold", width:"20%"}}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Sort By
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
        <MenuItem onClick={()=>getTypeSort(1)} disableRipple>    
          A - Z
        </MenuItem>
        <MenuItem onClick={()=>getTypeSort(2)} disableRipple>
          Highlight point
        </MenuItem>
        <MenuItem onClick={()=>getTypeSort(3)} disableRipple>
          Grade
        </MenuItem>
        <MenuItem onClick={()=>getTypeSort(4)} disableRipple>
          Skills
        </MenuItem>
        <MenuItem onClick={()=>getTypeSort(5)} disableRipple>
          International School
        </MenuItem>
        <MenuItem onClick={()=>getTypeSort(6)} disableRipple>
          School of Computer Science
        </MenuItem>
      </StyledMenu>
    </Box>
  )
}



export default SearchBar

