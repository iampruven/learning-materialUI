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
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null); //contains services tab
  const [open, setOpen] = useState(false); //menu opened or not
  const [selectedIndex, setSelectedIndex] = useState(0);

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
  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/customsoftware" },
    { name: "Mobile App Development", link: "/mobileapp" },
    { name: "Website Development", link: "/websites" },
  ];
  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  useEffect(() => {

    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case "/customsoftware":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/mobileapp":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "/websites":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      case "/revolution":
        if (value !== 2) {
          setValue(2);
        }
        break;

      case "/about":
        if (value !== 3) {
          setValue(3);
        }
        break;

      case "/contact":
        if (value !== 4) {
          setValue(4);
        }
        break;

      case "/estimate":
        if (value !== 5) {
          setValue(5);
        }
        break;
      default:
        break;
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
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuOptions.map((option, i) => (
                <MenuItem
                  key={i}
                  onClick={(event, i) => {
                    handleMenuItemClick(event, i);
                    setValue(1);
                    handleClose();
                  }}
                  selected={i === selectedIndex && value === 1}
                  classes={{ root: classes.menuItem }}
                  component={Link}
                  to={option.link}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* push out content from under the header */}
      <div className={classes.toolBarMargin} />
    </>
  );
}
