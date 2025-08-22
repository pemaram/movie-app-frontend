import { useCallback, useEffect, useState } from "react";
import { Button, Grid, Typography, Box, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from "dayjs";
import useMovieDataUpload from "../../hooks/api-hook/useMovieUploadApi";
import { toast, ToastContainer } from 'react-toastify';
import '@fontsource/montserrat';
import useAuth from "../../hooks/authentication-hook/useAuth";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Logout from "../Logout/Logout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovieForm = () => {
  const { auth } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const [errors, setErrors] = useState({ title: '', date: '' });
  const [formData, setFormData] = useState(null);
  const { loading, error, success, setSuccessValue } = useMovieDataUpload(formData);

  useEffect(() => {
    if (success) {
      setUploadedImage(null);
      setInputValue("");
      setSelectedYear(dayjs());
      setFormData(null);
      setErrors({ title: '', date: '' });
      setSuccessValue(false);
      toast.success("Upload successful!");
    }
  }, [success, setSuccessValue]);

  useEffect(() => {
    if (error) {
      toast.error(`Upload failed: ${error}`);
    }
  }, [error]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const validateFields = () => {
    const tempErrors = { title: '', date: '' };
    let isValid = true;

    if (!inputValue.trim()) {
      tempErrors.title = 'Title is required';
      isValid = false;
    }

    if (!selectedYear || !dayjs(selectedYear).isValid()) {
      tempErrors.date = 'Publishing Year is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleOnCancel = () => {
    setUploadedImage(null);
    setSelectedYear(dayjs());
    setInputValue("");
    setErrors({ title: '', date: '' });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const form_data = new FormData();
    if (uploadedImage) {
      form_data.append("poster_url", uploadedImage);
    }

    const userId = auth?.id || localStorage.getItem("userId")

    form_data.append("title", inputValue);
    form_data.append("year", dayjs(selectedYear).year());
    form_data.append("status", true);
    form_data.append("userId", userId)

    setFormData(form_data);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {loading ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontFamily: 'Montserrat, sans-serif' }}
          >
            Uploading movie...
          </Typography>
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#fff",
            px: 2,
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              padding: "20px",
              width: "100%"
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
              <Link to="/movies" style={{ textDecoration: "none", color: "inherit" }}>
                <IconButton color="inherit">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              Back

            </Typography>

            <Logout />
          </Box>

          <Box sx={{ p: 4, borderRadius: 2, maxWidth: 1000, width: "100%" }}>
            <Box sx={{ py: 3 }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 600,
                  mb: 4,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Create a new movie
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleOnSubmit}
              noValidate
              sx={{ width: "100%" }}
            >
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed rgba(255, 255, 255, 0.5)",
                      borderRadius: "8px",
                      height: 400,
                      width: "100%",
                      minWidth: 380,
                      maxWidth: 380,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                      textAlign: "center",
                      "&:hover": { borderColor: "#00e676" },
                    }}
                  >
                    <input {...getInputProps()} />
                    {uploadedImage ? (
                      <Box
                        component="img"
                        src={URL.createObjectURL(uploadedImage)}
                        alt="Preview"
                        sx={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 1 }}
                      />
                    ) : (
                      <Typography
                        sx={{ fontSize: 14, opacity: 0.8, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {isDragActive ? "Drop the image here..." : "Drop an image here"}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      id="title-input"
                      label="Title"
                      variant="filled"
                      fullWidth
                      autoComplete="off"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        if (errors.title)
                          setErrors((prev) => ({ ...prev, title: "" }));
                      }}
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          backgroundColor: "#0a3a47",
                          color: "#fff",
                          '&:hover': { backgroundColor: "#0a3a47" },
                          '&.Mui-focused': { backgroundColor: "#0a3a47" },
                          fontFamily: 'Montserrat, sans-serif',
                          borderRadius: "11px",
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#fff",
                          '&.Mui-focused': { color: "#fff" },
                          fontFamily: 'Montserrat, sans-serif',
                        },
                      }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={['year']}
                        label="Publishing Year"
                        value={selectedYear}
                        onChange={(value) => setSelectedYear(value)}
                        error={Boolean(errors.date)}
                        helperText={errors.date}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "filled",
                            InputProps: {
                              disableUnderline: true,
                              sx: {
                                color: "white",
                                width: "250px",
                                backgroundColor: "#0a3a47",
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white',
                                },
                                '&.Mui-focused': {
                                  backgroundColor: "#0a3a47",
                                },
                                '&:hover': {
                                  backgroundColor: "#0a3a47",
                                },
                                '& .MuiSvgIcon-root': {
                                  color: 'white',
                                },
                                fontFamily: 'Montserrat, sans-serif',
                                borderRadius: "11px"
                              },
                            },
                            InputLabelProps: {
                              sx: {
                                color: "#fff",
                                '&.Mui-focused': {
                                  color: "#fff",
                                },
                                fontFamily: 'Montserrat, sans-serif'
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={handleOnCancel}
                        sx={{
                          color: "#fff",
                          borderColor: "#fff",
                          fontSize: 12,
                          fontWeight: 600,
                          textTransform: "none",
                          px: 6,
                          py: 1,
                          minWidth: 80,
                          borderRadius: 1,
                          fontFamily: 'Montserrat, sans-serif',
                          "&:hover": { borderColor: "#00e676" },
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          backgroundColor: "#00e676",
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 12,
                          textTransform: "none",
                          px: 6,
                          py: 1,
                          minWidth: 80,
                          borderRadius: 1,
                          fontFamily: 'Montserrat, sans-serif',
                          "&:hover": { backgroundColor: "#00c853" },
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MovieForm;
