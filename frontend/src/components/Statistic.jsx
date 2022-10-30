import React, { useState } from "react";
import { Link } from "@mui/material";
import { Context } from "../util/store";
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Box, LinearProgress, Alert, Grid, IconButton } from "@mui/material";

const Statistic = ({heading, description, keyHeading, valueHeading, data, initChart}) => {

    const [chartShown, setChartShown] = useState(initChart);
    
    return (
        <Box sx={{marginTop : 6}}>
            <h3>{heading}</h3>
            <Box sx={{width : "85%"}}>
                {description}
            </Box>
            <Grid container sx={{marginTop : 3}}>
                <Grid item xs={11}>
                    {chartShown 
                            ?
                    getChart(data, `${keyHeading}`, `${valueHeading}`)
                            :
                    getGrid(data,`${keyHeading}`, `${valueHeading}`)}
                </Grid>
                <Grid item xs={1}>
                    <Box m={1} sx={{ height : 400 , alignItems : 'center', display : 'flex'}}>
                        <IconButton color="primary" aria-label="switch view" onClick={() => setChartShown(x => !x)}>
                            <SyncAltIcon/>
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

const getGrid = (data, keyHeading, valueHeading) => {
    const columns = [
        { field : 'id', headerName : keyHeading, minWidth : 600},
        { field : valueHeading, headerName : valueHeading, minWidth : 500},
    ]
    const rows = [];
    for(const item in data) {
        let curr = {};
        curr['id'] = item;
        curr[valueHeading] = data[item];
        rows.push(curr);
    }
    return (
        <Box m={2} sx={{ height : 400, width: '90%' }}>
            <DataGrid rows={rows} columns={columns} />
        </Box>
    )
}

const getChart = (data, keyHeading, valueHeading) => {
    let chartData = [];
    for(const item in data) {
        let curr = {};
        curr['name'] = item;
        curr[valueHeading] = data[item];
        chartData.push(curr);
    }
    return (
        <Box m={1} sx={{width : "90%"}}>
            <BarChart width={1200} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={valueHeading} fill="#8884d8" />
            </BarChart>
        </Box>
    )
}

export default Statistic;