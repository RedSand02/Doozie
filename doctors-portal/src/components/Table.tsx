import * as React from 'react';
import MaterialTable, { Column } from 'material-table';
import { MuiThemeProvider, useTheme } from '@material-ui/core';

export interface TableState {
    columns: Array<Column<{}>>;
    data: {}[];
}

export interface ITable {
    title: string;
    isLoading: boolean;
    columns: Array<Column<{}>>;
    data: {}[];
    onRowClick: (event: React.MouseEvent<Element, MouseEvent>, rowData: {}) => {};
}

export default function Table(props: ITable) {
    const theme = useTheme();

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title={props.title}
                isLoading={props.isLoading}
                columns={props.columns}
                data={props.data}
                onRowClick={props.onRowClick}
                options={{ paging: false }}
            />
        </MuiThemeProvider>
    );
}