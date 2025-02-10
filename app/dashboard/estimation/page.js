"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path based on where your firebase.js file is located
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

const Restpageb = () => {
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

  const [rightRows, setRightRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from Google Apps Script
  const fetchData = async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxiXrcq9lBHbHbYd4McnJd2tPbiHSdIAUSMF9iENDpILET_eafNxuWd0aRJxFq1w0Eq/exec");
      const data = await response.json();
      setRightRows(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  // Function to copy right table data to clipboard
  const handleCopy = () => {
    if (rightRows.length === 0) {
      alert("No data to copy!");
      return;
    }

    const tableData = rightRows
      .map(
        (row) =>
          `${row.id}\t${row.category}\t${row.item}\t${row.qty}\t${row.unit}\t${row.rate}\t${row.amount}`
      )
      .join("\n");

    // Add column headers
    const headers = "Sl No\tCategory\tItem\tQuantity\tUnit\tRate\tAmount";
    const finalData = `${headers}\n${tableData}`;

    navigator.clipboard.writeText(finalData).then(() => {
      alert("Table data copied to clipboard!");
    });
  };

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", margin: 1, marginBottom: "50px" }}>
      {/* Copy Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleCopy}>
          Copy Table Data
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", color: "red" }}>{error}</Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 450, overflowY: "auto",
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
          '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' } }}>
          <Table stickyHeader>
          <TableHead>
           <TableRow>
            {[
              { label: "Sl No", width: "80px" },
              { label: "Category", width: "150px" },
              { label: "Item", width: "auto" }, // Remaining width
              { label: "Quantity", width: "90px" },
              { label: "Unit", width: "80px" },
              { label: "Rate", width: "80px" },
              { label: "Amount", width: "100px" },
             ].map((header) => (
              <TableCell
               key={header.label}
               sx={{
                 backgroundColor: "#4CAF50",
                 color: "white",
                 fontWeight: "bold",
                 py: 0.5,
                 textAlign: "center",
                 width: header.width,
                }}
               >
             {header.label}
              </TableCell>
             ))}
           </TableRow>
          </TableHead>
            <TableBody>
              {rightRows.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.7rem"}}>{item.id}</TableCell>
                  <TableCell sx={{ py: 0.5, fontSize: "0.7rem",maxWidth: "40px",  wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal"  }}>{item.category}</TableCell>
                  <TableCell sx={{ py: 0.5, fontSize: "0.7rem",maxWidth: "150px",  wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>{item.item}</TableCell>
                  <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.7rem" }}>{Number(item.qty).toFixed(0)}</TableCell>
                  <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.7rem" }}>{item.unit}</TableCell>
                  <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.7rem" }}>{Number(item.rate).toFixed(2)}</TableCell>
                  <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.7rem" }}>{Number(item.amount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Restpageb;
