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
import Logout from "../Logout/Logout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useDevicePreference from "../../hooks/device-responsive-hook/useMediaQuery";

const MovieForm = () => {
  const { auth } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const [errors, setErrors] = useState({ title: '', date: '' });
  const [formData, setFormData] = useState(null);
  const { loading, error, success, setSuccessValue } = useMovieDataUpload(formData);
  const isMobile = useDevicePreference()

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
    if (!validateFields()) return;

    const form_data = new FormData();
    if (uploadedImage) form_data.append("poster_url", uploadedImage);
    const userId = auth?.id || localStorage.getItem("userId");
    form_data.append("title", inputValue);
    form_data.append("year", dayjs(selectedYear).year());
    form_data.append("status", true);
    form_data.append("userId", userId);
    setFormData(form_data);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {loading ? (
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontFamily: 'Montserrat, sans-serif' }}>
            Uploading movie...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", px: 2 , gap : 10}}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, width: "100%" }}>
            <Link to="/movies" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ fontSize: { xs: 18, sm: 24 }, fontWeight: 500, display: "flex", alignItems: "center", gap: 1, fontFamily: 'Montserrat, sans-serif' }}>
              <IconButton color="inherit"><ArrowBackIcon /></IconButton>
              Back
            </Typography>
             </Link>
            <Logout />
          </Box>

          <Box sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, maxWidth: 1000, width: "100%" }}>
            <Typography sx={{ fontSize: { xs: 22, sm: 32 }, fontWeight: 600, mb: 4, fontFamily: 'Montserrat, sans-serif', textAlign: { xs: "center", md: "left" } }}>
              Create a new movie
            </Typography>

            <Box component="form" onSubmit={handleOnSubmit} noValidate sx={{ width: "100%" }}>
              <Grid
                container
                spacing={3}
                sx={{
                  justifyContent: isMobile ? "center" : "flex-start",
                  alignItems: isMobile ? "center" : "flex-start",
                }}
              >
                <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed rgba(255, 255, 255, 0.5)",
                      borderRadius: 2,
                      height: { xs: 250, sm: 350, md: 400 },
                      width: { xs: 350, sm: 380, md: 380 },
                      maxWidth: "100%",
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
                      <Box component="img" src={URL.createObjectURL(uploadedImage)} alt="Preview" sx={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 1 }} />
                    ) : (
                      <Typography sx={{ fontSize: { xs: 12, sm: 14 }, opacity: 0.8, fontFamily: 'Montserrat' }}>
                        {isDragActive ? "Drop the image here..." : "Drop an image here"}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Inputs & Buttons */}
                <Grid item xs={12} md={6} sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" }
                }}>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: { xs: "100%", sm: "80%", md: "100%" },
                    alignItems: { xs: "center", md: "flex-start" }
                  }}>
                    <TextField
                      label="Title"
                      variant="filled"
                      fullWidth
                      value={inputValue}
                      onChange={(e) => { setInputValue(e.target.value); if (errors.title) setErrors(prev => ({ ...prev, title: "" })); }}
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                      InputProps={{
                        disableUnderline: true,
                        sx: { backgroundColor: "#0a3a47", color: "#fff", '&:hover': { backgroundColor: "#0a3a47" }, '&.Mui-focused': { backgroundColor: "#0a3a47" }, fontFamily: 'Montserrat', borderRadius: 2 }
                      }}
                      InputLabelProps={{ sx: { color: "#fff", '&.Mui-focused': { color: "#fff" }, fontFamily: 'Montserrat' } }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={['year']}
                        label="Publishing Year"
                        value={selectedYear}
                        onChange={(value) => setSelectedYear(value)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "filled",
                            InputProps: {
                              disableUnderline: true,
                              sx: {
                                backgroundColor: "#0a3a47",
                                color: "white",
                                borderRadius: 2,
                                fontFamily: 'Montserrat',
                              },
                            },
                            InputLabelProps: { sx: { color: "#fff", fontFamily: 'Montserrat' } },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
                      <Button variant="outlined" type="button" onClick={handleOnCancel} sx={{ color: "#fff", borderColor: "#fff", fontSize: { xs: 10, sm: 12 }, fontWeight: 600, textTransform: "none", px: 3, py: 1, borderRadius: 1 }}>Cancel</Button>
                      <Button variant="contained" type="submit" sx={{ backgroundColor: "#00e676", color: "#fff", fontWeight: 600, fontSize: { xs: 10, sm: 12 }, textTransform: "none", px: 3, py: 1, borderRadius: 1 }}>Submit</Button>
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
