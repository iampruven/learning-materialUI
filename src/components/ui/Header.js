import React from "react";
import logo from '../../assets/logo.svg';

import {
  AppBar,
  Button,
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
    marginBottom:"3em"
  },
  logo: {
    height:"7em"
  },
  tabContainer:{
    marginLeft:'auto'
  },
  tab:{
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft:"25px" //to keep consistent use px , if want responsive use rem etc.
  },
  button:{
    borderRadius:"50px",
    marginLeft:"50px",
    marginRight:"25px",
    ...theme.typography.estimate,
    height:"45px",
  }
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <img src={logo} className={classes.logo} alt="company logo"/>
            <Tabs className={classes.tabContainer}>
              <Tab className={classes.tab} label="Home" />
              <Tab className={classes.tab} label="Services" />
              <Tab className={classes.tab} label="The Revolution" />
              <Tab className={classes.tab} label="About Us" />
              <Tab className={classes.tab} label="Contact Us" />
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* push out content from under the header */}
      <div className={classes.toolBarMargin} />
    </>
  );
}
