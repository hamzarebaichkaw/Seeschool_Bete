import React , { useState, useEffect }from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import axios from "axios";
// data
import mock from "../../dashboard/mock";
import Newss from './NewsWidget';

export default function Notification() {
  const classes = useStyles();
  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Notfication/1`)
      .then(res => {
        seCoursM(res.data)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  return (
<div>

    <div>
    {/* { 
    CoursM.map(

      (m)=>( 
    
    <div style={{backgroundColor:'#CCFFCC', border: 'thick double #32a1ce',}} >
      <p> <NotificationsActiveIcon />
        {m.Message}
        </p>
   
   
        <br />
    <nr />
    </div>
  
      ))
} */}
   <Grid item xs={12} sm={12} md={12} lg={12}>
    <Widget 
              className={classes.widgetLayout}
              title="News"
            >
              <Newss />
            </Widget>
          </Grid>
  </div>
  </div>
  );
}
