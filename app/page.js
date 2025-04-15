"use client";

import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import FoundationAnimation from './components/FoundationAnimation/FoundationAnimation';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Link href="/dashboard" passHref>
        <Typography
          variant="h5"
          component="span"
          sx={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'primary.main',
            ':hover': {
              color: 'secondary.main',
            },
          }}
        >
          <FoundationAnimation />
        </Typography>
      </Link>
    </Box>
  );
}
