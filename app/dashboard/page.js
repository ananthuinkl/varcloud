"use client";
// Make sure to place this at the very top of the file
'use client';

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Paper,
    ThemeProvider,
    createTheme,
    CssBaseline,
    List, // Keep List components if used elsewhere, remove if not needed at all
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider, // Keep Divider if used elsewhere, remove if not needed at all
    Skeleton // Import Skeleton for loading states
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Removed - Not used
import CloudIcon from '@mui/icons-material/Cloud';     // Used for Mock Weather
import PublicIcon from '@mui/icons-material/Public';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Used for Calendar
// import NewspaperIcon from '@mui/icons-material/Newspaper';       // Removed - Not used
// import CodeIcon from '@mui/icons-material/Code';               // Removed - Not used

// MUI X Date Pickers (Install @mui/x-date-pickers and dayjs)
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

// --- Configuration & Data (No External APIs for Data) ---

// Hardcoded Quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
];

// Hardcoded Image URLs (Using Picsum for variety)
const imageUrls = [
    'https://picsum.photos/seed/picsum1/600/400',
    'https://picsum.photos/seed/picsum2/600/400',
    'https://picsum.photos/seed/picsum3/600/400',
    'https://picsum.photos/seed/picsum4/600/400',
    'https://picsum.photos/seed/picsum5/600/400',
    'https://picsum.photos/seed/picsum6/600/400',
];

// Mock Weather Data (Real weather needs external APIs)
const mockWeatherData = {
    temp: '23°C',
    description: 'Partly Cloudy',
    icon: <CloudIcon fontSize="large" color="action" />, // Using CloudIcon here
    location: 'Your Location (Approximation)' // Clarify it's not live geo-location
};

// --- Helper Functions ---

const getRandomItem = (arr) => {
    if (!arr || arr.length === 0) return null; // Safety check
    return arr[Math.floor(Math.random() * arr.length)];
}

const getGreeting = () => {
    // Make sure this runs without error on server and client
    try {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    } catch (e) {
        // Fallback if Date() fails in some environment (unlikely in JS)
        return "Hello";
    }
};

const formatTimezoneOffset = (offsetMinutes) => {
    const offsetHours = Math.abs(offsetMinutes / 60);
    const sign = offsetMinutes <= 0 ? '+' : '-'; // getTimezoneOffset is negative for UTC+
    const hours = Math.floor(offsetHours);
    const minutes = Math.round((offsetHours - hours) * 60);
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

// --- MUI Theme (Colorful Example) ---
const colorfulTheme = createTheme({
    palette: {
        mode: 'light', // Or 'dark'
        primary: {
            main: '#1976d2', // Blue
        },
        secondary: {
            main: '#f50057', // Pink
        },
        info: {
            main: '#0288d1', // Light Blue
        },
        success: {
            main: '#388e3c', // Green
        },
        warning: {
            main: '#f57c00', // Orange
        },
        background: {
            default: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Light gradient
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
            color: '#1976d2', // Primary color for main heading
        },
        h6: {
            fontWeight: 500,
            // Colors applied via sx prop per section
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)', // Softer shadow
                    overflow: 'hidden', // Good practice
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 30px 0 rgba(0,0,0,0.15)',
                    },
                     overflow: 'hidden',
                }
            }
        },
         MuiPickersLayout: { // Styles for the Date Picker layout
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
        // Removed MuiPickersToolbar override as it was commented out/potentially unused
         MuiListItem: { // Keep if using Lists anywhere, otherwise remove
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                },
            },
        },
    }
});


// --- Dashboard Component ---

