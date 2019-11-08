import * as React from 'react';
import { IProps } from '../scripts/common/base';
import { Container, CssBaseline, Toolbar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';

import Table, { ITable } from './Table';
import { Column } from 'material-table';
import AppointmentServices from '../services/appointmentServices';
import getAppointmentListTableData from '../utils/getAppointmentListTableData';
import IAppointmentListItemResponse from '../dataDefinitions/appointmentListItemResponse';

export interface IAppointments extends IProps {
}

export interface ITabPanel {
    children: JSX.Element;
    index: number;
    value: number;
    dir: string;
}

export interface Row {
    appointmentId: string;
    patientName: string;
    status: string;
    date: string;
    doctorName: string;
}

function TabPanel(props: ITabPanel) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-Appointments-${index}`}
            aria-labelledby={`full-width-tab-Appointments-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-Appointments-${index}`,
        'aria-controls': `full-width-tabpanel-Appointments-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Appointments(props: IAppointments) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [value, setValue] = React.useState(0);

    const onRowClick = (event: React.MouseEvent<Element, MouseEvent>, rowData: Row) => {
        alert("Row clicked");
    }

    const columns: Array<Column<Row>> =
    [
        { title: 'Appointment ID', field: 'appointmentId' },
        { title: 'Patient name', field: 'patientName' },
        { title: 'Status', field: 'status' },
        { title: 'Doctor name', field: 'doctorName' },
        { title: 'Date', field: 'date' },
    ];

    const [onGoingTableState, setOnGoingTableState] = React.useState({
        title: 'On-going appointments',
        isLoading: true,
        columns: columns,
        data: [],
        onRowClick: onRowClick
    } as ITable);
    const [historyTableState, setHistoryTableState] = React.useState({
        title: 'Closed appointments',
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
        AppointmentServices.getAppointmentsList()
          .then((results: IAppointmentListItemResponse) => {
            console.log("Fetched the on-going appointment list");
            return getAppointmentListTableData(results);
          })
          .then((data: Row[]) => {
            setOnGoingTableState({
              ...onGoingTableState,
              data: data,
              isLoading: false
            });
          })
          .catch(() => {
            console.log("Failed to fetch on-going appointments list");
          });
    
          AppointmentServices.getAppointmentsDetails("completed,closed")
          .then((results: IAppointmentListItemResponse) => {
            console.log("Fetched the closed appointments list");
            return getAppointmentListTableData(results);
          })
          .then((data: Row[]) => {
            setHistoryTableState({
              ...onGoingTableState,
              data: data,
              isLoading: false
            });
          })
          .catch(() => {
            console.log("Failed to fetch closed appointments list");
          });
      }, []);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="primary">
                            {"Appointments"}
                        </Typography>
                    </Toolbar>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="Appointments list"
                    >
                        <Tab label="On-going" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir='ltr'>
                        <Table {...onGoingTableState}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir='ltr'>
                        <Table {...historyTableState}/>
                    </TabPanel>
                </SwipeableViews>
            </div>
        </Container>
    );
}