import React,{useState,useEffect, useReducer} from 'react'
import PropTypes from 'prop-types';
import {Box, Grid, ThemeProvider, Typography, Button, StepLabel, Step,Stepper} from "@mui/material"
import theme from "../components/Job/theme";
import CompanyList from '../components/Job/CompanyList';
import { useSelector } from 'react-redux';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import {styled} from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CreateRequest from '../components/Request/CreateRequest';
import { CheckCircle } from '@mui/icons-material';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PostAddIcon />,
    2: <PendingActionsIcon/>,
    3: <AssignmentReturnedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};
const steps = ['Create request','Pending', 'Returned'];

const RequestPage=() => {
  const [openPopup, setOpenPopup] = useState(false);
  const token = localStorage.getItem('accessToken');
  const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
  const auth = useSelector( state => state.auth)
  const {role} = auth 
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const passUpdateList = () => {
    forceUpdate();
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box bgcolor="white" py={2} sx={{ width: "100%" }}>
          <Grid
            container
            display="flex"
            spacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            <Grid item xs={10}>
              <Grid
                container
                justifyContent="center"
                sx={{ marginLeft: "20px" }}
              >
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ marginBottom: 2 }}
                  >
                    <Typography variant="h3">Request University</Typography>
                    <Button 
                    variant='outlined'
                    color='error'                   
                    sx={{fontWeight:"bold"}}
                    onClick={() => setOpenPopup(true)}                   
                    >My Request</Button>
                  </Box>
                  <Box 
                  sx={{ 
                    height: 170, 
                    width: "100%", 
                    paddingTop: "30px",
                    boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
                    borderRadius:'5px' }}>
                    <Stepper
                      alternativeLabel
                      activeStep={activeStep}
                      connector={<ColorlibConnector />}
                    >
                      {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <Typography sx={{fontWeight:"bold"}}>{label}</Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <div>
                      {activeStep === 2 && (
                        <React.Fragment>
                        <Box sx={{
                          mt: 2, 
                          mb: 1, 
                          paddingTop: "10px", 
                          textAlign:"center", 
                          justifyContent:"center", 
                          display:"flex" }}>
                        <CheckCircle fontSize='small' sx={{color:"green"}}/>
                        <Typography >
                            Returned request completed - Check results below
                          </Typography>
                        </Box>
                        
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                            }}
                          >
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                          </Box>
                        </React.Fragment>
                      )}
                    </div>
                  </Box>
                  <CreateRequest handleComplete={handleComplete} activeStep={activeStep} handleBack={handleBack}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  backgroundColor: "primary.light",
                  width: "230px",
                  padding: 1,
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Typography color="#fff" variant="h6">
                  Top Company
                </Typography>
              </Box>
              <Box sx={{ border: "1px solid primary.light" }}>
                <CompanyList />
              </Box>
              <img
                src="/image/bannerRecruitment.png"
                alt="duytan-banner"
                style={{ marginTop: "50px", width: "230px" }}
              />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}


export default RequestPage

