import { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useLoginApi from "../../hooks/api-hook/useLoginApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/authentication-hook/useAuth";
import '@fontsource/montserrat';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/movies";

  const { setAuth } = useAuth();

  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [payloadObject, setPayloadObject] = useState(null);

  const { loading, error, success, setSuccessValue, responsePayload } =
    useLoginApi(payloadObject);

  const validateFields = () => {
    const tempErrors = { email: "", password: "" };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userEmail.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(userEmail.trim())) {
      tempErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!userPwd.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (userPwd.trim().length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const payload = { email: userEmail.trim().toLowerCase(), password: userPwd.trim() };
    setPayloadObject(payload);
  };

  useEffect(() => {
    if (success) {
      setUserEmail("");
      setUserPwd("");
      setPayloadObject(null);
      setSuccessValue(false);
      toast.success("Login successful!");
      setAuth(responsePayload?.data);
      navigate(from, { replace: true });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h4"
              mb={4}
              align="center"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: { xs: "1.8rem", sm: "2rem" },
              }}
            >
              Sign in
            </Typography>

            <form onSubmit={handleOnSubmit}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                autoComplete="off"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={Boolean(errors.email)}
                helperText={errors.email}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    backgroundColor: "#0a3a47",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#0a3a47" },
                    "&.Mui-focused": { backgroundColor: "#0a3a47" },
                    borderRadius: 2,
                    fontFamily: 'Montserrat, sans-serif',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": { color: "#fff" },
                    fontFamily: "Montserrat, sans-serif",
                  },
                }}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Password"
                variant="filled"
                fullWidth
                type="password"
                autoComplete="off"
                value={userPwd}
                onChange={(e) => {
                  setUserPwd(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    backgroundColor: "#0a3a47",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#0a3a47" },
                    "&.Mui-focused": { backgroundColor: "#0a3a47" },
                    borderRadius: 2,
                    fontFamily: 'Montserrat, sans-serif',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": { color: "#fff" },
                    fontFamily: "Montserrat, sans-serif",
                  },
                }}
                sx={{ mb: 4 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: loading ? "#999" : "#20DF7F",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: { xs: 15, sm: 16 },
                  textTransform: "none",
                  py: 1.5,
                  borderRadius: 2,
                  fontFamily: 'Montserrat, sans-serif',
                  "&:hover": {
                    backgroundColor: loading ? "#999" : "#1cbc6a",
                  },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
