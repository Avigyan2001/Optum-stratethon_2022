import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Tab, Tabs, InputLabel, MenuItem, FormControlLabel, Radio, IconButton, Checkbox, Grid, FormControl, Select } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useQuery } from 'react-query';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			hidden={value !== index}
			{...other}
		>
			{value === index && (
				<Box m={2}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const Service = ({ age, gender, location }) => {
	const [value, setValue] = useState(0);
    const [immunizationsLoading, setImmunizationsLoading] = useState(false);
    const [immunizations, setImmunizations] = useState([]);
    const [condition, setCondition] = useState("");
    const [costs, setCosts] = useState(null);

    const {isLoading : isLoadingConditions, error : errorConditions, data : conditions} = useQuery('conditions', () => 
        fetch('http://localhost:8080/users/getConditions').then(res => 
            res.json()
        )
    )

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    useEffect(() => {
        setImmunizationsLoading(true);
        fetch('http://localhost:8080/users/getImmunizations', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                age : age,
                gender : gender
            })
        }).then(res => res.json()).then((res) => {
            setImmunizations(res);
            setImmunizationsLoading(false);
        });
        
    }, []);

    const handleRefresh = () => {
        setImmunizationsLoading(true);
        fetch('http://localhost:8080/users/getImmunizations', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                age : age,
                gender : gender
            })
        }).then(res => res.json()).then((res) => {
            setImmunizations(res);
            setImmunizationsLoading(false);
        });
    }

    useEffect(() => {
        if(condition && condition !== "") {
            fetch('http://localhost:8080/users/predictCosts', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    condition : condition
                })
            }).then(res => res.json()).then((res) => {
                setCosts(res);
            });
        }
    }, [condition])

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: 'background.paper',
				display: 'flex',
				height: 224,
			}}
		>
			<Tabs
				orientation='vertical'
				value={value}
				onChange={handleChange}
				aria-label='Vertical tabs example'
				sx={{ borderRight: 1, borderColor: 'divider' }}
			>
				<Tab label='Recommended Immunizations' {...a11yProps(0)} />
				<Tab label='Treatment Plan' {...a11yProps(1)} />
			</Tabs>
			<TabPanel value={value} index={0}>
                {
                    immunizationsLoading || immunizations.length === 0
                            ?
                    <LinearProgress />
                            :
                    <>
                        <Grid container>
                            <Grid item xs={11}>
                                Based on your age, gender and location the following are the most required immunizations. Please make sure you have availed all of these immunizations :
                                <Box m={2}>
                                    {
                                        immunizations.map(
                                            immunization => (
                                                <Box fullWidth>
                                                    <FormControlLabel control={<Checkbox />} label={immunization} />
                                                </Box>
                                            )
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ marginLeft : 3 }}>
                                    <IconButton color="primary" aria-label="refresh" onClick={handleRefresh}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                }
			</TabPanel>
			<TabPanel value={value} index={1}>
				{
                    isLoadingConditions
                        ?
                    <LinearProgress />
                        :
                    <>
                        <Box m={2}>
                            Choose one of the medical conditions in the options to get estimated cost of treatment and further medication.
                        </Box>
                        <Box m={2}>
                            <FormControl fullWidth>
                                <InputLabel fullWidth id='condition-label'>Medical Condition</InputLabel>
                                <Select
                                    labelId='condition-label'
                                    id='condition'
                                    value={condition}
                                    label='Condition'
                                    onChange={(x) => setCondition(x.target.value)}
                                    fullWidth
                                >
                                    {
                                        conditions.map(
                                            x => (
                                                <MenuItem value={x}>{x}</MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        {
                            condition !== ""
                                &&
                            (
                                <Box m={2}>
                                    {
                                        costs === null
                                            ?
                                        <LinearProgress />
                                            :
                                        <Box>
                                            According to our estimates, the medical procedures would require <b>Rs. {costs.procedure.toFixed(2)}</b> for treatment and another <b>Rs. {costs.medication.toFixed(2)}</b> for further medication. This amounts to a total of <b>Rs. {(costs.medication + costs.procedure).toFixed(2)}</b> in total.
                                        </Box>
                                    }
                                </Box>
                            )
                        }
                    </>
                }
			</TabPanel>
		</Box>
	);
};

export default Service;
