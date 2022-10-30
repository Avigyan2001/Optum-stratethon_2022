import React, { useContext, useState } from 'react';
import './App.css';
import ContextWrapper, { Context } from './util/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import About from './components/About';
import Login from './components/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple, orange } from '@mui/material/colors';
import Dashboard from './components/Dashboard';
import { logout } from './util/auth';
import Profile from './components/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});


function App() {

	const {location, setLocation} = useContext(Context);
	const [anchorEl, setAnchorEl] = useState(null);
	
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};

	const router = (location) => {
		if(location === 'about') {
			return <About />
		} else if (location === 'dashboard') {
			return <Dashboard />
		} else if (location === 'profile') {
			return <Profile />
		} else if (location === 'login') {
			return <Login />
		}
	}
	
	return (
		<>
		{/* <ThemeProvider theme={theme}> */}
			<AppBar position="static">
				<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Optum Stratethon
				</Typography>
				{['dashboard','profile'].includes(location) ? (
					<div>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => {
							setLocation('profile');
							setAnchorEl(null);
						}}>
							Profile
						</MenuItem>
						<MenuItem onClick={() => {
							setLocation('dashboard');
							setAnchorEl(null);
						}}>
							Dashboard
						</MenuItem>
						<MenuItem onClick={() => {
							logout();
							setLocation('about');
							setAnchorEl(null);
						}}>
							Logout
						</MenuItem>
					</Menu>
					</div>
				) : 
				(
					<Button color="inherit" onClick={() => {
						setLocation(location === 'login' ? 'about' : 'login');
					}}>
						{location === 'login' ? 'About' : 'Login'}
					</Button>
				)}
				</Toolbar>
			</AppBar>
			{router(location)}
		{/* </ThemeProvider> */}
		</>
	);
}

export default App;