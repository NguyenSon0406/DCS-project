import React from 'react'
import { styled } from '@mui/material/styles';
import { Box, Grid,Typography } from '@mui/material'
import { BorderColor,StarBorder,Work } from '@mui/icons-material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
const CompanyCard = (props) => {
  return (
    <Box p={1} sx={{border:"1px solid #e8e8e8"}}>
        <Grid display="flex" alignItems="center">
           <Grid item xs={4} display="flex">
           <img alt='avatar company'
              src={props.image}
              style={{
                margin:"5px",
                width: "50px",
                height: "50px",
                borderRadius:"100px"
            }}/>
           </Grid>
           <Grid item direction="column" xs={8}>
                <Grid item display="flex">
                <Typography variant='subtitle1' sx={{fontWeight:"bold"}}>{props.companyName}</Typography>
                </Grid>
                <Grid item display="flex" sx={{marginTop:"5px"}}>
                  <LightTooltip title="Exp">
                      <StarBorder  fontSize="small" color="disabled"/>
                  </LightTooltip>
                  <Typography variant='body1' color="#B5B5B5">10</Typography>

                  <LightTooltip title="Posts">
                    <BorderColor sx={{marginLeft:"15px"}} fontSize="small" color="disabled"/>
                  </LightTooltip>
                  <Typography variant='body1' color="#B5B5B5">0</Typography>
                  <LightTooltip title="Job Posts">
                    <Work sx={{marginLeft:"15px"}} fontSize="small" color="disabled"/>
                  </LightTooltip>
                  <Typography variant='body1' color="#B5B5B5">1</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default CompanyCard;
