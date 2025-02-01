"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path based on where your firebase.js file is located
import { Button, Typography } from "@mui/material";

export default function ProtectedPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Welcome, {user ? user.email : "User"}!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ marginTop: 2 }}
      >
        Logout
      </Button>
    </div>
  );
}
