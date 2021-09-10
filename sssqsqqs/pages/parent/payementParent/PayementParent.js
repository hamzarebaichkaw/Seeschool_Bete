import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// components
import Widget from "../../../components/Widget/Widget";
import Table from "../../dashboard/components/Table/Table";
import { Form } from 'react-bootstrap';
// data
import mock from "../../dashboard/mock";
import axios from "axios";
const datatableData = [
  ["Math ", "Example Inc.", "Yonkers", "NY"],
  ["Physique", "Example Inc.", "Hartford", "CT"],
  ["Francais", "Example Inc.", "Tampa", "FL"],
  ["Anglais", "Example Inc.", "Dallas", "TX"],
  ["Sport", "Example Inc.", "Hartford", "CT"],
  
];

export default function Payement() {
  const classes = useStyles();



  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Paiment/1`)
     
      .then(res => {
        seCoursM(res.data )
       console.log(res.data )
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Notes"
           
            // data={ CoursM.map((m)=>( m.matiere))}
            data={ CoursM }
            columns={[ "ID", "Type", "Montant","date","Etat"]}
            options={{
              filterType: "checkbox"
            }}
          />
        </Grid>
       
      </Grid>


    </>
  );
}
