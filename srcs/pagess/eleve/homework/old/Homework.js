import React, { useState, useEffect } from 'react'
import {
  Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { Badge, Typography } from "../../../components/Wrappers/Wrappers";
import {
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
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
import Box from '@material-ui/core/Box'
import Newss from './NewsWidget';
import { Multiselect } from 'multiselect-react-dropdown';
export default function Homework() {
  const [otpdata] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])

  const [selectedMatiere, setSelectedMatiere] = useState()


  const classes = useStyles();
  return (
    <div>
      <h1>Homework</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} lg={4} style={{ marginRight: 30 }}>
          <Widget
            title="Nouvelles tâches"
            bodyClass={classes.widgetBody}
            widgetWithDropdown
          >
            <ToDo />
          </Widget>
        </Grid>

        <Grid item xs={12} lg={4} style={{ marginRight: 30 }}>
          <Widget
            title="Expiration Bientôt"
            bodyClass={classes.widgetBody}
            widgetWithDropdown
          >
            <ToDo />
          </Widget>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Widget>
            <Calendar />
          </Widget>
        </Grid>


      </div>
      <br />
      <br />
      <br />

      <Grid item xs={12}>
        <Widget>
          <Grid item container>
            <div style={{ position: 'left' }} >
              <p style={{ fontSize: 15, }} >Choisissez une matière</p>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 250, height: 20, marginBottom: 25 }}
                value={selectedMatiere}
                onChange={e => {
                  setSelectedMatiere(e.target.value)
                }}
              >
                {
                  otpdata.map((n) =>

                    <MenuItem value={n.type} key={n.id}>
                      {n.type}
                    </MenuItem>
                  )
                }
              </Select>
            </div>

            <Grid>
              <Newss />
            </Grid>
          </Grid>
        </Widget>
      </Grid>
    </div>
  );
}
