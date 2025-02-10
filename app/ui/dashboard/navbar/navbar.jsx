"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase"; // Make sure the import path is correct

export const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // **[New]** State for tracking authentication
  const [electricalAnchorEl, setElectricalAnchorEl] = useState(null);
  const [constructionAnchorEl, setConstructionAnchorEl] = useState(null);
  const [itAnchorEl, setItAnchorEl] = useState(null);
  const [businessAnchorEl, setBusinessAnchorEl] = useState(null);
  const [estimationAnchorEl, setEstimationAnchorEl] = useState(null);

  useEffect(() => {
    // Firebase Auth listener to track user state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // **[New]** Update the user state
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // **[New]** Firebase logout
      router.push("/login"); // **[New]** Redirect to login after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleClose = () => {
    setElectricalAnchorEl(null);
    setConstructionAnchorEl(null);
    setItAnchorEl(null);
    setBusinessAnchorEl(null);
    setEstimationAnchorEl(null);
  };

  const navigateTo = (path) => {
    handleClose();
    router.push(path);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <img src="/logo.png" alt="logo" width={50} height={20} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">VAR Cloud</Link>
        </Typography>
        <Stack direction="row" spacing={2}>
          {/* Add Menu buttons */}
          <Button
            color="inherit"
            id="resources-button-electrical"
            aria-controls={electricalAnchorEl ? "electrical-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(electricalAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => setElectricalAnchorEl(e.currentTarget)} // Directly setting anchor
          >
            ELECTRICAL
          </Button>

          <Button
            color="inherit"
            id="resources-button-construction"
            aria-controls={constructionAnchorEl ? "construction-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(constructionAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => setConstructionAnchorEl(e.currentTarget)} // Directly setting anchor
          >
            CONSTRUCTION
          </Button>

          <Button
            color="inherit"
            id="resources-button-it"
            aria-controls={itAnchorEl ? "it-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(itAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => setItAnchorEl(e.currentTarget)} // Directly setting anchor
          >
            IT
          </Button>

          <Button
            color="inherit"
            id="resources-button-business"
            aria-controls={businessAnchorEl ? "business-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(businessAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => setBusinessAnchorEl(e.currentTarget)} // Directly setting anchor
          >
            BUSINESS
          </Button>

          <Button
            color="inherit"
            id="resources-button-film"
            aria-controls={estimationAnchorEl ? "estimation-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(estimationAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => setEstimationAnchorEl(e.currentTarget)} // Directly setting anchor
          >
            Estimation
          </Button>

          {/* Conditionally render Login/Logout Button */}
          {user ? ( // **[New]** Conditional rendering for Login/Logout
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Stack>

        {/* Menu items for Electrical */}
        <Menu
          id="electrical-menu"
          anchorEl={electricalAnchorEl}
          open={Boolean(electricalAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigateTo("/dashboard/mep_item_price")}>
            Price List
          </MenuItem>
          <MenuItem onClick={() => navigateTo("/dashboard/elec_unitrate_calc")}>Calc</MenuItem>
          <MenuItem onClick={() => navigateTo("/dashboard/volt_drop_calc")}>Voltage Drop</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu items for Construction */}
        <Menu
          id="construction-menu"
          anchorEl={constructionAnchorEl}
          open={Boolean(constructionAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigateTo("/dashboard/mep_item_price")}>
            Price List
          </MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu items for IT */}
        <Menu
          id="it-menu"
          anchorEl={itAnchorEl}
          open={Boolean(itAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu items for Business */}
        <Menu
          id="business-menu"
          anchorEl={businessAnchorEl}
          open={Boolean(businessAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu items for Estimation */}
        <Menu
          id="estimation-menu"
          anchorEl={estimationAnchorEl}
          open={Boolean(estimationAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigateTo("/dashboard/estimation")}>MEP Est</MenuItem>
          <MenuItem onClick={() => navigateTo("/dashboard/protected")}>Calc</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
