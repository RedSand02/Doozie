import * as React from "react";
import { IProps } from "../scripts/common/base";
import { Container, CssBaseline, Toolbar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/styles";
import SwipeableViews from "react-swipeable-views";

import Table, { ITable } from "./Table";
import { Column } from "material-table";
import OnlineConsultationServices from "../services/onlineConsultationServices";
import IOnlineConsultationListResponse from "../dataDefinitions/onlineConsultationListResponse";
import getOCListTableData from "../utils/getOCListTableData";

export interface IOnlineConsultations extends IProps {}

export interface ITabPanel {
  children: JSX.Element;
  index: number;
  value: number;
  dir: string;
}

export interface Row {
  name: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  consultationId: string;
}

function TabPanel(props: ITabPanel) {
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function OnlineConsultations(props: IOnlineConsultations) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [value, setValue] = React.useState(0);

  const onRowClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    rowData: Row
  ) => {
    props.history.push('/Onlineconsultaiondetails/' + rowData.consultationId);
  };

  const columns: Array<Column<Row>> = [
    { title: "Name", field: "name" },
    { title: "Status", field: "status" },
    { title: "Date of birth", field: "dateOfBirth", type: "date" },
    { title: "Gender", field: "gender" },
    { title: "Phone number", field: "phoneNumber" }
  ];

  const [onGoingTableState, setOnGoingTableState] = React.useState({
    title: "On-going consultations",
    isLoading: true,
    columns: columns,
    data: [],
    onRowClick: onRowClick
  } as ITable);
  const [historyTableState, setHistoryTableState] = React.useState({
    title: "Closed consultations",
    isLoading: true,
    columns: columns,
    data: [],
    onRowClick: onRowClick
  } as ITable);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  React.useEffect(() => {
    OnlineConsultationServices.getOnlineConsultaionsList()
      .then((results: IOnlineConsultationListResponse) => {
        console.log("Fetched the on-going online consultation list");
        return getOCListTableData(results);
      })
      .then((data: Row[]) => {
        setOnGoingTableState({
          ...onGoingTableState,
          data: data,
          isLoading: false
        });
      })
      .catch(() => {
        console.log("Failed to fetch on-going online consultation list");
      });

    OnlineConsultationServices.getOnlineConsultaionsList("completed,closed")
      .then((results: IOnlineConsultationListResponse) => {
        console.log("Fetched the closed online consultation list");
        return getOCListTableData(results);
      })
      .then((data: Row[]) => {
        setHistoryTableState({
          ...historyTableState,
          data: data,
          isLoading: false
        });
      })
      .catch(() => {
        console.log("Failed to fetch closed online consultation list");
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <Typography variant="h6" color="primary">
              {"Online consultations"}
            </Typography>
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="Online consultations list"
          >
            <Tab label="On-going" {...a11yProps(0)} />
            <Tab label="History" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={"x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir="ltr">
            <Table {...onGoingTableState} />
          </TabPanel>
          <TabPanel value={value} index={1} dir="ltr">
            <Table {...historyTableState} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Container>
  );
}
