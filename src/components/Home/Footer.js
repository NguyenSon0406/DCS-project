import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <footer style={{width:"100%",}}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#ebebeb"
        color="black"
        width="100%"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} underline="hover">About Us</Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Contact Us
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} underline="hover">Terms & Conditions</Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                Privacy Policy
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                Terms & Conditions
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Roll
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          Copyright Đại Học Duy Tân &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}