const Dashboard = () => {
    // State to track client-side mounting for hydration safety
    const [isClient, setIsClient] = useState(false);

    // Initialize dynamic state to null or safe placeholders
    const [currentTime, setCurrentTime] = useState(null);
    const [currentQuote, setCurrentQuote] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [greeting, setGreeting] = useState(''); // Initial empty string is safe
    const [timezoneOffset, setTimezoneOffset] = useState(''); // Initial empty string is safe
    const [selectedDate, setSelectedDate] = useState(null); // Initial null is safe

    // Effect to run only on the client side after initial render/hydration
    useEffect(() => {
        // Indicate that we are now on the client
        setIsClient(true);

        // Set initial client-side values
        const now = new Date();
        const initialOffsetMinutes = now.getTimezoneOffset(); // Get offset only once initially

        setCurrentTime(now);
        setGreeting(getGreeting()); // Calculate greeting based on client time
        setTimezoneOffset(formatTimezoneOffset(initialOffsetMinutes)); // Calculate timezone offset
        setCurrentQuote(getRandomItem(quotes)); // Select initial random quote
        setCurrentImage(getRandomItem(imageUrls)); // Select initial random image
        setSelectedDate(dayjs(now)); // Set initial calendar date using dayjs

        // --- Set up intervals ---
        const timerId = setInterval(() => {
            setCurrentTime(new Date()); // Update time state directly
        }, 1000); // Update time every second

        const greetingTimerId = setInterval(() => {
             setGreeting(currentGreeting => { // Use functional update
                 const newGreeting = getGreeting();
                 return currentGreeting !== newGreeting ? newGreeting : currentGreeting;
             });
        }, 60000); // Check greeting every minute

        const contentTimerId = setInterval(() => {
            setCurrentQuote(getRandomItem(quotes));
            setCurrentImage(getRandomItem(imageUrls));
        }, 15000); // Change quote/image every 15 seconds

        // Cleanup function to clear intervals when the component unmounts
        return () => {
            clearInterval(timerId);
            clearInterval(greetingTimerId);
            clearInterval(contentTimerId);
        };
        // Empty dependency array ensures this effect runs only once on mount
    }, []);

    return (
        <ThemeProvider theme={colorfulTheme}>
            <CssBaseline />
            {/* LocalizationProvider is needed for MUI X Date Pickers */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {/* Top Greeting - Uses Skeleton during hydration */}
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.1)', minHeight: '48px' /* Prevent layout shift */ }}
                    >
                        {isClient ? greeting : <Skeleton width="250px" sx={{ margin: '0 auto', bgcolor: 'grey.300' }} />}
                    </Typography>

                    <Grid container spacing={4}>
                        {/* ===== WIDGET 1: Time and Zone Card ===== */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Paper elevation={3} sx={{ p: 3, height: '100%', background: 'linear-gradient(to right, #e3f2fd, #bbdefb)' }}>
                                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: colorfulTheme.palette.primary.dark }}>
                                    <AccessTimeIcon sx={{ mr: 1 }} /> Current Time & Zone
                                </Typography>
                                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', my: 2, color: '#1565c0', minHeight: '64px' /* Prevent layout shift */ }}>
                                    {isClient && currentTime ? currentTime.toLocaleTimeString() : <Skeleton variant="text" width="70%" height={60} sx={{ bgcolor: 'grey.300' }} />}
                                </Typography>
                                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: colorfulTheme.palette.text.secondary, minHeight: '24px' /* Prevent layout shift */ }}>
                                    {isClient ? (
                                        <><PublicIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> Zone: {timezoneOffset}</>
                                     ) : (
                                        <Skeleton variant="text" width="80%" sx={{ bgcolor: 'grey.300' }} />
                                     )}
                                </Typography>
                                 <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', color: colorfulTheme.palette.text.secondary }}>
                                    Based on your device's clock.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* ===== WIDGET 2: Mock Weather Card (Static) ===== */}
                        <Grid item xs={12} md={6} lg={4}>
                             <Paper elevation={3} sx={{ p: 3, height: '100%', background: 'linear-gradient(to right, #fff3e0, #ffe0b2)' }}>
                                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: colorfulTheme.palette.warning.dark }}>
                                    {mockWeatherData.icon} Weather Outlook (Mock)
                                </Typography>
                                 <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1.5, color: '#e65100' }}>
                                   {mockWeatherData.temp} - {mockWeatherData.description}
                                </Typography>
                                <Typography variant="body1" sx={{ color: colorfulTheme.palette.text.secondary }}>
                                    {mockWeatherData.location}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', color: colorfulTheme.palette.text.secondary }}>
                                    Note: Mock data only.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* ===== WIDGET 3: Calendar Card ===== */}
                         <Grid item xs={12} md={6} lg={4}>
                             <Paper elevation={3} sx={{ height: '100%', background: 'linear-gradient(to right, #f3e5f5, #e1bee7)', p: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#6a1b9a', pl: 1, pt: 1}}>
                                    <CalendarMonthIcon sx={{ mr: 1 }}/> Calendar
                                </Typography>
                                {isClient && selectedDate ? (
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)} // Allow user interaction
                                        readOnly={false} // Ensure it's not read-only
                                        sx={{
                                            maxHeight: '350px',
                                            overflow: 'hidden',
                                            '.MuiPickersLayout-contentWrapper': { backgroundColor: 'transparent' },
                                            '& .MuiPickersDay-root': { borderRadius: '4px' },
                                            '& .MuiPickersDay-today': {
                                                borderColor: colorfulTheme.palette.secondary.main,
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                backgroundColor: 'rgba(245, 0, 87, 0.1)'
                                            },
                                            '& .Mui-selected': {
                                                backgroundColor: `${colorfulTheme.palette.primary.main} !important`,
                                                color: '#fff !important',
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                 color: colorfulTheme.palette.text.primary,
                                                 borderBottom: '1px solid rgba(0,0,0,0.1)',
                                                 paddingBottom: '8px',
                                                 marginBottom: '8px',
                                            },
                                        }}
                                    />
                                ) : ( // Show skeleton while loading
                                    <Skeleton variant="rectangular" height={350} sx={{ m: 1, borderRadius: '8px', bgcolor: 'grey.300' }} />
                                )}
                            </Paper>
                        </Grid>

                        {/* ===== WIDGET 4: Random Quote Card ===== */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ background: '#e8f5e9', height: '100%' }}>
                                <CardContent sx={{ minHeight: '150px' /* Prevent layout shift */ }}>
                                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: colorfulTheme.palette.success.dark }}>
                                        <FormatQuoteIcon sx={{ mr: 1 }}/> Quote of the Moment
                                    </Typography>
                                    {isClient && currentQuote ? (
                                        <>
                                            <Typography variant="body1" sx={{ fontStyle: 'italic', my: 2, color: colorfulTheme.palette.text.primary }}>
                                                "{currentQuote.text}"
                                            </Typography>
                                            <Typography variant="body2" align="right" sx={{ color: colorfulTheme.palette.text.secondary }}>
                                                - {currentQuote.author}
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Skeleton variant="text" sx={{ my: 2, bgcolor: 'grey.300' }} />
                                            <Skeleton variant="text" sx={{ bgcolor: 'grey.300' }} />
                                            <Skeleton variant="text" width="60%" sx={{ ml: 'auto', bgcolor: 'grey.300' }}/>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* ===== WIDGET 5: Random Image Card ===== */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                {isClient && currentImage ? (
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={currentImage}
                                        alt="Random Scene"
                                        sx={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" height={250} sx={{ bgcolor: 'grey.300' }} />
                                )}
                                <CardContent sx={{ background: '#fffde7' }}> {/* Light Yellow Background */}
                                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#fbc02d' /* Yellow/Amber */ }}>
                                        <ImageSearchIcon sx={{ mr: 1 }}/> Visual Inspiration
                                    </Typography>
                                     <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', color: colorfulTheme.palette.text.secondary }}>
                                        Randomly selected image.
                                     </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider> {/* Close LocalizationProvider */}
        </ThemeProvider>
    );
};

export default Dashboard;