import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

const EmptyMovieList = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        px: { xs: 2, sm: 4 }, 
      }}
    >
      <Box
        sx={{
          flex: "0 0 auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          mt: { xs: 2, sm: 3 },
        }}
      >
        <Logout />
      </Box>

      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          mb={2}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: { xs: "24px", sm: "36px", md: "48px" },
            lineHeight: { xs: "32px", sm: "44px", md: "56px" },
          }}
        >
          Your movie list is empty
        </Typography>

        <Link to="/movies/manage" style={{ textDecoration: "none", color: "inherit" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              backgroundColor: "#2BD17E",
              px: { xs: 2.5, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              mt: 2,
              "&:hover": { backgroundColor: "#25c474" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: { xs: "20px", sm: "24px" },
                textAlign: "center",
              }}
            >
              Add a new movie
            </Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default EmptyMovieList;
