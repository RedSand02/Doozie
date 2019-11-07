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

export interface IHospitalBookings extends IProps {
}

export interface ITabPanel {
    children: JSX.Element;
    index: number;
    value: number;
    dir: string;
}

export interface Row {
    patientName: string;
    status: string;
    date: string;
    doctorName: string;
    bookingId: string;
}

function TabPanel(props: ITabPanel) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-HospitalBookings-${index}`}
            aria-labelledby={`full-width-tab-HospitalBookings-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-HospitalBookings-${index}`,
        'aria-controls': `full-width-tabpanel-HospitalBookings-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function HospitalBookings(props: IHospitalBookings) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [value, setValue] = React.useState(0);

    const onRowClick = (event: React.MouseEvent<Element, MouseEvent>, rowData: Row) => {
        alert("Row clicked");
    }

    const columns: Array<Column<Row>> =
    [
        { title: 'Booking ID', field: 'bookingId' },
        { title: 'Patient name', field: 'patientName' },
        { title: 'Status', field: 'status' },
        { title: 'Date', field: 'date' },
        { title: 'Doctor name', field: 'doctorName' },
    ];

    const [onGoingTableState, setOnGoingTableState] = React.useState({
        title: 'On-going Hospital bookings',
        isLoading: true,
        columns: columns,
        data: [],
        onRowClick: onRowClick
    } as ITable);
    const [historyTableState, setHistoryTableState] = React.useState({
        title: 'Closed Hospital bookings',
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

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="primary">
                            {"Hospital bookings"}
                        </Typography>
                    </Toolbar>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="Hospital bookings list"
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