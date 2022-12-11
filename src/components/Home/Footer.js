import Container from '@mui/material/Container';
import { Link,Box,Grid } from '@mui/material';

export default function Footer() {
  return (
    <footer style={{width:"100%"}}>
      <Box
        px={{ xs: 5, sm: 4 }}
        py={{ xs: 5, sm: 4 }}
        bgcolor="#e0e0e0"
        color="black"
        width="100%"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={2} color="black">Help</Box>
              <Box pt={{xs : 1}}>
                <Link href="/" color="black" underline="hover">
                  Contact
                </Link>
              </Box>
              <Box pt={{xs : 0.5}}>
                <Link href="/" color="black" underline="hover">
                  Support
                </Link>
              </Box>
              <Box pt={{xs : 0.5}}>
                <Link href="/" color="black" underline="hover">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={2} underline="black" color="black">About Us</Box>
              <Box pt={{xs : 1}}>
                <Link href="/" color="black" underline="hover">
                  Home
                </Link>
              </Box>
              <Box pt={{xs : 0.5}}>
                <Link href="/" color="black" underline="hover">
                  Contact Us
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={2} underline="black" color="black">Terms & Conditions</Box>
              <Box pt={{xs : 1}}>
                <Link href="/" color="black" underline="hover">
                Privacy Policy
                </Link>
              </Box>
              <Box pt={{xs : 0.5}}>
                <Link href="/" color="black" underline="hover">
                Terms & Conditions
                </Link>
              </Box>
              <Box pt={{xs : 0.5}}>
                <Link href="/" color="black" underline="hover">
                  Roll
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box borderBottom={1} width="100%" color="#d50000" sx={{marginTop:"20px"}}/>
          <Box textAlign="center" pt={{ xs: 2, sm: 5 }} pb={{ xs: 5, sm: 0 }} color="black">
          Copyright DTU Connections &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}