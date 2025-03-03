"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path based on where your firebase.js file is located
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const Lestpage = () => {
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
    const [rows, setRows] = useState([]);
    const [inputValues, setInputValues] = useState({});

    // Fetch data from the API
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

    // Handle input change for I/P Quantity
    const handleInputChange = (e, cellAddress) => {
        const { value } = e.target;
        setInputValues(prev => ({ ...prev, [cellAddress]: value }));
    };

    // Handle form submission to update data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = rows.map(row => ({
            cellAddress: row.cellAddress, 
            inputQuantity: inputValues[row.cellAddress] !== undefined ? inputValues[row.cellAddress] : row.inputQuantity
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

    // Helper function to check if Sl No is a number
    const isNumber = (value) => !isNaN(value) && value !== '';

    return (
        <Box sx={{ fontFamily: "Arial, sans-serif", margin: 1, height: "100vh", paddingTop: "0px" }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>

            <TableContainer component={Paper} sx={{ maxHeight: 450, overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {["Sl No", "Description", "I/P Quantity", "A/G Quantity", "Unit"].map((label, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        backgroundColor: "#4CAF50",
                                        color: "white",
                                        fontWeight: "bold",
                                        py: 0.5,
                                        textAlign: "center",
                                    }}
                                >
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    sx={{ 
                                        py: 0.5, 
                                        textAlign: "center", 
                                        fontSize: "0.8rem",
                                        fontWeight: isNumber(row.slNo) ? 'normal' : 'bold',
                                    }}
                                >
                                    {row.slNo}
                                </TableCell>
                                <TableCell
                                    sx={{ 
                                      py: 0.5, 
                                      textAlign: "left", 
                                      fontSize: "0.8rem",
                                      fontWeight: isNumber(row.slNo) ? 'normal' : 'bold',
                                      textDecoration: isNumber(row.slNo) ? 'none' : 'underline'
                                  }}
                                >
                                    {row.description}
                                </TableCell>
                                {isNumber(row.slNo) ? (
                                    <>
                                        <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>
                                            <input 
                                                type="text" 
                                                value={inputValues[row.cellAddress] !== undefined ? inputValues[row.cellAddress] : row.inputQuantity} 
                                                onChange={(e) => handleInputChange(e, row.cellAddress)} 
                                                style={{ padding: '2px', width: '100px', textAlign: "center" }} 
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>{Number(row.agQuantity).toFixed(0)}</TableCell>
                                        <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>{row.unit}</TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }} colSpan={3}></TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody> 
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Lestpage;