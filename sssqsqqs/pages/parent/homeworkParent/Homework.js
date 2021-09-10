import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import ToDo from '../../../pages/profile/Components/ToDo';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import Donut from '../../../pages/profile/Components/DonutChart';
// data
import mock from "../../dashboard/mock";
import Calendar from '../../profile/Components/Calendar/Calendar';
export default function Homework() {
  const classes = useStyles();
  return (
   <div>
     <h1>Homework</h1>
     <div style={{display:'flex', justifyContent:'space-between'}}>
     <Grid item xs={12} lg={4}>
        <Widget
          title="Tasks"
          bodyClass={classes.widgetBody}
          widgetWithDropdown
        >
          <ToDo />
        </Widget>
      </Grid>
   <br />
   <br />
   <br />
     <Grid item xs={12} sm={1} md={6} lg={5}>
            <Widget>
     <Calendar />
     </Widget>
          </Grid>
     </div>
   </div>
  );
}
