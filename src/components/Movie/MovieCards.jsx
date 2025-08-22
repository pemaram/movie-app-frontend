import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import '@fontsource/montserrat';

const titleStyle = {
  fontWeight: 500,
  fontStyle: 'normal',
  fontSize: '20px',
  lineHeight: '32px',
  letterSpacing: '0',
  color: "#ffffff",
  fontFamily: 'Montserrat, sans-serif'
}

const yearStyle = {
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '14px',
  lineHeight: '24px',
  letterSpacing: '0',
  color: "#ffffff",
  fontFamily: 'Montserrat, sans-serif'
}

const MovieCards = (props) => {
  const { data } = props;

  return (
    <Card
      sx={{
        backgroundColor: "#092C39",
        color: "#000",
        borderRadius: 2,
        overflow: "hidden",
        p: 1,
        width: "300px",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={`${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_IMAGE_UPLOAD_PATH}/${data?.poster_url}`}
        alt={data?.title}
        sx={{
          borderRadius: "14px",
          width: "100%",
          objectFit: "contain",
          backgroundColor: "#fff",
        }}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight="bold" style={titleStyle}>
          {data?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={yearStyle}>
          {data?.year}
        </Typography>
      </CardContent>
    </Card>

  );
};

export default MovieCards;
