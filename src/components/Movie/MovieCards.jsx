import { Card, CardContent, Typography, Box } from "@mui/material";

const MovieCards = ({ data }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "260px", md: "280px" },
        borderRadius: "12px",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: 180, sm: 220, md: 240 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#000"
        }}
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_IMAGE_UPLOAD_PATH}/${data?.poster_url}`}
          alt={data.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain"
          }}
        />
      </Box>

      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "#aaa" }}
        >
          {data.year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCards;


