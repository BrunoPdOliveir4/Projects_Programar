import { Card, CardContent, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";
import { CustomAlert } from "../../../components";
import './styles.css';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleClickSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await UserService.login({ username, password });

      if (response.success) {
        localStorage.setItem("token", response.data.access_token);
        setAlert({
          open: true,
          message: 'Login successful!',
          severity: 'success'
        });

        setTimeout(() => navigate('/'), 2000);
      } else {
        setAlert({
          open: true,
          message: response.error.message,
          severity: 'error'
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        message: 'An unexpected error occurred',
        severity: 'error'
      });
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardContent>
          <form className="login-form">
            <h1 className="login-title">Welcome back!</h1>
            <div className="login-subtitle">
              <p>Glad to see you again</p>
              <p>Login to your account bellow</p>
            </div>
            <TextField
              required
              fullWidth
              type="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide password' : 'show password'}
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" size="large" fullWidth onClick={handleClickSubmit}>
              Login
            </Button>
            <p className="register-link">
              Don't have an account? <a href="/register" className="register-link-span">Register here</a>
            </p>
          </form>
        </CardContent>
      </Card>

      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleCloseAlert}
      />
    </div>
  );
};

export default LoginScreen;
