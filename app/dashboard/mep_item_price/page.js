"use client";
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function MepItemsPrice() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search !== "") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://script.google.com/macros/s/AKfycbw7rF4HA15TTeh3ASIO3rShUcgYGzQOFLj0yuDAB8lE9YHZlJSHJmuaKZxW64FlA0v4/exec?search=${search}`
          );
          const result = await response.json();
          setData(result.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      };

      const timeoutId = setTimeout(() => {
        fetchData();
      }, 500); // Add debounce time of 500ms to avoid too many API calls

      return () => clearTimeout(timeoutId);
    } else {
      setData([]);
    }
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        MEP Materials Price
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        margin="normal"
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.item}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.remarks}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default MepItemsPrice;
