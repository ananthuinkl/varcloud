"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();

  // State variables for each menu
  const [electricalAnchorEl, setElectricalAnchorEl] = useState(null);
  const [constructionAnchorEl, setConstructionAnchorEl] = useState(null);
  const [itAnchorEl, setItAnchorEl] = useState(null);
  const [businessAnchorEl, setBusinessAnchorEl] = useState(null);
  const [filmAnchorEl, setFilmAnchorEl] = useState(null);

  // Click handlers for each button
  const handleElectricalClick = (event) => {
    setElectricalAnchorEl(event.currentTarget);
  };

  const handleConstructionClick = (event) => {
    setConstructionAnchorEl(event.currentTarget);
  };

  const handleItClick = (event) => {
    setItAnchorEl(event.currentTarget);
  };

  const handleBusinessClick = (event) => {
    setBusinessAnchorEl(event.currentTarget);
  };

  const handleFilmClick = (event) => {
    setFilmAnchorEl(event.currentTarget);
  };

  // Close handler for all menus
  const handleClose = () => {
    setElectricalAnchorEl(null);
    setConstructionAnchorEl(null);
    setItAnchorEl(null);
    setBusinessAnchorEl(null);
    setFilmAnchorEl(null);
  };

  // Navigation handlers
  const navigateTo = (path) => {
    handleClose();
    router.push(path);
  };

  return (
    <AppBar position='static' color='primary'>
      <Toolbar variant="dense">
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <img src="/logo.png" alt="logo" width={50} height={20}/>
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link href="/">
          VAR Cloud
          </Link>
        </Typography>
        <Stack direction='row' spacing={2}>
          {/* Button for Electrical */}
          <Button
            color='inherit'
            id='resources-button-electrical'
            aria-controls={electricalAnchorEl ? 'electrical-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={Boolean(electricalAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleElectricalClick}>
            ELECTRICAL
          </Button>

          {/* Button for Construction */}
          <Button
            color='inherit'
            id='resources-button-construction'
            aria-controls={constructionAnchorEl ? 'construction-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={Boolean(constructionAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleConstructionClick}>
            CONSTRUCTION
          </Button>

          {/* Button for IT */}
          <Button
            color='inherit'
            id='resources-button-it'
            aria-controls={itAnchorEl ? 'it-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={Boolean(itAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleItClick}>
            IT
          </Button>

          {/* Button for Business */}
          <Button
            color='inherit'
            id='resources-button-business'
            aria-controls={businessAnchorEl ? 'business-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={Boolean(businessAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleBusinessClick}>
            BUSINESS
          </Button>

          {/* Button for Film Making */}
          <Button
            color='inherit'
            id='resources-button-film'
            aria-controls={filmAnchorEl ? 'film-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={Boolean(filmAnchorEl)}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleFilmClick}>
            FILM MAKING
          </Button>

          {/* Login Button */}
          <Button color='inherit'>Login</Button>
        </Stack>

        {/* Menu for Electrical */}
        <Menu
          id='electrical-menu'
          anchorEl={electricalAnchorEl}
          open={Boolean(electricalAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'resources-button-electrical',
          }}>
          <MenuItem onClick={() => navigateTo('/dashboard/mep_item_price')}>Price List</MenuItem>
          <MenuItem onClick={() => navigateTo('/dashboard/elec_unitrate_calc')}>Calc</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu for Construction */}
        <Menu
          id='construction-menu'
          anchorEl={constructionAnchorEl}
          open={Boolean(constructionAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'resources-button-construction',
          }}>
          <MenuItem onClick={() => navigateTo('/dashboard/mep_item_price')}>Price List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu for IT */}
        <Menu
          id='it-menu'
          anchorEl={itAnchorEl}
          open={Boolean(itAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'resources-button-it',
          }}>
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu for Business */}
        <Menu
          id='business-menu'
          anchorEl={businessAnchorEl}
          open={Boolean(businessAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'resources-button-business',
          }}>
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>

        {/* Menu for Film Making */}
        <Menu
          id='film-menu'
          anchorEl={filmAnchorEl}
          open={Boolean(filmAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'resources-button-film',
          }}>
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
          <MenuItem onClick={handleClose}>List</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
