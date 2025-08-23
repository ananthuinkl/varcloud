"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, TablePagination } from "@mui/material";

// --- STYLING CONSTANTS (No changes) ---
const headerCellStyle = {
    backgroundColor: "#2E7D32",
    color: "white",
    fontWeight: "bold",
    textAlign: 'center', // Default alignment for headers
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
        MozAppearance: 'textfield',
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
  if (num === 0) {
    return '';
  }
  return num.toFixed(2);
};

// --- COMPONENT ---

const RatioPage = () => {
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRefs = useRef([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [focusTarget, setFocusTarget] = useState(null);

    // --- DATA FETCHING (No changes) ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/api05-labour');
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                if (data.length > 0) {
                    setRows(data);
                    const dataHeaders = Object.keys(data[0].values);
                    setHeaders(dataHeaders);
                    inputRefs.current = Array(data.length).fill(0).map(() => Array(dataHeaders.length).fill(null));
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
    
    // --- FOCUS EFFECT (No changes) ---
    useEffect(() => {
        if (focusTarget) {
            const { row, col } = focusTarget;
            const input = inputRefs.current[row]?.[col];
            if (input) {
                input.focus();
                input.select();
            }
            setFocusTarget(null);
        }
    }, [focusTarget, currentPage, rowsPerPage]);

    // --- EVENT HANDLERS (No changes) ---

    const handleInputChange = (e, rowNumber, header) => {
        const { value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [rowNumber]: { ...prev[rowNumber], [header]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            const response = await fetch('/api/api05-labour', {
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
    
    const handleKeyDown = (e, rowIndex, colIndex) => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) return;
        e.preventDefault();
        
        let nextRow = rowIndex;
        let nextCol = colIndex;
        const totalRows = rows.length;
        const totalCols = headers.length;
        
        switch (e.key) {
            case 'ArrowUp': nextRow = Math.max(0, rowIndex - 1); break;
            case 'ArrowDown': case 'Enter': nextRow = Math.min(totalRows - 1, rowIndex + 1); break;
            case 'ArrowLeft': nextCol = Math.max(0, colIndex - 1); break;
            case 'ArrowRight': nextCol = Math.min(totalCols - 1, colIndex + 1); break;
            default: break;
        }
        
        const nextRowPage = Math.floor(nextRow / rowsPerPage);
        if (nextRowPage !== currentPage) {
            setCurrentPage(nextRowPage);
        }

        setFocusTarget({ row: nextRow, col: nextCol });
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    // --- RENDER LOGIC ---

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;

    const paginatedRows = rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ margin: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={Object.keys(editedData).length === 0}>
                        Update Sheet
                    </Button>
                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
                        <Table stickyHeader aria-label="ratio table" sx={{ tableLayout: 'fixed' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ ...headerCellStyle, width: '60px' }}>Sl No</TableCell>
                                    <TableCell sx={{ ...headerCellStyle, width: '450px'}}>Item Name</TableCell>
                                    <TableCell sx={{ ...headerCellStyle, width: '60px' }}>Qty</TableCell>
                                    <TableCell sx={{ ...headerCellStyle, width: '60px' }}>Unit</TableCell>
                                    
                                    {headers.map(header => (
                                        // --- CHANGE HERE: Override textAlign to 'right' for dynamic headers ---
                                        <TableCell key={header} sx={{ ...headerCellStyle, textAlign: 'right', paddingRight: '12px' }}>
                                            {header.replace(/_/g, ' ')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((row, pageRowIndex) => {
                                    const actualRowIndex = currentPage * rowsPerPage + pageRowIndex;
                                    const isBoldRow = isNaN(Number(row.serialNo));
                                    const conditionalBoldStyle = isBoldRow ? { fontWeight: 'bold' } : {};

                                    return (
                                        <TableRow key={row.rowNumber} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                                            <TableCell sx={{ ...bodyCellStyle, textAlign: 'center', ...conditionalBoldStyle }}>{row.serialNo}</TableCell>
                                            <TableCell sx={{...bodyCellStyle, textAlign: 'left', ...conditionalBoldStyle}}>{row.itemName}</TableCell>
                                            <TableCell sx={{ ...bodyCellStyle, textAlign: 'center', ...conditionalBoldStyle }}>{row.quantity}</TableCell>
                                            <TableCell sx={{ ...bodyCellStyle, textAlign: 'center', ...conditionalBoldStyle }}>{row.unit}</TableCell>
                                            
                                            {headers.map((header, colIndex) => (
                                                <TableCell key={`${row.rowNumber}-${header}`} sx={editableCellStyle}>
                                                    <input
                                                        ref={el => inputRefs.current[actualRowIndex][colIndex] = el}
                                                        type="number"
                                                        style={conditionalBoldStyle}
                                                        value={
                                                            editedData[row.rowNumber]?.[header] !== undefined
                                                                ? editedData[row.rowNumber][header]
                                                                : formatToOneDecimal(row.values[header])
                                                        }
                                                        onChange={(e) => handleInputChange(e, row.rowNumber, header)}
                                                        onKeyDown={(e) => handleKeyDown(e, actualRowIndex, colIndex)}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[50, 100, 250]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </form>
        </Box>
    );
};

export default RatioPage;