import EmptyComponent from "./EmptyMovieList";
import MovieCards from "./MovieCards";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Typography, IconButton, Grid, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import '@fontsource/montserrat';
import useMovieDataFetch from "../../hooks/api-hook/useMoviePaginatedApi";
import Logout from "../Logout/Logout";

const textStyle = {
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0",
  textAlign: "center",
  fontFamily: 'Montserrat, sans-serif'
};

const Movies = () => {
  const { movies, loading, page, handlePageChange, limit } = useMovieDataFetch();
  const totalPages = Math.ceil(movies?.totalDocs / limit);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : movies?.data?.length > 0 ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              padding: "20px"
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              My movies
              <Link to="/movies/manage" style={{ textDecoration: "none", color: "inherit" }}>
                <IconButton color="inherit">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Link>

            </Typography>

            <Logout />
          </Box>

          <Grid container spacing={3}>
            {movies?.data?.map((data, index) => (
              <Grid item xs={6} sm={6} md={3} lg={2.4} key={index}>
                <MovieCards data={data} key={data._id} />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 3
            }}
          >
            <Button
              variant="text"
              sx={{
                color: "#fff", textTransform: "none",
                "&.Mui-disabled": {
                  color: "gray",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              <Typography sx={textStyle}>Prev</Typography>
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant="contained"
                sx={{
                  backgroundColor: page === i + 1 ? "#00C853" : "#04343C",
                  color: "#fff",
                  minWidth: "40px",
                  fontFamily: 'Montserrat, sans-serif',
                  "&:hover": { backgroundColor: "#00C853" }
                }}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="text"
              sx={{
                color: "#fff", textTransform: "none",
                "&.Mui-disabled": {
                  color: "gray",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              <Typography sx={textStyle}>Next</Typography>
            </Button>
          </Box>
        </Box>
      ) : (
        <EmptyComponent />
      )}
    </>
  );
};

export default Movies;
