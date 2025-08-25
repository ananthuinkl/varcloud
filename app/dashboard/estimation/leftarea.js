"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react'; // --- NAVIGATION --- Import useRef and useMemo
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from "@mui/material";

// ... (all your constants like locations, workTypes, etc. remain unchanged)
const locations = ["Abu_Dhabi", "Dubai", "Sharjah", "Ajman", "UAQ", "RAK", "Fujairah", "Al_Ain"];
const workTypes = ["Renovation", "New_Fit-Out"];
const buildingTypes = ["L_B-Off", "M_B-Off", "H_B-Off", "Kit_Area", "Din_Area", "Ware_H", "R_Shop", "Sup_Mar", "GYM", "Mall", "Villa", "Salon", "Lab", "Hospital"];
const yesornos = ["Yes", "No"];
const floorTypes = ["Raised", "Screed"];
const needs = ["Need", "No_Need"];
const pvcgis = ["PVC", "G.I."];
const acUnitTypes = ["Chw_Type", "DX_Type", "VRF_Type"];
const chilledWaterPipeInsulationTypes = ["XLPE", "NBR", "Glass_Wool"];
const valvePackageTypes = ["3-Way", "PICV"];
const acDuctTypes = ["P.I.", "G.I."];
const giDuctConnectionTypes = ["Gasket", "Cleat"];


