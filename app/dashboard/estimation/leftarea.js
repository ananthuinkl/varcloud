"use client";

import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const locations = ["Abu_Dhabi", "Dubai", "Sharjah", "Ajman", "UAQ", "RAK", "Fujairah", "Al_Ain"]; 
const clientTypes = ["Existing", "New_fitout", "New_Wo_Ref"];
const workTypes = ["Refurbishment", "New_W_Ref", "Construction", "Demolation"];
const buildingTypes = ["Office_L_Bdgt", "Office_M_Bdgt", "Office_H_Class", "Restaurant", "Ware_House", "Shop", "Sports_&_GYM", "Mall", "Villa", "Lab", "Hospital"];
const yesornos = ["Yes", "No"];
const floorTypes = ["Raised", "Screed"];
const timeAvailabilitys = ["Less_Time", "Moderate_Time", "Huge_Time"];
const workTimes = ["Day", "Night", "Day_&_Night"];
const weathers = ["Summer", "Winter", "Normal"];
const siteAccessibilitys = ["Easy", "Managable", "Long"];
const projectPrograms = ["Sm_Prjct_ST", "Sm_Prjct_LT", "Md_Prjct_ST","Md_Prjct_LT", "Bg_Prjct_ST", "Bg_Prjct_LT"];
const needs = ["Need", "No_Need"];
const pvcgis = ["PVC", "G.I."];
const acUnitTypes = ["Chw_Type", "DX_Type", "VRF_Type"];
const chilledWaterPipeInsulationTypes = ["XLPE", "NBR", "Glass_Wool"];
const valvePackageTypes = ["3-Way", "PICV"];
const acDuctTypes = ["P.I.", "G.I."];
const giDuctConnectionTypes = ["Gasket", "Cleat"];

