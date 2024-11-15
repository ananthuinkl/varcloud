"use client";
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  styled,
  TextField,
} from '@mui/material';

// Styled components to mimic Excel table appearance
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd', // Light grey border for all cells
  padding: '8px', // Padding for better spacing
  textAlign: 'center', // Center text for all cells by default
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f9f9f9', // Light grey for even rows
  },
  '&:hover': {
    backgroundColor: '#eaeaea', // Slightly darker grey on hover
  },
}));

const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#cce5ff', // Light blue background for header
}));

const ElectricalAndElectronicTables = () => {
  const [electricalItems, setElectricalItems] = useState([
    { id: 1, name: 'Total Number Of Light Fixture', qty: 0, units: 'No' },
    { id: 2, name: 'Number Of Light Points at 1 Circuit', qty: 12, units: 'No' },
    { id: 3, name: 'Conduit Length from Trunking to First Light Point', qty: 10, units: 'm' },
    { id: 4, name: 'Wire Length from DB to First Light Point', qty: 30, units: 'm' },
    { id: 5, name: 'Void Height', qty: 0.9, units: 'm' },
    { id: 6, name: 'Length between Light Point', qty: 1.5, units: 'm' },
    { id: 7, name: 'Ceiling Rose to Light fixture', qty: 0.75, units: 'm' },
    { id: 8, name: 'Length between Saddles', qty: 0.5, units: 'm' },
  ]);

  const [electronicItems, setElectronicItems] = useState([
    { id: 1, name: '20mm conduits', qty: 0, units: 'Length', rate: 3.15 },
    { id: 2, name: '20mm PVC junction box -One Way', qty: 0, units: "No's", rate: 1.75 },
    { id: 3, name: '20mm PVC junction box -Two Way', qty: 0, units: "No's", rate: 1.9 },
    { id: 4, name: '20mm Back Entry Junction Box', qty: 0, units: "No's", rate: 1.47 },
    { id: 5, name: '20mm Dome Cover', qty: 0, units: "No's", rate: 0.42 },
    { id: 6, name: 'Round PVC cover', qty: 0, units: "No's", rate: 0.42 },
    { id: 7, name: '20mm saddles', qty: 0, units: "No's", rate: 0.47 },
    { id: 8, name: '20mm coupler', qty: 0, units: "No's", rate: 0.24 },
    { id: 9, name: '20mm Adaptor/Brass Bush+Check Nut', qty: 0, units: "No's", rate: 0.42 },
    { id: 10, name: '20mm G.I. flexible pipe', qty: 0, units: 'Mtr', rate: 4.8 },
    { id: 11, name: '20mm Flexible Gland', qty: 0, units: "No's", rate: 0.7 },
    { id: 12, name: 'Ceiling rose Plugin type', qty: 0, units: "No's", rate: 7.0 },
    { id: 13, name: '3x1.5 Sqmm Flexible Wire', qty: 0, units: 'Mtr', rate: 0.43 },
    { id: 14, name: '1x2.5 Sqmm Wire', qty: 0, units: 'Mtr', rate: 1.5 },
    { id: 15, name: 'M4x15mm Screw', qty: 0, units: "No's", rate: 0.05 },
    { id: 16, name: '6mm Fisher', qty: 0, units: "No's", rate: 0.05 },
    { id: 17, name: '11/2x8mm Screw', qty: 0, units: "No's", rate: 0.05 },

  ]);

  // Update electronicItems based on changes in electricalItems
  useEffect(() => {
    const lightQty = electricalItems.find(item => item.id === 1)?.qty || 0;
    const lightPointsQty = electricalItems.find(item => item.id === 2)?.qty || 0;
    const conduitLength = electricalItems.find(item => item.id === 3)?.qty || 0;
    const wireLength = electricalItems.find(item => item.id === 4)?.qty || 0;
    const voidHeight = electricalItems.find(item => item.id === 5)?.qty || 0;
    const lengthBetweenLightPoint = electricalItems.find(item => item.id === 6)?.qty || 0;
    const ceilingRoseToLightFixture = electricalItems.find(item => item.id === 7)?.qty || 0;
    const lengthBetweenSaddles = electricalItems.find(item => item.id === 8)?.qty || 0;

    // Pre-computed values to avoid repeated calculations
    const circuitsQty = lightQty / lightPointsQty;
    const totalConduitLength = (conduitLength + (lightPointsQty - 1) * lengthBetweenLightPoint) / 3;
    const totalCircuits = totalConduitLength * circuitsQty;

    setElectronicItems(prevItems =>
      prevItems.map(item => {
        let newQty = item.qty; // Default to the existing quantity

        switch (item.id) {
          case 1:
            newQty = Math.ceil(totalCircuits);
            break;
          case 2:
            newQty = Math.ceil((lightPointsQty + 1) * circuitsQty);
            break;
          case 3:
            newQty = Math.ceil((lightPointsQty - 1) * circuitsQty);
            break;
          case 4:
            newQty = Math.ceil(circuitsQty); // Always 1 * circuitsQty
            break;
          case 5:
            newQty = Math.ceil(lightPointsQty * circuitsQty);
            break;
          case 6:
            newQty = Math.ceil(circuitsQty); // Always 1 * circuitsQty
            break;
          case 7:
            newQty = Math.ceil((totalCircuits * 3) / lengthBetweenSaddles);
            break;
          case 8:
            newQty = Math.ceil(totalCircuits);
            break;
          case 9:
            newQty = Math.ceil(circuitsQty); // Always 1 * circuitsQty
            break;
          case 10:
            newQty = Math.ceil(lightPointsQty * voidHeight * circuitsQty);
            break;
          case 11:
            newQty = Math.ceil((lightPointsQty * 2) * circuitsQty);
            break;
          case 12:
            newQty = Math.ceil(lightPointsQty * circuitsQty);
            break;
          case 13:
            newQty = Math.ceil(lightPointsQty * ceilingRoseToLightFixture * circuitsQty);
            break;
          case 14:
            newQty = Math.ceil((wireLength + ((lightPointsQty - 1) * lengthBetweenLightPoint) + (2 * voidHeight * lightPointsQty)) * 3 * circuitsQty);
            break;
          case 15:
            newQty = Math.ceil(((lightPointsQty + 1) * circuitsQty + (lightPointsQty - 1) * circuitsQty + circuitsQty) * 2);
            break;
          case 16:
          case 17:
            newQty = Math.ceil(((totalCircuits * 3) / lengthBetweenSaddles)+((lightPointsQty - 1) * circuitsQty)+circuitsQty);
            break;
          default:
            break;
        }

        return { ...item, qty: newQty };
      })
    );
}, [electricalItems]);

  return (
    <Grid container spacing={2} padding={2}>
      {/* First Table for Electrical Items */}
      <Grid item xs={5}>
        <Typography variant="h6" align="center" gutterBottom>
          User Requirments
        </Typography>
        <TableContainer component={Paper} elevation={1} style={{ borderRadius: '4px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Sl No</StyledTableHeaderCell>
                <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '20%' }}>Qty</StyledTableHeaderCell>
                <StyledTableHeaderCell>Unit</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {electricalItems.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'left' }}>{item.name}</StyledTableCell>
                  <StyledTableCell style={{ width: '20%', textAlign: 'right' }}>
                    <TextField
                      value={item.qty} // Format to two decimal places
                      onChange={(e) =>
                        setElectricalItems((prevItems) =>
                          prevItems.map((el) =>
                            el.id === item.id ? { ...el, qty: Number(e.target.value) } : el
                          )
                        )
                      }
                      type="number"
                      inputProps={{ style: { textAlign: 'right', padding: '4px' } }}
                      variant="outlined"
                      size="small"
                    />
                  </StyledTableCell>
                  <StyledTableCell>{item.units}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Second Table for Electronic Items */}
      <Grid item xs={7}>
        <Typography variant="h6" align="center" gutterBottom>
          Required Materials
        </Typography>
        <TableContainer component={Paper} elevation={1} style={{ borderRadius: '4px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Sl No</StyledTableHeaderCell>
                <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ textAlign: 'right' }}>Qty</StyledTableHeaderCell>
                <StyledTableHeaderCell>Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ textAlign: 'right' }}>Rate</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ textAlign: 'right' }}>Amount</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {electronicItems.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'left' }}>{item.name}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'center' }}>{item.qty}</StyledTableCell>
                  <StyledTableCell>{item.units}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'right' }}>{item.rate.toFixed(2)}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'right' }}>{(item.qty * item.rate).toFixed(2)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ElectricalAndElectronicTables;