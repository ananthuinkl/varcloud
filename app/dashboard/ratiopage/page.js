"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from "@mui/material";

// --- STYLING CONSTANTS (No changes) ---

const headerCellStyle = {
    backgroundColor: "#2E7D32",
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
    padding: '8px 4px',
    lineHeight: '1.3',
};

const bodyCellStyle = {
    height: '30px', 
    verticalAlign: 'middle',
    fontSize: '0.875rem', 
    padding: '0 10px',
};

const editableCellStyle = {
    padding: 0, 
    height: '30px', 
    verticalAlign: 'middle',
    fontSize: '0.875rem',

    '& input': {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        textAlign: 'right', 
        paddingRight: '8px',  
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
    '&:hover input': { backgroundColor: '#f5f5f5' },
    '& input:focus': {
        backgroundColor: '#e3f2fd',
        boxShadow: 'inset 0 0 0 2px #1976d2',
    },
};

// --- HELPER FUNCTION FOR FORMATTING (No changes) ---
const formatToOneDecimal = (value) => {
  const num = Number(value);
  if (isNaN(num)) {
    return value;
  }
  return num.toFixed(1);
};


// --- COMPONENT ---

const RatioPage = () => {
    // --- STATE & REFS ---
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // CHANGE: activeCell now just tracks state, it doesn't drive focus changes
    const [activeCell, setActiveCell] = useState(null);
    const inputRefs = useRef([]);

    // --- DATA FETCHING (No changes except for ref initialization) ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/api03-ratio');
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                if (data.length > 0) {
                    setRows(data);
                    const dataHeaders = Object.keys(data[0].values);
                    setHeaders(dataHeaders);
                    // Initialize the refs array based on data dimensions
                    inputRefs.current = Array(data.length).fill(0).map(() => Array(dataHeaders.length).fill(0));
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // REMOVED: The useEffect for focusing is no longer needed as we do it directly.

    // --- EVENT HANDLERS ---

    const handleInputChange = (e, rowNumber, header) => {
        const { value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [rowNumber]: { ...prev[rowNumber], [header]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ... (Submit logic remains unchanged)
        if (Object.keys(editedData).length === 0) {
            alert("No changes to update.");
            return;
        }
        const payload = Object.keys(editedData).map(rowNum => {
            const originalRow = rows.find(r => r.rowNumber === parseInt(rowNum));
            return {
                rowNumber: parseInt(rowNum),
                values: { ...originalRow.values, ...editedData[rowNum] },
            };
        });
        try {
            const response = await fetch('/api/ratio-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.status === "success") {
                alert(result.message);
                setEditedData({});
                window.location.reload(); 
            } else {
                throw new Error(result.message || 'An unknown error occurred.');
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert('Error: ' + error.message);
        }
    };
    
    // CHANGE: This function now directly manipulates the DOM for instant focus change.
    const handleKeyDown = (e, rowIndex, colIndex) => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
            return;
        }

        e.preventDefault(); // Prevent default browser actions like scrolling

        let nextRow = rowIndex;
        let nextCol = colIndex;
        const totalRows = rows.length;
        const totalCols = headers.length;

        switch (e.key) {
            case 'ArrowUp':
                nextRow = Math.max(0, rowIndex - 1);
                break;
            case 'ArrowDown':
            case 'Enter':
                nextRow = Math.min(totalRows - 1, rowIndex + 1);
                break;
            case 'ArrowLeft':
                nextCol = Math.max(0, colIndex - 1);
                break;
            case 'ArrowRight':
                nextCol = Math.min(totalCols - 1, colIndex + 1);
                break;
            default:
                break;
        }

        // Directly access and focus the next input element from our refs
        const nextInput = inputRefs.current[nextRow]?.[nextCol];
        if (nextInput) {
            nextInput.focus();
            nextInput.select(); // Also select the content for easy editing
        }
    };


    // --- RENDER LOGIC ---

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;

    return (
        <Box sx={{ margin: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={Object.keys(editedData).length === 0}>
                        Update Sheet
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{ maxHeight: '120vh' }}>
                    <Table stickyHeader aria-label="ratio table" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ ...headerCellStyle, width: '80px' }}>Serial Code</TableCell>
                                <TableCell sx={{ ...headerCellStyle, width: '200px', textAlign: 'left' }}>Item Name</TableCell>
                                {headers.map(header => (
                                    <TableCell key={header} sx={headerCellStyle}>
                                        {
                                            header.replace(/_/g, ' ').split(' ').map((word, index) => (
                                                <React.Fragment key={index}>
                                                    {index > 0 && <br />}
                                                    {word}
                                                </React.Fragment>
                                            ))
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={row.rowNumber} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                                    <TableCell sx={{ ...bodyCellStyle, textAlign: 'center' }}>{row.serialCode}</TableCell>
                                    <TableCell sx={{...bodyCellStyle, textAlign: 'left'}}>{row.itemName}</TableCell>
                                    {headers.map((header, colIndex) => (
                                        <TableCell key={`${row.rowNumber}-${header}`} sx={editableCellStyle}>
                                            <input
                                                ref={el => inputRefs.current[rowIndex][colIndex] = el}
                                                type="number"
                                                value={
                                                    editedData[row.rowNumber]?.[header] !== undefined
                                                        ? editedData[row.rowNumber][header]
                                                        : formatToOneDecimal(row.values[header])
                                                }
                                                onChange={(e) => handleInputChange(e, row.rowNumber, header)}
                                                // CHANGE: onFocus now just syncs the state. The real work is in onKeyDown.
                                                onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
                                                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Box>
    );
};

export default RatioPage;