const Lestpage = () => {
    const [inputValues, setInputValues] = useState({});
    const [oQuantities, setOQuantities] = useState({});  

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

    const leftRows = [
        { id: 1, name: "Location", key: "location", unit: "" },
        { id: 2, name: "Type of Client", key: "clientType", unit: "" },
        { id: 3, name: "Type of work", key: "workType", unit: "" },
        { id: 4, name: "Type of Building", key: "buildingType", unit: "" },
        { id: 5, name: "Electrical Scope", key: "electricalScope", unit: "" },
        { id: 6, name: "HVAC Scope", key: "hvacScope", unit: "" },
        { id: 7, name: "Plumbing Scope", key: "plumbingScope", unit: "" },
        { id: 8, name: "FLS Scope", key: "flsScope", unit: "" },
        { id: 9, name: "BMS Scope", key: "bmsScope", unit: "" },
        { id: 10, name: "MEP Preliminary", key: "mepPreliminary", unit: "" },
        { id: 11, name: "Area (Sqm) - Net Closed Ceiling", key: "netClosedCeilingArea", unit: "m²" },
        { id: 12, name: "Area (Sqm) - Net Open Ceiling", key: "netOpenCeilingArea", unit: "m²" },
        { id: 13, name: "Area (Sqm) - Toilet", key: "toiletArea", unit: "m²" },
        { id: 14, name: "Area (Sqm) - Kitchen", key: "kitchenArea", unit: "m²" },
        { id: 15, name: "Area (Sqm) - Dining", key: "diningArea", unit: "m²" },
        { id: 16, name: "Slab Height (m)", key: "slabHeight", unit: "m" },
        { id: 17, name: "Void Height (m)", key: "voidHeight", unit: "m" },
        { id: 18, name: "Floor Type", key: "floorType", unit: "" },
        { id: 19, name: "Time availability for planning, procuring & Bargain Price", key: "timeAvailability", unit: "" },
        { id: 20, name: "Work Time", key: "workTime", unit: "" },
        { id: 21, name: "Weather", key: "weather", unit: "" },
        { id: 22, name: "Site accessibility", key: "siteAccessibility", unit: "" },
        { id: 23, name: "Project Program for Volume Job", key: "projectProgram", unit: "" },
        { id: 24, name: "Light Control Point", key: "lightControlPoint", unit: "" },
        { id: 25, name: "Light Control Motion Sensor and Occupancy Sensor", key: "lightControlSensor", unit: "" },
        { id: 26, name: "Light Control Override Switch", key: "lightControlOverrideSwitch", unit: "" },
        { id: 27, name: "Type Of Conduits at Closed Ceiling Area", key: "closedCeilingConduitType", unit: "" },
        { id: 28, name: "Type Of Conduits at Open Ceiling Area", key: "openCeilingConduitType", unit: "" },
        { id: 29, name: "Floor Box-Percentage of Sharing Work Station", key: "floorBoxSharingPercentage", unit: "%" },
        { id: 30, name: "Server Room", key: "serverRoom", unit: "" },
        { id: 31, name: "Type Of Conduits for High Level Data Point", key: "highLevelDataConduitType", unit: "" },
        { id: 32, name: "Type Of Conduits for 3ph 20A/32A Isolator", key: "isolatorConduitType", unit: "" },
        { id: 33, name: "Type Of AC unit", key: "acUnitType", unit: "" },
        { id: 34, name: "Type Of Chilled Water Pipe Insulation", key: "chilledWaterPipeInsulationType", unit: "" },
        { id: 35, name: "Type Of Valve Package", key: "valvePackageType", unit: "" },
        { id: 36, name: "Type Of AC Duct", key: "acDuctType", unit: "" },
        { id: 37, name: "Type Of G.I. Duct Insulation", key: "giDuctInsulationType", unit: "" },
        { id: 38, name: "Type Of G.I. Duct Connection", key: "giDuctConnectionType", unit: "" },
        { id: 39, name: "Percentage usage of square diffuser", key: "squareDiffuserUsagePercentage", unit: "%" },
        { id: 1001, name: "Light Point Input", key: "lightPointInput", unit: "" },
        { id: 40, name: "Number Of Light Points at 1 Circuit", key: "lightPointsPerCircuit", unit: "No's" },
        { id: 41, name: "Conduit Length from Trunking to First Light Point", key: "conduitLengthToFirstLightPoint", unit: "m" },
        { id: 42, name: "Wire Length from DB to First Light Point", key: "wireLengthToFirstLightPoint", unit: "m" },
        { id: 43, name: "Wire Length from DB to Last Light Point", key: "wireLengthToLastLightPoint", unit: "m" },
        { id: 44, name: "Length between Light Point", key: "lengthBetweenLightPoints", unit: "m" },
        { id: 1002, name: "Light Control Point Input", key: "lightControlPointInput", unit: "" },
        { id: 45, name: "Number Of Light Points at 1 Circuit", key: "lightControlPointsPerCircuit", unit: "No's" },
        { id: 46, name: "Conduit Length from Trunking to First Light Point", key: "conduitLengthToFirstLightControlPoint", unit: "m" },
        { id: 47, name: "Wire Length from LCP to First Light Point", key: "wireLengthToFirstLightControlPoint", unit: "m" },
        { id: 48, name: "Wire Length from LCP to Last Light Point", key: "wireLengthToLastLightControlPoint", unit: "m" },
        { id: 1003, name: "Light Switch Point Input", key: "lightSwitchPointInput", unit: "" },
        { id: 49, name: "Conduit Length from Trunking to Switch Point", key: "conduitLengthToSwitchPoint", unit: "m" },
        { id: 50, name: "Wire Length from DB to Switch Point", key: "wireLengthToSwitchPoint", unit: "m" },
        { id: 1004, name: "Low Level Wiring Device", key: "lowLevelWiringDevice", unit: "" },
        { id: 51, name: "Conduit Length from Trunking/DB to First Wiring Devices", key: "conduitLengthToFirstWiringDevice", unit: "m" },
        { id: 52, name: "Wire Length from DB to First Wiring Devices", key: "wireLengthToFirstWiringDevice", unit: "m" },
        { id: 53, name: "Wire Length from DB to Last Wiring Devices", key: "wireLengthToLastWiringDevice", unit: "m" },
        { id: 54, name: "Mounting Height of Wiring Devices", key: "wiringDeviceMountingHeight", unit: "m" },
        { id: 55, name: "Length Between Wiring Devices", key: "lengthBetweenWiringDevices", unit: "m" },
        { id: 56, name: "Length of flexible conduits required", key: "flexibleConduitLength", unit: "m" },
        { id: 57, name: "Conduit Length from Trunking/DB to First Floor Box", key: "conduitLengthToFirstFloorBox", unit: "m" },
        { id: 58, name: "Wire Length from DB to First Floor Box", key: "wireLengthToFirstFloorBox", unit: "m" },
        { id: 59, name: "Wire Length from DB to Last Floor Box", key: "wireLengthToLastFloorBox", unit: "m" },
        { id: 60, name: "Length Between Floor Box", key: "lengthBetweenFloorBoxes", unit: "m" },
        { id: 1005, name: "High Level Wiring Device", key: "highLevelWiringDevice", unit: "" },
        { id: 61, name: "Conduit Length from Trunking/DB to First Wiring Devices", key: "conduitLengthToFirstHighLevelWiringDevice", unit: "m" },
        { id: 62, name: "Wire Length from DB to First Wiring Devices", key: "wireLengthToFirstHighLevelWiringDevice", unit: "m" },
        { id: 63, name: "Wire Length from DB to Last Wiring Devices", key: "wireLengthToLastHighLevelWiringDevice", unit: "m" },
        { id: 64, name: "Length Between Wiring Devices", key: "lengthBetweenHighLevelWiringDevices", unit: "m" },
        { id: 1006, name: "Three Phase Power Outlet/Isolator", key: "threePhasePowerOutlet", unit: "" },
        { id: 65, name: "Conduit Length from Trunking/DB to 3-Phase Power Outlet", key: "conduitLengthToThreePhaseOutlet", unit: "m" },
        { id: 66, name: "Wire Length from DB to 3-Phase Power Outlet", key: "wireLengthToThreePhaseOutlet", unit: "m" },
        { id: 1007, name: "Data Point Input", key: "dataPointInput", unit: "" },
        { id: 67, name: "Conduit Length from Server/Tray to Nearest Data Point- LL", key: "conduitLengthToNearestLowLevelDataPoint", unit: "m" },
        { id: 68, name: "Conduit Length from Server/Tray to Far Data Point-LL", key: "conduitLengthToFarLowLevelDataPoint", unit: "m" },
        { id: 69, name: "Conduit Length from Server/Tray to Nearest Data Point-HL", key: "conduitLengthToNearestHighLevelDataPoint", unit: "m" },
        { id: 70, name: "Conduit Length from Server/Tray to Far Data Point-HL", key: "conduitLengthToFarHighLevelDataPoint", unit: "m" },
        { id: 1008, name: "BMS Point Input", key: "bmsPointInput", unit: "" },
        { id: 71, name: "Total Number Of BMS Point", key: "totalBmsPoints", unit: "No's" },
        { id: 72, name: "Conduit Length from Server/Tray to Nearest BMS Point", key: "conduitLengthToNearestBmsPoint", unit: "m" },
        { id: 73, name: "Conduit Length from Server/Tray to Far BMS Point", key: "conduitLengthToFarBmsPoint", unit: "m" },
        { id: 74, name: "Cable Length from Server/Tray to Nearest BMS Point", key: "cableLengthToNearestBmsPoint", unit: "m" },
        { id: 75, name: "Cable Length from Server/Tray to Far BMS Point", key: "cableLengthToFarBmsPoint", unit: "m" },
        { id: 1009, name: "Thermostat Point Input", key: "thermostatPointInput", unit: "" },
        { id: 76, name: "Conduit Length from AC Machine to Average Thermostat", key: "conduitLengthToAverageThermostat", unit: "m" },
        { id: 77, name: "Wire Length from AC Machine to Nearest Thermostat", key: "wireLengthToNearestThermostat", unit: "m" },
        { id: 78, name: "Wire Length from AC Machine to Far Thermostat", key: "wireLengthToFarThermostat", unit: "m" },
        { id: 79, name: "Closed Ceiling CFM", key: "closedCeilingCFM", unit: "CFM" },
        { id: 80, name: "Open Ceiling CFM", key: "openCeilingCFM", unit: "CFM" }
    ];

    return (
        <Box sx={{ fontFamily: "Arial, sans-serif", margin: 1, height: "100vh", paddingTop: "0px" }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>

            <TableContainer component={Paper} sx={{ maxHeight: 830, overflowY: "auto",
                      '&::-webkit-scrollbar': { width: '8px' },
                      '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
                      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                      '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' } }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#4CAF50", height: "30px", position: "sticky", top: 0, zIndex: 2 }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "70px", textAlign: "center", backgroundColor: "#4CAF50" }}>Sl No</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "auto", textAlign: "center", backgroundColor: "#4CAF50" }}>Description</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center", backgroundColor: "#4CAF50" }}>Input</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "100px", textAlign: "center", backgroundColor: "#4CAF50" }}>Quantity</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", py: 0.5, width: "60px", textAlign: "center", backgroundColor: "#4CAF50" }}>Unit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leftRows.map((item) => {
                            const isDescriptionOnly = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009].includes(item.id);

                            return (
                                <TableRow key={item.id} sx={{ height: "30px" }}>
                                    <TableCell sx={{ py: 0.5, textAlign: "center" , fontSize: "0.8rem" }}>
                                        {isDescriptionOnly ? "" : item.id}
                                    </TableCell>
                                    <TableCell sx={{ py: 0.5 , fontSize: "0.8rem" }}>
                                        {isDescriptionOnly ? (
                                            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                                {item.name}
                                            </span>
                                        ) : (
                                            item.name
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ py: 0.5, textAlign: "center" }}>
                                        {isDescriptionOnly ? (
                                            ""
                                        ) : item.key === "location" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {locations.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "clientType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {clientTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "workType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {workTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "buildingType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {buildingTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "electricalScope"|| item.key === "hvacScope" || item.key === "plumbingScope" || item.key === "flsScope" || item.key === "bmsScope" || item.key === "mepPreliminary"? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {yesornos.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "floorType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {floorTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "timeAvailability" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {timeAvailabilitys.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "workTime" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {workTimes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "weather" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {weathers.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "siteAccessibility" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {siteAccessibilitys.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "projectProgram" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {projectPrograms.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "lightControlPoint" || item.key === "lightControlSensor" || item.key === "lightControlOverrideSwitch" || item.key === "serverRoom"? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {needs.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "closedCeilingConduitType" || item.key === "openCeilingConduitType" || item.key === "highLevelDataConduitType" || item.key === "isolatorConduitType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {pvcgis.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "acUnitType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {acUnitTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "chilledWaterPipeInsulationType" || item.key === "giDuctInsulationType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {chilledWaterPipeInsulationTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "valvePackageType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {valvePackageTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "acDuctType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {acDuctTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : item.key === "giDuctConnectionType" ? (
                                            <select
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""}
                                                onChange={(e) => handleInputChange(e, item.key)}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }}
                                            >
                                                {giDuctConnectionTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        )
                                        : (
                                            <input 
                                                type="text" 
                                                value={inputValues[item.key] !== undefined ? inputValues[item.key] : oQuantities[item.key] || ""} 
                                                onChange={(e) => handleInputChange(e, item.key)} 
                                                onBlur={() => {
                                                    setInputValues(prev => ({
                                                        ...prev,
                                                        [item.key]: prev[item.key] === "" ? (oQuantities[item.key] || "0") : prev[item.key]
                                                    }));
                                                }}
                                                style={{ padding: '2px', width: '100px', textAlign: "center", fontSize: "0.75rem"  }} 
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem" }}>
                                        {isDescriptionOnly ? "" : oQuantities[item.key] || "0"}
                                    </TableCell>
                                    <TableCell sx={{ py: 0.5, textAlign: "center", fontSize: "0.8rem"  }}>
                                        {isDescriptionOnly ? "" : item.unit}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Lestpage;