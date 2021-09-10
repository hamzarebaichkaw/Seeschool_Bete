import React, { useState, useEffect } from 'react';
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import { Grid, Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell, } from "@material-ui/core";
    import MUIDataTable from "mui-datatables";
    import axios from "axios";
import Donut from './DonutCharts';
import ReactApexChart from './DonutCharts'
export default function ComptaFournisseur() {
  const [mat, setmat] =useState([]);
  function  reg  (  ) {
   const d= sessionStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/FornisseurAdmin`)
      .then(res => {
     setmat(res.data)
      }, 2000)
  } 
  const [CoursM, seCoursM] = useState([]);
  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ChartFornisseurAdmin`)
      .then(res => {
        seCoursM(res.data)
          console.log(res.data)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);


    return(
<div>
    <h1>Gestion des Fournisseurs</h1>
    <br />
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
    <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Cantine
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Transport
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Sanitaire
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Imprimerie
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Autre
   </Button> 

    </div>
   
    <br />
    <br />
    <div style={{display:'flex', justifyContent:'space-evenly'}}>


    <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
     onClick={()=>{reg()}} 
   > Tableau
   </Button> 
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    // onClick={ }
   > Charte
   </Button> 
    </div>
    {/* <Donut /> */}
    <ReactApexChart />
             <br />
         <br />
         <div>
         <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des fournisseurs"
        data={  mat}
            columns={[ "id","Fornisseur", "produit","Quantite", "Prix", "date_Order", "Status", "Actions"]}
            options={{
              filterType: "checkbox"
            }}
          />
        </Grid>
      </Grid>
         </div>
</div>



    )
}