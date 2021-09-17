import React from 'react';
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import AddTodo from './ToDoadd';
// import ToDo from '../../../pages/profile/Components/ToDo';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import Donut from '../../../pages/profile/Components/DonutChart';
// data
import mock from "../../dashboard/mock";
import Calendar from '../../profile/Components/Calendar/Calendar';

export default function HomeworksProfs(){
  const classes = useStyles();
return(
    <div>
        <h1> Home Work</h1>
        <br />
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <Button  
  style={{backgroundColor: "#3a86ff",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
 
  
>
Bac Maths
</Button>
<Button  
  style={{backgroundColor: "#faa307",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
 
  
>
3éme Maths
</Button>
<Button  
  style={{backgroundColor: "#dc2f02",borderRadius:'20px', letterSpacing:5,height:'50px'}}
  color="primary"
  variant="contained"
 
  
>
3éme technique
</Button>
<Button  
  style={{backgroundColor: "#ffd60a",borderRadius:'20px', letterSpacing:5,height:'50px'}}
  color="primary"
  variant="contained"
 
  
>
1ére
</Button>

        </div>
        <br />
        <br />
<div style={{display:'flex', justifyContent:'space-between'}}>
        <Grid item xs={12} lg={4}>
        <Widget
          title="Tasks"
          bodyClass={classes.widgetBody}
          widgetWithDropdown
        >
          <AddTodo />
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
)}