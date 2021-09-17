import React, { useState, useEffect } from 'react';
import {  Button } from "../../../components/Wrappers/Wrappers";
import { Grid,  Box } from "@material-ui/core";
    import MUIDataTable from "mui-datatables";
    import axios from "axios";
    import { CircularProgress } from "../../../components/Wrappers"
 
import ReactApexChart from './DonutCharts'
export default function ComptaFournisseur() {
  const [mat, setmat] =useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function  reg  (  ) {
   const d = localStorage.getItem('user_id')
   setIsLoading(true)
   await  axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/FornisseurAdmin`)
      .then(res => {
     setmat(res.data)
      }, 2000)
      setIsLoading(false)
  } 
  
  const [showText, setShowText] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const onClick = () => setShowText(true);
  const onClicktable = () => setShowTable(true);

  const Text = () =>
  <div  >
   <ReactApexChart />
   </div>;


const Table = () =>
<div  >
<Grid container spacing={4}>
 

        <Grid item xs={12}>
     
          <MUIDataTable
            title="Gestion des fournisseurs"
        data={  mat}
            columns={[ "id","Fornisseur", "produit","Quantite", "Prix", "date_Order", "Status", "Actions"]}
            options={{
              filterType: "checkbox",
              textLabels: {
                body: {
                    noMatch:  isLoading ?
                    <CircularProgress />:
                        'Désolé, il n\'y a aucune donnée correspondante à afficher',
                },
            },
            }}
            
          />

        </Grid>
       
      </Grid>
 </div>;


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
     onClick={()=>{{reg()};
             setShowTable(!showTable) 
             setShowText(null)
     }}
   > Tableau
   </Button> 
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    
     onClick={()=>{
      setShowTable(null) 
      setShowText(!showText)}
    
    }
   > Chart
   </Button> 
    </div>
    {/* <Donut /> */}
    {showText ? <Text /> : null}
    {showTable ? <Table /> : null}
             <br />
         <br />
         <div>
   
         </div>
</div>



    )
}