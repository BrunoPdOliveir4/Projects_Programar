import { Card, CardContent, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";
import { CustomAlert } from "../../../components/Alert";
import './styles.css';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
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
      const response = await UserService.register({ username, email, password });

      if (response.success) {
        setAlert({
          open: true,
          message: 'Registration successful!',
          severity: 'success'
        });
        setTimeout(() => navigate('/login'), 2000);
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
    <div className="register-container">
      <Card className="register-card">
        <CardContent>
          <form className="register-form">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">
              Fill in your information below to create your account
            </p>

            <TextField
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Create Account
            </Button>

            <p className="login-link">
              Already have an account? <a href="/login" className="login-link-span">Sign in here</a>
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

export default RegisterScreen;
