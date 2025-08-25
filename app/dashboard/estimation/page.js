"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from "@mui/material";

const Lestpage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };
    const [rows, setRows] = useState([]);
    const [inputValues, setInputValues] = useState({});
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/api02/getSheetData');
                const data = await response.json();
                setRows(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (e, cellAddress) => {
        const { value } = e.target;
        setInputValues(prev => ({ ...prev, [cellAddress]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = rows.map(row => ({
            cellAddress: row.cellAddress,
            inputQuantity: inputValues[row.cellAddress] !== undefined ? inputValues[row.cellAddress] : row.agQuantity
        }));

        try {
            const response = await fetch('/api/api02/updateSheet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                window.location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const isNumber = (value) => !isNaN(value) && value !== '';

    // ---vvv KEY NAVIGATION LOGIC vvv---

    const currentRowsOnPage = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const navigableCellIds = useMemo(() => {
        return currentRowsOnPage
            .filter(row => isNumber(row.slNo))
            .map(row => row.cellAddress);
    }, [currentRowsOnPage]);

    const handleKeyDown = (e, currentCellAddress) => {
        const { key, shiftKey } = e;

        if (!['ArrowDown', 'ArrowUp', 'Enter', 'Tab'].includes(key)) {
            return;
        }
        
        e.preventDefault();

        const currentIndex = navigableCellIds.indexOf(currentCellAddress);
        let nextIndex = -1;

        switch (key) {
            case 'ArrowDown':
            case 'Enter':
                nextIndex = currentIndex + 1;
                break;
            case 'ArrowUp':
                nextIndex = currentIndex - 1;
                break;
            case 'Tab':
                nextIndex = shiftKey ? currentIndex - 1 : currentIndex + 1;
                break;
            default:
                return;
        }

        if (nextIndex >= 0 && nextIndex < navigableCellIds.length) {
            const nextCellId = navigableCellIds[nextIndex];
            const nextInput = document.getElementById(nextCellId);
            if (nextInput) {
                nextInput.focus();
                nextInput.select();
            }
        }
    };

    // ---^^^ KEY NAVIGATION LOGIC ^^^---

    return (
        <Box sx={{ fontFamily: "Arial, sans-serif", margin: 1, paddingTop: "5px" }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
            
            <Paper>
                <TableContainer sx={{ maxHeight: 'calc(70vh - 150px)', overflowY: "auto",
                          '&::-webkit-scrollbar': { width: '8px' },
                          '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
                          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                          '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' } }}>
                    {/* CHANGE 1: Add tableLayout: 'fixed' to the Table */}
                    <Table stickyHeader sx={{ tableLayout: 'fixed' }}> 
                        <TableHead>
                            <TableRow>
                                {/* CHANGE 2: Define widths for all header cells for a predictable layout */}
                                <TableCell sx={{ width: '10%', backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", py: 0.5, textAlign: "center" }}>
                                    Sl No
                                </TableCell>
                                <TableCell sx={{ width: '55%', backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", py: 0.5, textAlign: "center" }}>
                                    Description
                                </TableCell>
                                <TableCell sx={{ width: '25%', backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", py: 0.5, textAlign: "center" }}>
                                    Quantity
                                </TableCell>
                                <TableCell sx={{ width: '10%', backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", py: 0.5, textAlign: "center" }}>
                                    Unit
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRowsOnPage.map((row, index) => (
                                <TableRow key={row.cellAddress || index}>
                                    <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem", fontWeight: isNumber(row.slNo) ? 'normal' : 'bold' }}>
                                        {row.slNo}
                                    </TableCell>
                                    {/* CHANGE 3: Add wordBreak to the Description body cell to handle text wrapping */}
                                    <TableCell sx={{ py: 0.5, textAlign: "left", fontSize: "0.8rem", fontWeight: isNumber(row.slNo) ? 'normal' : 'bold', textDecoration: isNumber(row.slNo) ? 'none' : 'underline', wordBreak: 'break-word' }}>
                                        {row.description}
                                    </TableCell>
                                    {isNumber(row.slNo) ? (
                                        <>
                                            <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>
                                                <input 
                                                    id={row.cellAddress}
                                                    type="text" 
                                                    value={inputValues[row.cellAddress] !== undefined ? inputValues[row.cellAddress] : Number(row.agQuantity).toFixed(0)} 
                                                    onChange={(e) => handleInputChange(e, row.cellAddress)}
                                                    onKeyDown={(e) => handleKeyDown(e, row.cellAddress)}
                                                    style={{ padding: '2px', width: '100px', textAlign: "center" }} 
                                                />
                                            </TableCell>
                                            <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>{row.unit}</TableCell>
                                        </>
                                    ) : (
                                        <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }} colSpan={2}></TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody> 
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Lestpage;