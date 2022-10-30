import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Box, LinearProgress, Alert, Grid, IconButton } from "@mui/material";
import Statistic from "./Statistic";

const Dashboard = () => {

    const {isLoading : isLoadingAllergies, error : errorAllergies, data : dataAllergies} = useQuery('allergies', () => 
        fetch('http://localhost:8080/dashboard/allergies').then(res => 
            res.json()
        )
    )
    const {isLoading : isLoadingDevices, error : errorDevices, data : dataDevices} = useQuery('devices', () => 
        fetch('http://localhost:8080/dashboard/devices').then(res => 
            res.json()
        )
    )
    const {isLoading : isLoadingImmunizations, error : errorImmunizations, data : dataImmunizations} = useQuery('immunizations', () => 
        fetch('http://localhost:8080/dashboard/immunizations').then(res => 
            res.json()
        )
    )
    const {isLoading : isLoadingMedications, error : errorMedications, data : dataMedications} = useQuery('medications', () => 
        fetch('http://localhost:8080/dashboard/medications').then(res => 
            res.json()
        )
    )
    const {isLoading : isLoadingProcedures, error : errorProcedures, data : dataProcedures} = useQuery('procedures', () => 
        fetch('http://localhost:8080/dashboard/procedures').then(res => 
            res.json()
        )
    )

    if(isLoadingAllergies || isLoadingDevices || isLoadingImmunizations || isLoadingMedications || isLoadingProcedures) {
        return (
            <Box m={4}>
                <LinearProgress/>
            </Box>
        );
    } else if (errorAllergies || errorDevices || errorImmunizations || errorMedications || errorProcedures) {
        return (
            <Box m={4}>
                <Alert severity="error">
                    Oops! Some error occurred. Please check your internet connection.
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <Box m={4}>
                Welcome to the Dashboard! Here you can see up to date information about various health facilities.
                <br/>
                <br/>
                <Statistic
                    heading={"Allergies :"}
                    description={"Some of the most common allergies noted in nearby hospitals are shown below."}
                    keyHeading={"Allergy"}
                    valueHeading={"Reported Cases"}
                    data={dataAllergies}
                    initChart={true}
                />
                <Statistic
                    heading={"Medical Devices :"}
                    description={"Modern medical devices for treating and monitoring conditions have become incresingly prevalant. Some of the most common devices used by patients in nearby hospitals are displayed."}
                    keyHeading={"Medical Device"}
                    valueHeading={"Purchases"}
                    data={dataDevices}
                    initChart={false}
                />
                <Statistic
                    heading={"Immunizations :"}
                    description={"Immunizations popular in your neighbourhood during the past few months are displayed."}
                    keyHeading={"Immunization"}
                    valueHeading={"Applied Doses"}
                    data={dataImmunizations}
                    initChart={true}
                />
                <Statistic
                    heading={"Medication Costs :"}
                    description={"Average cost of medication in your neighbourhood is displayed in the chart below."}
                    keyHeading={"Medication"}
                    valueHeading={"Average Cost"}
                    data={dataMedications}
                    initChart={false}
                />
                <Statistic
                    heading={"Medical Procedure Costs :"}
                    description={"The average cost of performing certain medical procedures in your area is shown below."}
                    keyHeading={"Medical Procedure"}
                    valueHeading={"Average Cost"}
                    data={dataProcedures}
                    initChart={false}
                />
            </Box>
        </>
    );
}

export default Dashboard;