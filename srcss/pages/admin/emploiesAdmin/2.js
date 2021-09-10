
import React, { useState, useEffect } from "react"; 
import { Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell, } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { withStyles, useTheme } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
// components
import Widget from "../../../components/Widget/Widget";
// import Table from "../../dashboard/components/Table/Table";
// data
import mock from "../../dashboard/mock";
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import * as moment from 'moment'
import {Form} from 'react-bootstrap';
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// const [mat, setmat] =  
export default function Emploie() {
  const classes = useStyles();
 
  const [mat, setmat] =useState([]);
  function  reg  ( id ) {
   
   const d= sessionStorage.getItem('user_id')
    axios
    
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/EmploieAdmin/${id}`)
      .then(res => {
     setmat(res.data)
    console.log( res.data)
      }, 2000)
  } 
  return (
<div>
   <h1>Gestion des emploies </h1>
 <div style={{backgroundColor:'',}}>
         <br />
         <div style={{display:'flex', justifyContent:'space-evenly', }}>
     
 
  <Button  style={{backgroundColor: "#0E0D47",}}
  color="primary"
  variant="contained"
  className={classes.button}
  //  onClick={reg(2)} 
>
Classe
</Button>
   
       <br />
       <br />
        <Button  style={{backgroundColor: "#0E0D47",}}
  color="primary"
  variant="contained"
  className={classes.button}
  // onClick={ reg(1)} 
>
Professeur
</Button>
         </div>
         <br />
         <br />
         <br />
         <Form.Control as="select">
         {
mat.map(
  (m)=>( 


    <option  >  {m.nom} </option>
   )) }
  </Form.Control>
  <br />
         <br />
         <br />
         <br />
         <br />
         <br />
  <button  style={{height:'500px', width:'1210px', textAlign:'center', backgroundImage:'url()'}}  >   <CloudUploadIcon  /> 
    <Form.File style={{}} id="exampleFormControlFile2" label=" "  />
   </button>
     
          </div>
          </div>
  );
}