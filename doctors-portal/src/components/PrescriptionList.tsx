import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IProps } from "../scripts/common/base";

import { IOCItemPrescriptionData } from "../dataDefinitions/onlineConsultationListItem";
import { Column } from "material-table";
import Table from "./Table";

export interface IPrescriptionList extends IProps {
  prescriptionList: IOCItemPrescriptionData[];
}

export interface ITabPanel {
  children: JSX.Element;
  index: number;
  value: number;
  dir: string;
}



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function PrescriptionList(props: IPrescriptionList) {
  const theme = useTheme();
  const [] = React.useState(0);

  const onRowAdd = (
  ): Promise<void> => {
    alert("row add called: Not implemented yet..");
    return new Promise((resolve, reject) => {
      reject(new Error("Not implemented yet.."));
  });
  };

  const onRowUpdate = (
      ): Promise<void> => {
    alert("row update called: Not implemented yet..");
    return new Promise((resolve, reject) => {
      reject(new Error("Not implemented yet.."));
  });
  };

  const onRowDelete = (
  ): Promise<void> => {
    alert("row delete called: Not implemented yet..");
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        reject(new Error("Not implemented yet.."));
      }, 5000);
  });
  };

  const columns: Array<Column<{}>> = [
    { title: "Product name", field: "product_name" },
    { title: "Frequency unit", field: "frequency_unit" },
    { title: "Frequency value", field: "frequency_value"},
    { title: "Meal labels", field: "frequency_meal_labels" },
    { title: "Time labels", field: "frequency_time_labels" },
    { title: "Dosage quantity unit", field: "dosage_quantity_unit" },
    { title: "dosage quantity value", field: "dosage_quantity_value" }
  ];

  return (
    <Table 
      title={"Prescriptions"}
      isLoading={false}
      columns={columns}
      data={props.prescriptionList}
      onRowClick={null}
      onRowAdd={onRowAdd}
      onRowUpdate={onRowUpdate}
      onRowDelete={onRowDelete}
    />
  );
}