const Leftpage = () => {
    const [inputValues, setInputValues] = useState({});
    const [oQuantities, setOQuantities] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(24);

    // --- NAVIGATION --- 1. Create a ref to hold a map of all our input element references
    const inputRefs = useRef({});

    const inputStyle = {
        padding: '2px',
        width: '150px',
        textAlign: "center",
        fontSize: "0.75rem"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/api01/getSheetData');
                const data = await response.json();
                setOQuantities(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // ... (Your existing handlers: handleChangePage, handleChangeRowsPerPage, handleInputChange, handleSubmit, handleReset remain the same)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setInputValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalValues = Object.keys(oQuantities).reduce((acc, key) => {
            acc[key] = inputValues[key] !== undefined && inputValues[key] !== ""
                ? inputValues[key]
                : oQuantities[key] || "0";
            return acc;
        }, {});
        const response = await fetch('/api/api01/updateSheet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalValues),
        });
        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            window.location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    };
    
    const handleReset = async () => {
        if (!confirm("Are you sure you want to reset the data in Sheet 'INPUT02'? This action cannot be undone.")) {
            return;
        }
        try {
            const response = await fetch('/api/api01/resetSheet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' }) 
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                window.location.reload(); 
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            alert('Reset failed: ' + error.message);
        }
    };
    
    // ... (your leftRows array remains exactly the same)
    const leftRows = [
        { id: 1, name: "Location", key: "location", unit: "" },
        { id: 2, name: "Type of work", key: "workType", unit: "" },
        { id: 3, name: "Type of Building", key: "buildingType", unit: "" },
        { id: 4, name: "Electrical Scope", key: "electricalScope", unit: "" },
        { id: 5, name: "HVAC Scope", key: "hvacScope", unit: "" },
        { id: 6, name: "Plumbing Scope", key: "plumbingScope", unit: "" },
        { id: 7, name: "FLS Scope", key: "flsScope", unit: "" },
        { id: 8, name: "BMS Scope", key: "bmsScope", unit: "" },
        { id: 9, name: "MEP Preliminary", key: "mepPreliminary", unit: "" },
        { id: 10, name: "Area (Sqm) - Net Scope", key: "netArea", unit: "m²" },
        { id: 11, name: "Area (Sqm) - Net Closed Ceiling", key: "netClosedCeilingArea", unit: "m²" },
        { id: 12, name: "Area (Sqm) - Net Open Ceiling", key: "netOpenCeilingArea", unit: "m²" },
        { id: 13, name: "Slab Height (m)", key: "slabHeight", unit: "m" },
        { id: 14, name: "Ceiling Height (m)", key: "ceilingHeight", unit: "m" },
        { id: 15, name: "Void Height (m)", key: "voidHeight", unit: "m" },
        { id: 16, name: "Floor Type", key: "floorType", unit: "" },
        { id: 17, name: "Light Control Point", key: "lightControlPoint", unit: "" },
        { id: 18, name: "Light Control Motion Sensor and Occupancy Sensor", key: "lightControlSensor", unit: "" },
        { id: 19, name: "Light Control Override Switch", key: "lightControlOverrideSwitch", unit: "" },
        { id: 20, name: "Type Of Conduits at Closed Ceiling Area", key: "closedCeilingConduitType", unit: "" },
        { id: 21, name: "Type Of Conduits at Open Ceiling Area", "key": "openCeilingConduitType", unit: "" },
        { id: 22, name: "Floor Box-Percentage of Sharing Work Station", key: "floorBoxSharingPercentage", unit: "%" },
        { id: 23, name: "Server Room", key: "serverRoom", unit: "" },
        { id: 24, name: "Type Of Conduits for High Level Data Point", key: "highLevelDataConduitType", unit: "" },
        { id: 25, name: "Type Of Conduits for 3ph 20A/32A Isolator", key: "isolatorConduitType", unit: "" },
        { id: 26, name: "Type Of AC unit", key: "acUnitType", unit: "" },
        { id: 27, name: "VAV Requirement", key: "vav", unit: "" },
        { id: 28, name: "Type Of Chilled Water Pipe Insulation", key: "chilledWaterPipeInsulationType", unit: "" },
        { id: 29, "name": "Type Of Valve Package", "key": "valvePackageType", "unit": "" },
        { id: 30, "name": "Type Of AC Duct", "key": "acDuctType", "unit": "" },
        { id: 31, "name": "Type Of G.I. Duct Insulation", "key": "giDuctInsulationType", "unit": "" },
        { id: 32, "name": "Type Of G.I. Duct Connection", "key": "giDuctConnectionType", "unit": "" },
        { id: 33, "name": "Percentage usage of square diffuser", "key": "squareDiffuserUsagePercentage", "unit": "%" },
        { id: 1001, "name": "Light Point Input", "key": "lightPointInput", "unit": "" },
        { id: 34, "name": "Number Of Light Points at 1 Circuit", "key": "lightPointsPerCircuit", "unit": "No's" },
        { id: 35, "name": "Conduit Length from Trunking to First Light Point", "key": "conduitLengthToFirstLightPoint", "unit": "m" },
        { id: 36, "name": "Wire Length from DB to First Light Point", "key": "wireLengthToFirstLightPoint", "unit": "m" },
        { id: 37, "name": "Wire Length from DB to Last Light Point", "key": "wireLengthToLastLightPoint", "unit": "m" },
        { id: 38, "name": "Length between Light Point", "key": "lengthBetweenLightPoints", "unit": "m" },
        { id: 1002, "name": "Light Control Point Input", "key": "lightControlPointInput", "unit": "" },
        { id: 39, "name": "Number Of Light Points at 1 Circuit", "key": "lightControlPointsPerCircuit", "unit": "No's" },
        { id: 40, "name": "Conduit Length from Trunking to First Light Point", "key": "conduitLengthToFirstLightControlPoint", "unit": "m" },
        { id: 41, "name": "Wire Length from LCP to First Light Point", "key": "wireLengthToFirstLightControlPoint", "unit": "m" },
        { id: 42, "name": "Wire Length from LCP to Last Light Point", "key": "wireLengthToLastLightControlPoint", "unit": "m" },
        { id: 1003, "name": "Light Switch Point Input", "key": "lightSwitchPointInput", "unit": "" },
        { id: 43, "name": "Conduit Length from Trunking to Switch Point", "key": "conduitLengthToSwitchPoint", "unit": "m" },
        { id: 44, "name": "Wire Length from DB to Switch Point", "key": "wireLengthToSwitchPoint", "unit": "m" },
        { id: 1004, "name": "Low Level Wiring Device", "key": "lowLevelWiringDevice", "unit": "" },
        { id: 45, "name": "Conduit Length from Trunking/DB to First Wiring Devices", "key": "conduitLengthToFirstWiringDevice", "unit": "m" },
        { id: 46, "name": "Wire Length from DB to First Wiring Devices", "key": "wireLengthToFirstWiringDevice", "unit": "m" },
        { id: 47, "name": "Wire Length from DB to Last Wiring Devices", "key": "wireLengthToLastWiringDevice", "unit": "m" },
        { id: 48, "name": "Mounting Height of Wiring Devices", "key": "wiringDeviceMountingHeight", "unit": "m" },
        { id: 49, "name": "Length Between Wiring Devices", "key": "lengthBetweenWiringDevices", "unit": "m" },
        { id: 50, "name": "Length of flexible conduits required", "key": "flexibleConduitLength", "unit": "m" },
        { id: 51, "name": "Conduit Length from Trunking/DB to First Floor Box", "key": "conduitLengthToFirstFloorBox", "unit": "m" },
        { id: 52, "name": "Wire Length from DB to First Floor Box", "key": "wireLengthToFirstFloorBox", "unit": "m" },
        { id: 53, "name": "Wire Length from DB to Last Floor Box", "key": "wireLengthToLastFloorBox", "unit": "m" },
        { id: 54, "name": "Length Between Floor Box", "key": "lengthBetweenFloorBoxes", "unit": "m" },
        { id: 1005, "name": "High Level Wiring Device", "key": "highLevelWiringDevice", "unit": "" },
        { id: 55, "name": "Conduit Length from Trunking/DB to First Wiring Devices", "key": "conduitLengthToFirstHighLevelWiringDevice", "unit": "m" },
        { id: 56, "name": "Wire Length from DB to First Wiring Devices", "key": "wireLengthToFirstHighLevelWiringDevice", "unit": "m" },
        { id: 57, "name": "Wire Length from DB to Last Wiring Devices", "key": "wireLengthToLastHighLevelWiringDevice", "unit": "m" },
        { id: 58, "name": "Length Between Wiring Devices", "key": "lengthBetweenHighLevelWiringDevices", "unit": "m" },
        { id: 1006, "name": "Three Phase Power Outlet/Isolator", "key": "threePhasePowerOutlet", "unit": "" },
        { id: 59, "name": "Conduit Length from Trunking/DB to 3-Phase Power Outlet", "key": "conduitLengthToThreePhaseOutlet", "unit": "m" },
        { id: 60, "name": "Wire Length from DB to 3-Phase Power Outlet", "key": "wireLengthToThreePhaseOutlet", "unit": "m" },
        { id: 1007, "name": "Data Point Input", "key": "dataPointInput", "unit": "" },
        { id: 61, "name": "Conduit Length from Server/Tray to Nearest Data Point- LL", "key": "conduitLengthToNearestLowLevelDataPoint", "unit": "m" },
        { id: 62, "name": "Conduit Length from Server/Tray to Far Data Point-LL", "key": "conduitLengthToFarLowLevelDataPoint", "unit": "m" },
        { id: 63, "name": "Conduit Length from Server/Tray to Nearest Data Point-HL", "key": "conduitLengthToNearestHighLevelDataPoint", "unit": "m" },
        { id: 64, "name": "Conduit Length from Server/Tray to Far Data Point-HL", "key": "conduitLengthToFarHighLevelDataPoint", "unit": "m" },
        { id: 1008, "name": "BMS Point Input", "key": "bmsPointInput", "unit": "" },
        { id: 65, "name": "Conduit Length from Server/Tray to Nearest BMS Point", "key": "conduitLengthToNearestBmsPoint", "unit": "m" },
        { id: 66, "name": "Conduit Length from Server/Tray to Far BMS Point", "key": "conduitLengthToFarBmsPoint", "unit": "m" },
        { id: 67, "name": "Cable Length from Server/Tray to Nearest BMS Point", "key": "cableLengthToNearestBmsPoint", "unit": "m" },
        { id: 68, "name": "Cable Length from Server/Tray to Far BMS Point", "key": "cableLengthToFarBmsPoint", "unit": "m" },
        { id: 1009, "name": "Thermostat Point Input", "key": "thermostatPointInput", "unit": "" },
        { id: 69, "name": "Conduit Length from AC Machine to Average Thermostat", "key": "conduitLengthToAverageThermostat", "unit": "m" },
        { id: 70, "name": "Wire Length from AC Machine to Nearest Thermostat", "key": "wireLengthToNearestThermostat", "unit": "m" },
        { id: 71, "name": "Wire Length from AC Machine to Far Thermostat", "key": "wireLengthToFarThermostat", "unit": "m" },
        { id: 1010, "name": "Space Details", "key": "spaceDetails", "unit": "" },
        { id: 72, "name": "Number Of Closed Rooms", "key": "numberOfClosedRooms", "unit": "No's" },
        { id: 73, "name": "Number Of Work Station", "key": "numberOfWorkstations", "unit": "No's" },
        { id: 74, "name": "Number Of Toilet Area", "key": "numberOfToiletAreas", "unit": "No's" },
        { id: 75, "name": "Number Of Wet Pantry Area", "key": "numberOfWetPantryAreas", "unit": "No's" },
        { id: 76, "name": "Office Area (Sqm)", "key": "officeArea", "unit": "m²" },
        { id: 77, "name": "Non Working Area (Sqm)", "key": "nonWorkingArea", "unit": "m²" },
        { id: 78, "name": "Kitchen Area (Sqm)", "key": "kitchenArea", "unit": "m²" },
        { id: 79, "name": "Dinning Area (Sqm)", "key": "diningArea", "unit": "m²" },
        { id: 80, "name": "Toilet Area (Sqm)", "key": "toiletArea", "unit": "m²" },
        { id: 81, "name": "Display Area (Sqm)", "key": "displayArea", "unit": "m²" },
        { id: 82, "name": "Store Area (Sqm)", "key": "storeArea", "unit": "m²" },
    ];

    // --- NAVIGATION --- Memoize the visible rows to prevent re-calculation on every render
    const visibleRows = useMemo(() =>
        leftRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [leftRows, page, rowsPerPage]
    );

    // --- NAVIGATION --- Memoize the list of focusable rows on the current page
    const focusableRowsOnPage = useMemo(() =>
        visibleRows.filter(row => ![1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010].includes(row.id)),
        [visibleRows]
    );
    
    // --- NAVIGATION --- 2. Create the keydown handler function
    const handleKeyDown = (e, currentKey) => {
        // We only care about ArrowDown, ArrowUp, and Enter
        if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
            return;
        }

        // Prevent default behavior (like page scrolling or form submission on Enter)
        e.preventDefault();

        // Find the index of the current input within our focusable list
        const currentIndex = focusableRowsOnPage.findIndex(row => row.key === currentKey);

        if (currentIndex === -1) return; // Should not happen

        let nextIndex;

        if (e.key === 'ArrowDown' || e.key === 'Enter') {
            nextIndex = currentIndex + 1;
        } else { // ArrowUp
            nextIndex = currentIndex - 1;
        }

        // Check if the next index is within the bounds of our visible, focusable rows
        if (nextIndex >= 0 && nextIndex < focusableRowsOnPage.length) {
            const nextItemKey = focusableRowsOnPage[nextIndex].key;
            const nextInput = inputRefs.current[nextItemKey];
            
            // If the next input element exists in our refs, focus it
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    return (
        <Box sx={{ fontFamily: "Arial, sans-serif", margin: 1, height: "100vh", paddingTop: "0px" }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ marginRight: "10px" }}>Update</Button>
                <Button variant="contained" color="secondary" onClick={handleReset}>Reset</Button>
            </form>

            <Paper>
                <TableContainer sx={{
                    maxHeight: 780,
                    overflowY: "auto",
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                    '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' }
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#4CAF50", height: "30px", position: "sticky", top: 0, zIndex: 2 }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "70px", textAlign: "center", backgroundColor: "#4CAF50" }}>Sl No</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "auto", textAlign: "center", backgroundColor: "#4CAF50" }}>Description</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center", backgroundColor: "#4CAF50" }}>Input</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "80px", textAlign: "center", backgroundColor: "#4CAF50" }}>Unit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* --- NAVIGATION --- Use the memoized 'visibleRows' for mapping */}
                            {visibleRows.map((item) => {
                                    const isDescriptionOnly = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010].includes(item.id);

                                    return (
                                        <TableRow key={item.id} sx={{ height: "30px" }}>
                                            <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>
                                                {isDescriptionOnly ? "" : item.id}
                                            </TableCell>
                                            <TableCell sx={{ py: 0.5, fontSize: "0.8rem" }}>
                                                {isDescriptionOnly ? (
                                                    <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                                        {item.name}
                                                    </span>
                                                ) : (
                                                    item.name
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ py: 0.5, textAlign: "center" }}>
                                                {isDescriptionOnly ? ("")
                                                    : item.key === "location" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)} // --- NAVIGATION --- 3. Add ref
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)} // --- NAVIGATION --- 4. Add onKeyDown handler
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {locations.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "workType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {workTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "buildingType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {buildingTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "electricalScope" || item.key === "hvacScope" || item.key === "plumbingScope" || item.key === "flsScope" || item.key === "bmsScope" || item.key === "mepPreliminary" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {yesornos.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "floorType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {floorTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "lightControlPoint" || item.key === "lightControlSensor" || item.key === "lightControlOverrideSwitch" || item.key === "serverRoom" || item.key === "vav" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {needs.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "closedCeilingConduitType" || item.key === "openCeilingConduitType" || item.key === "highLevelDataConduitType" || item.key === "isolatorConduitType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {pvcgis.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "acUnitType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {acUnitTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "chilledWaterPipeInsulationType" || item.key === "giDuctInsulationType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {chilledWaterPipeInsulationTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "valvePackageType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {valvePackageTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "acDuctType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {acDuctTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "giDuctConnectionType" ? (
                                                        <select
                                                            ref={(el) => (inputRefs.current[item.key] = el)}
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)}
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            style={inputStyle}
                                                        >
                                                            {giDuctConnectionTypes.map((type) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    ) : item.key === "voidHeight" || item.key === "netArea" ? (
                                                        <Box
                                                            component="div"
                                                            sx={{
                                                                ...inputStyle,
                                                                border: '1px solid #ccc',
                                                                backgroundColor: '#f0f0f0',
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: '22px', 
                                                                boxSizing: 'border-box',
                                                                cursor: 'not-allowed'
                                                            }}
                                                        >
                                                            {oQuantities[item.key] && !isNaN(parseFloat(oQuantities[item.key]))
                                                                ? parseFloat(oQuantities[item.key]).toFixed(2)
                                                                : "0.00"}
                                                        </Box>
                                                    ) : (
                                                        <input
                                                            ref={(el) => (inputRefs.current[item.key] = el)} // --- NAVIGATION --- Add ref
                                                            onKeyDown={(e) => handleKeyDown(e, item.key)} // --- NAVIGATION --- Add onKeyDown handler
                                                            type="text"
                                                            value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                            onChange={(e) => handleInputChange(e, item.key)}
                                                            onBlur={() => {
                                                                setInputValues(prev => ({
                                                                    ...prev,
                                                                    [item.key]: prev[item.key] === "" ? (oQuantities[item.key] || "0") : prev[item.key]
                                                                }));
                                                            }}
                                                            style={inputStyle}
                                                        />
                                                    )}
                                            </TableCell>
                                            <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>
                                                {isDescriptionOnly ? "" : item.unit}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[24, 50, 100]}
                    component="div"
                    count={leftRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Leftpage;