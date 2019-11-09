import * as React from "react";
import { IProps } from "../scripts/common/base";
import {
  useTheme,
  makeStyles,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { flexbox } from "@material-ui/system";

import MessageList from './MessageList';
import PrescriptionList from './PrescriptionList';

export interface IOnlineConsultationDetails extends IProps {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  consultatioDetails: {
    display: "flex",
    paddingRight: 24,
    paddingLeft: 24,
    justifyContent: "space-evenly"
  },
  consultatioDetailsPaper: {
    paddingRight: 24,
    paddingLeft: 24
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-OnlineConsultations-${index}`}
      aria-labelledby={`full-width-tab-OnlineConsultations-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-OnlineConsultations-${index}`,
    "aria-controls": `full-width-tabpanel-OnlineConsultations-${index}`
  };
}

export default function OnlineConsultaionDetails(
  props: IOnlineConsultationDetails
) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <Typography variant="h6" color="primary">
              {"Consultation details"}
            </Typography>
          </Toolbar>
          <div className={classes.consultatioDetails}>
            <div className={classes.consultatioDetailsPaper}>
              <Typography variant="h5" component="h2">
                Patient information
              </Typography>
              <Typography component="p">Date</Typography>
              <Typography component="p">Doctor name</Typography>
            </div>
            <div className={classes.consultatioDetailsPaper}>
              <Typography variant="h5" component="h2">
                Doctor information
              </Typography>
              <Typography component="p">Date</Typography>
              <Typography component="p">Doctor name</Typography>
              <Typography component="p">Date</Typography>
              <Typography component="p">Doctor name</Typography>
              <Typography component="p">Date</Typography>
              <Typography component="p">Doctor name</Typography>
            </div>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="Consultations details"
          >
            <Tab label="Prescription" {...a11yProps(0)} />
            <Tab label="Messages" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={"x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir="ltr">
            <PrescriptionList />
          </TabPanel>
          <TabPanel value={value} index={1} dir="ltr">
            <MessageList />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Container>
  );
}
