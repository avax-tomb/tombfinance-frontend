import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';
import brandLogo from '../../assets/img/brand.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    padding: '10px 150px',
    marginBottom: '3rem',
    backgroundColor: '#FFFFFF',
    filter: 'drop-shadow(14px 8px 27px rgba(28, 130, 66, 0.16))'
  },
  mobileAppBar: {
    padding: '10px',
    marginBottom: '3rem',
    backgroundColor: '#FFFFFF',
    filter: 'drop-shadow(14px 8px 27px rgba(28, 130, 66, 0.16))'
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 'unset'
  },
  toolbarTitle: {
    // fontFamily: '"Amarante", cursive',
    fontSize: '30px',
    // flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#209FD2',
    fontSize: '18px',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    '& img': {
      height: '42px'
    }
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className={matches ? classes.appBar : classes.mobileAppBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Link to="/" color="inherit" className={classes.brandLink}>
              <img src={brandLogo} alt="brand" />
            </Link>
            <Box mr={5}>
              <Link color="textPrimary" to="/" className={classes.link}>
                Home
              </Link>
              <Link color="textPrimary" to="/cemetery" className={classes.link}>
                Cemetery
              </Link>
              <Link color="textPrimary" to="/masonry" className={classes.link}>
                Masonry
              </Link>
              <Link color="textPrimary" to="/pit" className={classes.link}>
                Pit
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link>
              <a href="https://docs.ranch.finance" className={classes.link}>
                Docs
              </a>
            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" color="inherit" className={classes.brandLink}>
              <img src={brandLogo} alt="brand" />
            </Link>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Cemetery" to="/cemetery" />
                <ListItemLink primary="Masonry" to="/masonry" />
                <ListItemLink primary="Pit" to="/pit" />
                <ListItemLink primary="Regulations" to="/regulations" />
                <ListItem button component="a" href="https://docs.ranch.finance">
                  <ListItemText>Docs</ListItemText>
                </ListItem>
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
