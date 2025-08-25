"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, TablePagination } from "@mui/material";

// --- STYLING CONSTANTS ---

const headerCellStyle = {
    backgroundColor: "#2E7D32",
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
    padding: '8px 4px',
    lineHeight: '1.3',
    transition: 'background-color 0.2s ease-in-out',
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

        // For Firefox
        MozAppearance: 'textfield',
        // For Chrome, Safari, Edge, Opera
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
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

    const [activeCell, setActiveCell] = useState(null);
    const inputRefs = useRef([]);

    // ---vvv PAGINATION STATE vvv---
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    // ---^^^ PAGINATION STATE ^^^---

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
                    // Initialize the refs array based on the TOTAL data dimensions
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

    // --- EVENT HANDLERS ---

    // ---vvv PAGINATION HANDLERS vvv---
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };
    // ---^^^ PAGINATION HANDLERS ^^^---

    const handleInputChange = (e, rowNumber, header) => {
        const { value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [rowNumber]: { ...prev[rowNumber], [header]: value },
        }));
    };

    const handleBlur = () => {
        // setActiveCell(null);
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
            const response = await fetch('/api/api03-ratio', {
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

    const handleKeyDown = (e, rowIndex, colIndex, paginatedRowsCount) => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
            return;
        }

        e.preventDefault();

        let nextRow = rowIndex;
        let nextCol = colIndex;
        const totalCols = headers.length;

        switch (e.key) {
            case 'ArrowUp':
                nextRow = Math.max(0, rowIndex - 1);
                break;
            case 'ArrowDown':
            case 'Enter':
                nextRow = Math.min(paginatedRowsCount - 1, rowIndex + 1);
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
        
        // Calculate the absolute index for the refs array
        const absoluteNextRow = (page * rowsPerPage) + nextRow;
        
        const nextInput = inputRefs.current[absoluteNextRow]?.[nextCol];
        if (nextInput) {
            nextInput.focus();
            nextInput.select();
        }
    };

    // --- RENDER LOGIC ---

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;

    // Slice the rows for the current page
    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ margin: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={Object.keys(editedData).length === 0}>
                        Update Sheet
                    </Button>
                </Box>
                {/* ---vvv WRAPPER FOR TABLE AND PAGINATION vvv--- */}
                <Paper>
                    <TableContainer sx={{ maxHeight: '80vh' }}>
                        <Table stickyHeader aria-label="ratio table" sx={{ tableLayout: 'fixed' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ ...headerCellStyle, width: '80px' }}>Ref</TableCell>
                                    <TableCell sx={{ ...headerCellStyle, width: '200px', textAlign: 'left' }}>Item Name</TableCell>
                                    {headers.map((header, colIndex) => {
                                        const dynamicHeaderStyle = { ...headerCellStyle, textAlign: 'right', paddingRight: '12px' };
                                        const activeColumnStyle = { backgroundColor: '#4CAF50' };
                                        const finalStyle = activeCell && activeCell.col === colIndex
                                            ? { ...dynamicHeaderStyle, ...activeColumnStyle }
                                            : dynamicHeaderStyle;
                                        return (
                                            <TableCell key={header} sx={finalStyle}>
                                                {header.replace(/_/g, ' ')}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((row, rowIndex) => {
                                    // Calculate the absolute index for the entire dataset
                                    const absoluteRowIndex = page * rowsPerPage + rowIndex;
                                    return (
                                        <TableRow key={row.rowNumber} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                                            <TableCell sx={{ ...bodyCellStyle, textAlign: 'center' }}>{row.serialCode}</TableCell>
                                            <TableCell sx={{...bodyCellStyle, textAlign: 'left'}}>{row.itemName}</TableCell>
                                            {headers.map((header, colIndex) => (
                                                <TableCell key={`${row.rowNumber}-${header}`} sx={editableCellStyle}>
                                                    <input
                                                        ref={el => inputRefs.current[absoluteRowIndex][colIndex] = el}
                                                        type="number"
                                                        value={
                                                            editedData[row.rowNumber]?.[header] !== undefined
                                                                ? editedData[row.rowNumber][header]
                                                                : formatToOneDecimal(row.values[header])
                                                        }
                                                        onChange={(e) => handleInputChange(e, row.rowNumber, header)}
                                                        onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
                                                        onBlur={handleBlur}
                                                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex, paginatedRows.length)}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* ---vvv PAGINATION COMPONENT vvv--- */}
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* ---^^^ PAGINATION COMPONENT ^^^--- */}
                </Paper>
            </form>
        </Box>
    );
};

export default RatioPage;