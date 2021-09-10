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
 
import AddCircleIcon from '@material-ui/icons/AddCircle';
 
// const [mat, setmat] =  
export default function MatiereAdmin() {
  const classes = useStyles();
  const [CoursM, seCoursM] = useState([]);
  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        seCoursM(res.data.result)
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  const [mat, setmat] =useState([]);
  function  reg  ( id ) {
    
   const d= sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/MatiereByClass/${id}`)
      .then(res => {
     setmat(res.data)
      // console.log( res.data)
      }, 2000)
  } 
  return (
    <div>
<div style={{display:'flex', justifyContent:'space-between'}}>
   <h1>Gestion des matiéres </h1>
      </div>
 <div style={{backgroundColor:'',}}>
         <br />
         <div style={{display:'flex', justifyContent:'space-between', }}>
           {
CoursM.map(
  (m)=>( 
  <Button style={{backgroundColor: "#0E0D47",}}
  color="primary"
  variant="contained"
  className={classes.button}
  onClick={()=>{reg(m.id)}} 
>
{m.matieress }
</Button>
       )
       ) }
         </div>
         <br />
         <br />
         <div style={{ display:'flex', justifyContent:'center'}}>
         <Button variant="contained" color="secondary" href="http://localhost:3000/#/admin/Addmatiere" style={{backgroundColor:'#9D0208',borderRadius:50, letterSpacing:4,}}>
    Ajouter une matiére  <AddCircleIcon />
      </Button>
         </div>
         <br />
         <br />
         <br />
         <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Listes des matiéres"
            data={ mat }
            columns={[    "matiere","N° Seances", "Professeur","Coefficient",]}
            options={{
              filterType: "checkbox"
            }}
          />
        </Grid>
      </Grid>
          {/* </Widget> */}
          </div>
          </div>
  );
}
 















