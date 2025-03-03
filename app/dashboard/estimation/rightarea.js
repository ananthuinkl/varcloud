"use client";

import React, { useState, useEffect } from 'react';
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
} from "@mui/material";

const Restpaget = () => {
  const [rightRows, setRightRows] = useState([]);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbw0m2h5YqeUpQdUIayNyN9kJMjMlmrGq-i-eu_1Qz8Q49lOE4L2MYiKr3lMeJYr7Mhj/exec")
      .then((response) => response.json())
      .then((data) => setRightRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCopy = () => {
    const tableData = rightRows
      .map(
        (row, index) =>
          `${index + 1}\t${row.description }\t${row.qty}\t${row.unit}\t${row.rate}\t${row.amount}`
      )
      .join("\n");

    const headers = "Sl No\tDescription\tQuantity\tUnit\tRate\tAmount";
    const finalData = `${headers}\n${tableData}`;

    navigator.clipboard.writeText(finalData).then(() => {
      alert("Table data copied to clipboard!");
    });
  };
  const handleDownload = async () => {
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbxntaikfRo2DE_kfgk52TaDFocCW5X_XqRucEwO_nCVwiK6uA8fznzC5ti4c-mkJq4V/exec";

    try {
      // Fetch the download link from Apps Script
      const response = await fetch(appsScriptUrl);
      const downloadUrl = await response.text();

      // Trigger file download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "google-sheet.xlsx"; // Set filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", margin: 1 }}>
    <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownload}
        sx={{ marginRight: "10px" }}
      >
        Download BOQ
      </Button>
      <Button variant="contained" color="primary" onClick={handleCopy}>
        Copy Table Data
      </Button>
    </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4CAF50", height: "30px" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "70px", textAlign: "center" }}>Sl No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, textAlign: "center" }}>Description</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center" }}>Unit</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center" }}>Rate</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rightRows.map((item, index) => (
              <TableRow key={index} sx={{ height: "30px" }}>
                <TableCell sx={{ py: 0.5, width: "70px", textAlign: "center" }}>{item.id}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{item.description}</TableCell>
                <TableCell sx={{ py: 0.5, textAlign: "center" }}>{item.qty !== "" && item.qty !== null && item.qty !== undefined ? Number(item.qty).toFixed(0) : ""}</TableCell>
                <TableCell sx={{ py: 0.5, width: "100px", textAlign: "center" }}>{item.unit}</TableCell>
                <TableCell sx={{ py: 0.5, width: "100px", textAlign: "right" }}>{item.rate ? Number(item.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""} </TableCell>
                <TableCell sx={{ py: 0.5, width: "100px", textAlign: "right" }}>{item.amount ? Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Restpaget;
