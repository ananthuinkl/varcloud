"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path based on where your firebase.js file is located
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const VoltageDropCalc = () => {
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
  // Initial rows data
  const [leftRows, setLeftRows] = useState([
    { id: 1, name: "Cable reference", qty: "", unit: "" }, // Text field
    { id: 2, name: "Cable from", qty: "", unit: "" }, // Text field
    { id: 3, name: "Connected to", qty: "", unit: "" }, // Text field
    { id: 4, name: "Number of runs per phase", qty: 1, unit: "No" },
    { id: 5, name: "Number of Cores", qty: 4, unit: "No" },
    { id: 6, name: "Cable Size", qty: 35, unit: "Sqmm" }, // Dropdown field
    { id: 7, name: "Operating voltage", qty: 400, unit: "V" }, // Dropdown field
    { id: 8, name: "Length of cable", qty: 100, unit: "m" },
    { id: 9, name: "Total connected load", qty: 50, unit: "Kw" },
    { id: 10, name: "ACB / MCCB Rating", qty: 100, unit: "A TPN" },
    { id: 11, name: "Percentage of voltage drop allowed", qty: 4, unit: "%Vd" },
    { id: 12, name: "Power factor", qty: 0.9, unit: "PF" },
    { id: 13, name: "Till Feeding point percentage of voltage drop", qty: 1.0, unit: "%Vd" },
    { id: 14, name: "Derating factor", qty: 0.5, unit: "DF" },
    { id: 15, name: "Installation Type G/A/D", qty: "Ground", unit: "" }, // Dropdown field
  ]);
  const [rightRows, setRightRows] = useState([
    { id: 1, name: "Cable Reference", qty: "", unit: "" }, // Text field
    { id: 2, name: "Cable From", qty: "", unit: "" }, // Text field
    { id: 3, name: "Connected To", qty: "", unit: "" }, // Text field
    { id: 4, name: "Number of runs per phase", qty: 0, unit: "No" },
    { id: 5, name: "Number of Cores", qty: 0, unit: "No" },
    { id: 6, name: "Cable Size", qty: 0, unit: "Sqmm" },
    { id: 7, name: "Operating Voltage", qty: 0, unit: "V" },
    { id: 8, name: "Length of cable", qty: 0, unit: "m" },
    { id: 9, name: "Total connected load", qty: 0, unit: "Kw" },
    { id: 10, name: "Demand Load", qty: 0, unit: "" },
    { id: 11, name: "ACB / MCCB Rating", qty: 0, unit: "A TPN" },
    { id: 12, name: "Voltage Drop/A/M", qty: 0, unit: "mV" },
    { id: 13, name: "Percentage of Voltage Drop Allowed", qty: 0, unit: "%Vd" },
    { id: 14, name: "Maximum Voltage Drop allowed", qty: 0, unit: "V" },
    { id: 15, name: "Power factor", qty: 0, unit: "PF" },
    { id: 16, name: "Load Current", qty: 0, unit: "A" },
    { id: 17, name: "Actual Voltage Drop", qty: 0, unit: "Vd" },
    { id: 18, name: "Percentage of actual percentage Voltage Drop", qty: 0, unit: "%Vd" },
    { id: 19, name: "Percentage of actual percentage Cumulative Voltage Drop", qty: 0, unit: "%Vd" },
    { id: 20, name: "Derating Factor", qty: 0, unit: "DF" },
    { id: 21, name: "Installation Type G/A/D", qty: 0, unit: "" },
    { id: 22, name: "Voltage Drop Within Limit", qty: 0, unit: "Vd" },
    { id: 23, name: "Cable Current Rating", qty: 0, unit: "A" },
    { id: 24, name: "Derated Current", qty: 0, unit: "A" },
    { id: 25, name: "Check", qty: 0, unit: "" },
    { id: 26, name: "Check to Reduce Cable Size", qty: 0, unit: "" },
  ]);

  // Predefined list of cable sizes
  const cableSizes = [
    2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630, 800, 1000,
  ];

  // Predefined list of installation types
  const installationTypes = ["Ground", "Air", "Duct"];

  // Predefined list of operating voltages
  const operatingVoltages = [400, 230];

  // Predefined list of cable sizes
  const breakerSizes = [
    20, 25, 32, 40, 63, 80, 100, 125, 160, 200, 225, 250, 300, 350, 400, 630, 800, 1000, 1200, 1600, 2000, 2500,
  ];

  // Function to handle quantity change in the left table
  const handleQuantityChange = (id, newValue) => {
    setLeftRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, qty: newValue } : row
      )
    );
  };

  useEffect(() => {
    const cableRef = leftRows.find(item => item.id === 1)?.qty || "";
    const cableFrom = leftRows.find(item => item.id === 2)?.qty || "";
    const cableTo = leftRows.find(item => item.id === 3)?.qty || "";
    const noRuns = leftRows.find(item => item.id === 4)?.qty || 0;
    const noCore = leftRows.find(item => item.id === 5)?.qty || 0;
    const cableSize = leftRows.find(item => item.id === 6)?.qty || 0;
    const operVoltage = leftRows.find(item => item.id === 7)?.qty || 0;
    const cableLenght = leftRows.find(item => item.id === 8)?.qty || 0;
    const tclKw = leftRows.find(item => item.id === 9)?.qty || 0;
    const breakerSize = leftRows.find(item => item.id === 10)?.qty || 0;
    const percentageVd = leftRows.find(item => item.id === 11)?.qty || 0;
    const powerFactor = leftRows.find(item => item.id === 12)?.qty || 0;
    const lastVd = leftRows.find(item => item.id === 13)?.qty || 0;
    const derateFactor = leftRows.find(item => item.id === 14)?.qty || 0;
    const installType = leftRows.find(item => item.id === 15)?.qty || "";

    const cableData = [
      { "cableSize": 2.5, "vdAm": 16.4, "Ground": 34, "Air": 25, "Duct": 17.5 },
      { "cableSize": 4, "vdAm": 10.2, "Ground": 47, "Air": 34, "Duct": 23 },
      { "cableSize": 6, "vdAm": 6.8, "Ground": 57, "Air": 43, "Duct": 29 },
      { "cableSize": 10, "vdAm": 4, "Ground": 82, "Air": 60, "Duct": 39 },
      { "cableSize": 16, "vdAm": 2.5, "Ground": 115, "Air": 99, "Duct": 94 },
      { "cableSize": 25, "vdAm": 1.65, "Ground": 150, "Air": 131, "Duct": 125 },
      { "cableSize": 35, "vdAm": 1.15, "Ground": 180, "Air": 162, "Duct": 150 },
      { "cableSize": 50, "vdAm": 0.87, "Ground": 215, "Air": 197, "Duct": 175 },
      { "cableSize": 70, "vdAm": 0.6, "Ground": 265, "Air": 251, "Duct": 215 },
      { "cableSize": 95, "vdAm": 0.45, "Ground": 315, "Air": 304, "Duct": 260 },
      { "cableSize": 120, "vdAm": 0.37, "Ground": 360, "Air": 353, "Duct": 300 },
      { "cableSize": 150, "vdAm": 0.3, "Ground": 405, "Air": 406, "Duct": 335 },
      { "cableSize": 185, "vdAm": 0.26, "Ground": 460, "Air": 463, "Duct": 380 },
      { "cableSize": 240, "vdAm": 0.21, "Ground": 530, "Air": 546, "Duct": 440 },
      { "cableSize": 300, "vdAm": 0.185, "Ground": 590, "Air": 628, "Duct": 495 },
      { "cableSize": 400, "vdAm": 0.165, "Ground": 667, "Air": 728, "Duct": 570 },
      { "cableSize": 500, "vdAm": 0.18, "Ground": 770, "Air": 918, "Duct": 620 },
      { "cableSize": 630, "vdAm": 0.26, "Ground": 840, "Air": 1027, "Duct": 670 },
      { "cableSize": 800, "vdAm": 0, "Ground": 888, "Air": 1119, "Duct": 692 },
      { "cableSize": 1000, "vdAm": 0.16, "Ground": 942, "Air": 1214, "Duct": 735 }
  ];


    const loadCurrent = tclKw * 1000 / (1.73 * operVoltage * powerFactor);
    const vdAm = cableData.find(item => item.cableSize === cableSize).vdAm;
    const actualVd = loadCurrent * cableLenght * vdAm / (1000 * noRuns);
    const actualpercentageVd = actualVd * 100 / operVoltage;
    const cableIrating = cableData.find(c => c.cableSize === cableSize)[installType];
    
    setRightRows(prevItems =>
      prevItems.map(item => {
        let newQty = item.qty;
        switch (item.id) {
          case 1:
            newQty = cableRef; // Text field
            break;
          case 2:
            newQty = cableFrom; // Text field
            break;
          case 3:
            newQty = cableTo; // Text field
            break;
          case 4:
            newQty = Math.ceil(noRuns);
            break;
          case 5:
            newQty = Math.ceil(noCore);
            break;
          case 6:
            newQty = Math.ceil(cableSize);
            break;
          case 7:
            newQty = Math.ceil(operVoltage);
            break;
          case 8:
            newQty = Math.ceil(cableLenght);
            break;
          case 9:
            newQty = Math.ceil(tclKw);
            break;
          case 10:
            newQty = Math.ceil(tclKw * 0.9);
            break;
          case 11:
            newQty = Math.ceil(breakerSize);
            break;
          case 12:
            newQty = vdAm;
            break;
          case 13:
            newQty = Math.ceil(percentageVd);
            break;
          case 14:
            newQty = Math.ceil(percentageVd * operVoltage);
            break;
          case 15:
            newQty = Math.ceil(powerFactor);
            break;
          case 16:
            newQty = Math.ceil(loadCurrent);
            break;
          case 17:
            newQty = Math.ceil(actualVd);
            break;
          case 18:
            newQty = parseFloat(actualpercentageVd.toFixed(2));
            break;
          case 19:
            newQty = parseFloat((lastVd + actualpercentageVd).toFixed(2));
            break;
          case 20:
            newQty = Math.ceil(derateFactor);
            break;
          case 21:
            newQty = installType; // Text field
            break;
          case 22:
            newQty = (actualVd < percentageVd) ? "Ok" : "Check"; // Text field
            break;
          case 23:
            newQty = cableIrating;
            break;
          case 24:
            newQty = cableIrating * derateFactor;
            break;
          case 25:
            newQty = (breakerSize < cableIrating * derateFactor) ? "Ok" : "Check"; // Text field
            break;
          case 26:
            newQty = (cableIrating * derateFactor < breakerSize * 1.2) ? "No" : "Check"; // Text field
            break;
          default:
            break;
        }

        return { ...item, qty: newQty };
      })
    );
  }, [leftRows]);

  // Function to copy right table data to clipboard
  const handleCopy = () => {
    const tableData = rightRows
      .map(
        (row) =>
          `${row.id}\t${row.name}\t${row.qty}\t${row.unit}`
      )
      .join("\n");

    // Add column headers
    const headers = "Sl No\tDescription\tQuantity\tUnit";
    const finalData = `${headers}\n${tableData}`;

    navigator.clipboard.writeText(finalData).then(() => {
      alert("Table data copied to clipboard!");
    });
  };

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", margin: 0, height: "100vh" }}>
      <Grid container sx={{ height: "100vh" }}>
        {/* Left Table */}
        <Grid item xs={6} sx={{ padding: "20px", paddingTop: "68px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#4CAF50", // Green background
                    height: "30px",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    Sl No
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      textAlign: "center",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Unit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leftRows.map((item) => (
                  <TableRow key={item.id} sx={{ height: "30px" }}>
                    <TableCell
                      sx={{ py: 0.5, width: "70px", textAlign: "center" }}
                    >
                      {item.id}
                    </TableCell>
                    <TableCell sx={{ py: 0.5 }}>{item.name}</TableCell>
                    <TableCell sx={{ py: 0.5 }}>
                      {item.id === 6 ? ( // Dropdown for Cable Size
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, Number(e.target.value))
                          }
                          style={{
                            width: "100px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {cableSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      ) : item.id === 7 ? ( // Dropdown for Operating voltage
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, Number(e.target.value))
                          }
                          style={{
                            width: "100px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {operatingVoltages.map((voltage) => (
                            <option key={voltage} value={voltage}>
                              {voltage}
                            </option>
                          ))}
                        </select>
                      ) : item.id === 10 ? ( // Dropdown for breaker Sizes
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          style={{
                            width: "100px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {breakerSizes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      ) : item.id === 15 ? ( // Dropdown for Installation Type G/A/D
                        <select
                         value={item.qty}
                         onChange={(e) =>
                           handleQuantityChange(item.id, e.target.value)
                         }
                         style={{
                           width: "100px",
                           padding: "5px",
                           textAlign: "center",
                         }}
                        >
                          {installationTypes.map((type) => (
                           <option key={type} value={type}>
                             {type}
                           </option>
                          ))}
                        </select>
                      ) : item.id <= 3 ? ( // Text input for Cable reference, Cable from, Connected to
                        <input
                          type="text"
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          style={{
                            width: "100px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        />
                      ) : ( // Number input for other fields
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, Number(e.target.value))
                          }
                          style={{
                            width: "100px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        py: 0.5,
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {item.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right Table */}
        <Grid item xs={6} sx={{ padding: "20px" }}>
          {/* Copy Button placed above right side table */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
            <Button variant="contained" color="primary" onClick={handleCopy}>
              Copy Table Data
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#4CAF50", // Green background
                    height: "30px",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    Sl No
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      textAlign: "center",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      py: 0.5,
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Unit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rightRows.map((item) => (
                  <TableRow key={item.id} sx={{ height: "30px" }}>
                    <TableCell
                      sx={{ py: 0.5, width: "70px", textAlign: "center" }}
                    >
                      {item.id}
                    </TableCell>
                    <TableCell sx={{ py: 0.5 }}>{item.name}</TableCell>
                    <TableCell sx={{ py: 0.5, textAlign: "center" }}>{item.qty}</TableCell>
                    <TableCell
                      sx={{
                        py: 0.5,
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {item.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VoltageDropCalc;