import React, { useContext, useState, useEffect } from "react";
import { Box, FormControl, Grid, Input, InputLabel, LinearProgress, MenuItem, Select, Slider, TextField, Typography, Button, CircularProgress, Alert} from "@mui/material";
import { Context } from "../util/store";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Service from "./Service";

const Profile = () => {

    const {userName} = useContext(Context);
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/users/getDetails', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                userName : userName,
            })
        }).then(res => res.json()).then((res) => {
            setLocation(res.location);
            setGender(res.gender);
            setAge(res.age === null ? null : Number(res.age));
            setLoading(false);
        });
    }, [])

    if(loading) {
        return (
            <Box m={4}>
                <LinearProgress/>
            </Box>
        );
    }

    const handleClick = () => {
        setSaving(true);
        fetch('http://localhost:8080/users/setDetails', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                userName : userName,
                location : location,
                gender : gender,
                age : age
            })
        }).then((res) => {
            setSaving(false);
        })
    }

    return (
        <Box m={4}>
            Hello {userName} ! You can avail some of our services from this page.
            <br/>
            <br/>
            <h3>User Details :</h3>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id='gender-label'>Gender</InputLabel>
                        <Select
                            labelId='gender-label'
                            id='gender'
                            value={gender}
                            label='Gender'
                            onChange={(x) => setGender(x.target.value)}
                        >
                            <MenuItem value='F'>F</MenuItem>
                            <MenuItem value='M'>M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField label='Location' fullWidth value={location} onChange={(x) => setLocation(x.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <Box fullWidth>
                        <Typography id='age-slider' gutterBottom>
                            Age
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <CalendarMonthIcon/>
                            </Grid>
                            <Grid item xs>
                                <Slider
                                    value={typeof age == 'number' ? age : 0}
                                    onChange={(event, newValue) => setAge(newValue)}
                                    aria-labelledby="input-slider"
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    value={age}
                                    size="small"
                                    onChange={(event) => setAge(event.target.value === '' ? '' : Number(event.target.value))}
                                    onBlur={() => {
                                        if(age < 0) {
                                            setAge(0);
                                        } else if (age > 100) {
                                            setAge(100);
                                        }
                                    }}
                                    inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 100,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display : 'flex',  alignItems : 'center', justifyContent : 'center', margin : 20, flexDirection : 'row'}}>
                        <Box m={2}>
                            <Button 
                                variant="outlined"
                                onClick={handleClick}
                            >
                                Save Details
                            </Button>
                        </Box>
                        {saving && <CircularProgress/>}
                    </div>
                </Grid>
            </Grid>
            <h3>Services :</h3>
            {
                (gender && age && location && gender != "" && location != "" && age != "")
                        ?
                <Service age={age} location={location} gender={gender}/>
                        :
                <Alert severity="warning">Please fill out your information to avail our services</Alert>
            } 
        </Box>
    );
}

export default Profile;