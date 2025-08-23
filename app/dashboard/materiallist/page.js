"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, TablePagination } from "@mui/material";

// Your style objects remain the same
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
        textAlign: 'center',
        padding: '0 8px',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
    '& input[type="number"]': {
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
    },
    '& input[type="date"]': {
        minWidth: '130px',
    },
    '&:hover input': { backgroundColor: '#f5f5f5' },
    '& input:focus': {
        backgroundColor: '#e3f2fd',
        boxShadow: 'inset 0 0 0 2px #1976d2',
    },
};

// Your helper functions remain the same
const formatToOneDecimal = (value) => {
  if (value === '' || value === null || value === undefined) return '';
  const num = Number(value);
  if (isNaN(num)) return value;
  return num.toFixed(1);
};

const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDateForApi = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return new Date(`${year}-${month}-${day}T00:00:00`).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, '-');
};

const RatioPage = () => {
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRefs = useRef([]);
    const textColumns = ['Unit', 'Units', 'Brand', 'Specification'];

    // --- NEW: State for Pagination ---
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50); // Set rows per page
    const [focusTarget, setFocusTarget] = useState(null); // For handling focus across page changes

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/api04-material');
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                if (data.length > 0) {
                    setRows(data);
                    const dataHeaders = Object.keys(data[0].values);
                    setHeaders(dataHeaders);
                    // Initialize refs for ALL rows, not just the visible ones
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

    // --- NEW: Effect to handle focusing after a page change ---
    useEffect(() => {
        if (focusTarget) {
            const { row, col } = focusTarget;
            const input = inputRefs.current[row]?.[col];
            if (input) {
                input.focus();
                if (input.type !== 'date') {
                    input.select();
                }
            }
            setFocusTarget(null); // Reset after focusing
        }
    }, [focusTarget, currentPage, rowsPerPage]); // Rerun when focus target or page changes

    const handleInputChange = (e, rowNumber, header) => {
        const { value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [rowNumber]: { ...prev[rowNumber], [header]: value },
        }));
    };

    const handleSubmit = async (e) => {
        // This function remains the same
        e.preventDefault();
        if (Object.keys(editedData).length === 0) {
            alert("No changes to update.");
            return;
        }
        const payload = Object.keys(editedData).map(rowNum => {
            const originalRow = rows.find(r => r.rowNumber === parseInt(rowNum));
            const newValues = { ...originalRow.values, ...editedData[rowNum] };

            if (editedData[rowNum] && editedData[rowNum].Date) {
                newValues.Date = formatDateForApi(newValues.Date);
            }

            return {
                rowNumber: parseInt(rowNum),
                values: newValues,
            };
        });
        try {
            const response = await fetch('/api/api04-material', {
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
    
    // --- UPDATED: handleKeyDown to manage cross-page navigation ---
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
        
        // Check if the next row is on a different page
        const nextRowPage = Math.floor(nextRow / rowsPerPage);
        if (nextRowPage !== currentPage) {
            setCurrentPage(nextRowPage);
        }

        // Set a target for the useEffect to focus on after the potential page change
        setFocusTarget({ row: nextRow, col: nextCol });
    };

    // --- NEW: Handlers for the TablePagination component ---
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0); // Reset to the first page
    };


    const columnWidthLogic = () => {
        const numValueColumns = headers.length;
        if (numValueColumns === 0) return { getWidth: () => 'auto' };

        const numSmallColumns = Math.max(0, numValueColumns - 3);
        const numLargeColumns = numValueColumns - numSmallColumns;
        const totalProportionalUnits = (numSmallColumns * 1) + (numLargeColumns * 1.5);

        return {
            getWidth: (colIndex) => {
                const isLargeColumn = colIndex >= numSmallColumns;
                const widthPercentage = totalProportionalUnits > 0
                    ? ((isLargeColumn ? 1.5 : 1) / totalProportionalUnits) * 100
                    : 0;
                return `${widthPercentage}%`;
            }
        };
    };

    const { getWidth } = columnWidthLogic();

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;
    
    // --- NEW: Slicing the data for the current page ---
    const paginatedRows = rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
    
    return (
        <Box sx={{ margin: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Material Data</Typography>
                    <Button type="submit" variant="contained" color="primary" disabled={Object.keys(editedData).length === 0}>
                        Update Sheet
                    </Button>
                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}> {/* Adjusted height for pagination */}
                        <Table stickyHeader aria-label="ratio table" sx={{ tableLayout: 'fixed' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ ...headerCellStyle, width: '120px' }}>Item Code</TableCell>
                                    <TableCell sx={{ ...headerCellStyle, width: '300px', textAlign: 'center' }}>Item Name</TableCell>
                                    {headers.map((header, colIndex) => (
                                        <TableCell key={header} sx={{ ...headerCellStyle, width: getWidth(colIndex) }}>
                                            {header.replace(/_/g, ' ').split(' ').map((word, index) => (<React.Fragment key={index}>{index > 0 && <br />}{word}</React.Fragment>))}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((row, pageRowIndex) => {
                                    // --- IMPORTANT: Calculate the actual index in the full 'rows' array ---
                                    const actualRowIndex = currentPage * rowsPerPage + pageRowIndex;
                                    return (
                                        <TableRow key={row.rowNumber} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                                            <TableCell sx={{ ...bodyCellStyle, textAlign: 'center' }}>{row.serialCode}</TableCell>
                                            <TableCell sx={{...bodyCellStyle, textAlign: 'left'}}>{row.itemName}</TableCell>
                                            
                                            {headers.map((header, colIndex) => (
                                                <TableCell key={`${row.rowNumber}-${header}`} sx={editableCellStyle}>
                                                    {(() => {
                                                        const commonProps = {
                                                            // Use the actualRowIndex for refs and event handlers
                                                            ref: el => inputRefs.current[actualRowIndex][colIndex] = el,
                                                            onChange: (e) => handleInputChange(e, row.rowNumber, header),
                                                            onKeyDown: (e) => handleKeyDown(e, actualRowIndex, colIndex),
                                                        };

                                                        if (header === 'Date') {
                                                            return (
                                                                <input
                                                                    {...commonProps}
                                                                    type="date"
                                                                    value={
                                                                        editedData[row.rowNumber]?.Date !== undefined
                                                                            ? editedData[row.rowNumber].Date
                                                                            : formatDateForInput(row.values.Date)
                                                                    }
                                                                />
                                                            );
                                                        } else if (textColumns.includes(header)) {
                                                            return (
                                                                <input
                                                                    {...commonProps}
                                                                    type="text"
                                                                    value={
                                                                        editedData[row.rowNumber]?.[header] !== undefined
                                                                            ? editedData[row.rowNumber][header]
                                                                            : row.values[header] || ''
                                                                    }
                                                                />
                                                            );
                                                        } else { 
                                                            return (
                                                                <input
                                                                    {...commonProps}
                                                                    type="number"
                                                                    value={
                                                                        editedData[row.rowNumber]?.[header] !== undefined
                                                                            ? editedData[row.rowNumber][header]
                                                                            : formatToOneDecimal(row.values[header])
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    })()}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* --- NEW: TablePagination Component --- */}
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