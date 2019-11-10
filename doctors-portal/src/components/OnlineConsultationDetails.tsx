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
  Box,
  Tabs,
  Tab,
  Badge
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import MessageList from "./MessageList";
import PrescriptionList from "./PrescriptionList";
import OnlineConsultationServices from "../services/onlineConsultationServices";
import IOnlineConsultationListItem from "../dataDefinitions/onlineConsultationListItem";
import { getMessages } from "../utils/onlineConsultationUtils";
import { classes } from "istanbul-lib-coverage";

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
  },
  inline: {
    display: "inline"
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  box: {
    maxHeight: 600
  }
  
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Typography
      component="div"
      role="tabpanel"
      className={classes.box}
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
  const consultationId = props.match.params.id;

  const [consultationDetails, setConsultationDetails] = React.useState(
    {
      user: {},
      doctor_notes: {},
      messages: [],
      documents: [],
      adjustments: [],
      payments: []
    } as IOnlineConsultationListItem
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const getprescriptionData = () => {
    if (consultationDetails.doctor_notes.prescription_data) {
      return consultationDetails.doctor_notes.prescription_data;
    } else return [];
  };

  const renderTypography = (key: string, value: string) => {
    return(
      <div>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          {key + ': '}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textSecondary"
        >
          {value}
        </Typography>
      </div>
    );
  }

  React.useEffect(() => {
    OnlineConsultationServices.getOnlineConsultaionDetails(consultationId)
      .then((results: IOnlineConsultationListItem) => {
        console.log("Fetched the consultation details");
        return results;
      })
      .then((details: IOnlineConsultationListItem) => {
        setConsultationDetails(details);
      })
      .catch(() => {
        console.log("Failed to fetch on-going online consultation list");
      });
  }, []);

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
              {renderTypography("Consultation ID", consultationDetails.customer_consultation_id)}
              {renderTypography("Date", new Date(consultationDetails.requested_time).toDateString())}
              {renderTypography("Doctor", "Unknown")}
            </div>
            <div className={classes.consultatioDetailsPaper}>
              {renderTypography("Patient name", consultationDetails.user.first_name + ' ' + consultationDetails.user.last_name)}
              {renderTypography("Status", consultationDetails.user.status)}
              {renderTypography("Gender", consultationDetails.user.gender)}
              {renderTypography("Phone number", consultationDetails.user.phone_number)}
            </div>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="Consultations details"
          >
            <Tab label={
              <Badge className={classes.padding} color="primary" badgeContent={getprescriptionData().length}>
                {"Prescription"}
              </Badge>
              }
             {...a11yProps(0)} />
            <Tab label={
              <Badge className={classes.padding} color="primary" badgeContent={consultationDetails.messages.length}>
                {"Messages"}
              </Badge>
              }
             {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={"x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir="ltr">
            <PrescriptionList prescriptionList={getprescriptionData()} />
          </TabPanel>
          <TabPanel value={value} index={1} dir="ltr">
            <MessageList
              messages={getMessages(consultationDetails.messages || [])}
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Container>
  );
}
