import React,{useEffect, useState} from 'react'
import {Grid,Chip,Paper} from "@mui/material";
import { makeStyles } from '@mui/styles';
import "./TagInput.css";

const useStyles = makeStyles((theme) => ({
  input:{
    border:"none",
    flex:1,
    fontSize:"14px",
    padding:"10px",
    "&:focus": {
			outline: "transparent",
      border:"none",
		}
  },
  tag: {
    width: "auto",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    padding: "0 1px",
    listStyle:"none",
    borderRadius: "6px",
    margin: "0 8px 8px 0",
  }
}));
const TagInput = (props) => {
  const classes = useStyles();
  const [tags, setTags] = useState(props.skills ?? ["MongoDb","NodeJS"]);
  const removeTags = (indexToRemove) => {
		setTags(tags.filter((tag,index) => index !== indexToRemove));
    setSkills(tags)
    handleSkills(tags)
	};
  const handleSkills = tags => {
    if(props.handleSkills)
    props.handleSkills(tags);
  }
  const setSkills = tags => {
    if(props.setSkills)
      props.setSkills(tags)
  }
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			event.target.value = "";
      setSkills(tags)
      handleSkills(tags)
		}
	};
  useEffect(() => {
    if(props.setSkills)
      props.setSkills(tags);
    if(props.handleSkills)
      props.handleSkills(tags);
  },[props,tags])
  return (
    <Grid item xs={12}>
      <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 1,
        m: 0,
      }}
      component="ul"
    >
      {tags.map((tag, index) => (
					<li key={index} className={classes.tag}>
						<Chip label={tag} color="primary"
              onDelete={()=>removeTags(index)}
              sx={{fontWeight:"bold",fontSize:"13px"}}
            />
					</li>
				))}
      <input type="text" className={classes.input}
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add hashtags"
      />
    </Paper>          
    </Grid>
  )
}

export default TagInput