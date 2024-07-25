import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from '../utils/vikesplace_logo_v2.png';

const pages = [
  { name: 'View Listings', path: '/view-listings' },
  { name: 'Create Listing', path: '/create-listing' },
  { name: 'Manage Listings', path: '/manage-listings' },
  { name: 'Messages', path: '/messages' },
  { name: 'Charity Events', path: '/view-charities' }
];
const settings = ['User Profile', 'Logout'];


function NavBar() {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pathWithoutParams = location.pathname.split("/")[1];
  const showButtons = pathWithoutParams === 'home' || pathWithoutParams === 'view-listings' || pathWithoutParams === 'create-listing' ||
    pathWithoutParams === 'manage-listings' || pathWithoutParams === 'listings' || pathWithoutParams === 'edit-listing' || pathWithoutParams === 'view-reviews' ||
    pathWithoutParams === 'create-review'   || pathWithoutParams === 'messages' || pathWithoutParams === 'message-history' || pathWithoutParams === 'history' || 
    pathWithoutParams === 'user-profile' || pathWithoutParams === 'view-charities' || pathWithoutParams === 'charities' ;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        
          {showButtons &&(
            <>  
              <div className="logo">
                <Link to="/home">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/home"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                VikesPlace
              </Typography>
            </>
          )}

          {!showButtons &&(
            <>  
              <div className="logo">
                <Link to="/login">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/login"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                VikesPlace
              </Typography>
            </>
          )}

          {showButtons && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
            </>
          )}

          {showButtons && (
              <>
          <div>
            <IconButton
              size="large"
              aria-label="account menu of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                setting === 'Logout' ? (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to="/login">
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ) : 
                setting === 'User Profile' ? (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to="/user-profile">
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ) :
                (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                )
              ))}
            </Menu>
          </div>
          </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;


