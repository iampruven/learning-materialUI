import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Toolbar,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "8em",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px", //to keep consistent use px , if want responsive use rem etc.
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    ...theme.typography.estimate,
    height: "45px",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null); //contains services tab
  const [open, setOpen] = useState(false); //menu opened or not
  const handleChange = (e, value) => {
    setValue(value);
  };
  const handleClick = (e) => {
    //where we clicked on screen
    setAnchorEl(e.currentTarget); //element that has just been clicked on
    setOpen(true);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };
  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/estimate" && value !== 5) {
      setValue(5);
    }
  }, [value]); //only run when the value changes
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              disableRipple
              className={classes.logoContainer}
              component={Link}
              to="/"
            >
              <img
                onClick={() => setValue(0)}
                src={logo}
                className={classes.logo}
                alt="company logo"
              />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              className={classes.tabContainer}
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={Link}
                to="/"
              />
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                onMouseOver={(event) => handleClick(event)}
                className={classes.tab}
                label="Services"
                component={Link}
                to="/services"
              />
              <Tab
                className={classes.tab}
                label="The Revolution"
                component={Link}
                to="/revolution"
              />
              <Tab
                className={classes.tab}
                label="About Us"
                component={Link}
                to="/about"
              />
              <Tab
                className={classes.tab}
                label="Contact Us"
                component={Link}
                to="/contact"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
               <MenuItem onClick={()=>{handleClose(); setValue(1)}} component={Link} to="/services">
                Services
              </MenuItem>
              <MenuItem onClick={()=>{handleClose(); setValue(1)}} component={Link} to="/customsoftware">
                Custom Software Development
              </MenuItem>
              <MenuItem component={Link} to="/mobileapp" onClick={()=>{handleClose(); setValue(1)}}>Mobile App Development</MenuItem>
              <MenuItem component={Link} to="/websites" onClick={()=>{handleClose(); setValue(1)}}>Website Development</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* push out content from under the header */}
      <div className={classes.toolBarMargin} />
    </>
  );
}
