import React from 'react';
import {Box, Link} from '@mui/material';

const About = () => (
    <Box m={4}>
        <h2>About :</h2>
        <Box sx={{marginTop : 2}}>
            This App is created as part of <Link href="https://unstop.com/competition/optum-stratethon-e-track-optum-stratethon-season-4-optum-409946" underline='hover'>Optum Stratethon 2022 </Link> 
            by <Link href='https://github.com/quantum-shift' underline='hover'>Avigyan Bhattacharya</Link> and <Link href='https://github.com/beedle2017' underline='hover'>Arka Choudhuri</Link>. 
        </Box>
        <Box sx={{marginTop : 10}}>
            <h3>Problem Statement :</h3>
            Create a value-based care model using a consumer health journey to make this an experience-driven model using one of the below use cases:
            <ul>
                <li>Pricing transparency and bring affordability in cost of care for long-term care patients (Chronic care diseases)</li>
                <li>Reducing hospitalization (and re-hospitalization) risk through the early intervention program</li>
            </ul>
            Effective use of consumer feedback and use of the Outcome-based model (NPS Model) to measure the effectiveness of the solution.
            <br/>
            KPIs to be taken into account (if available and applicable) Readmission rate, patient-reported outcomes, and patient experience or engagement.
        </Box>
    </Box>
);

export default About;