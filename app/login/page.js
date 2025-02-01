"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Link,
} from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to the dashboard page
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: 3,
              marginBottom: 2,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Login
          </Button>
        </form>
        
        {/* Add a link to redirect to the dashboard if already logged in */}
        <Link
          href="/dashboard"
          variant="body2"
          sx={{ marginTop: 1, textDecoration: "none", color: "#1976d2" }}
        >
          Go to Dashboard
        </Link>
      </Box>
    </Container>
  );
}
