import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

const textStyle = {
  fontFamily: 'Montserrat',
  fontWeight: 600,
  fontStyle: 'normal',
  fontSize: '48px',
  lineHeight: '56px',
  letterSpacing: '0',
  textAlign: 'center'
};

const buttonTextStyle = {
  fontFamily: 'Montserrat',
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0',
  textAlign: 'center'
};

const buttonStyle = {
  borderRadius: "10px",
  backgroundColor: "#2BD17E"
};

const EmptyMovieList = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          flex: "0 0 10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          margin : "30px 30px 0px 0px",
          width: "100%",
        }}
      >
        <Logout />
      </Box>

      <Box
        sx={{
          flex: "1 1 80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center"
        }}
      >
        <Typography variant="h2" mb={2} style={textStyle}>
          Your movie list is empty
        </Typography>
        <Link to="/movies/manage" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="contained" style={buttonStyle}>
            <Typography style={buttonTextStyle}>Add a new movie</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default EmptyMovieList;
