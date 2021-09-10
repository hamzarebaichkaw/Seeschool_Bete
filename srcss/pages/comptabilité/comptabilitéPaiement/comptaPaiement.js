import React, { useState, useEffect } from 'react'
import {  Button  } from "../../../components/Wrappers/Wrappers";
import { Grid,  } from "@material-ui/core";
    import MUIDataTable from "mui-datatables";
    import axios from "axios";
    import { CircularProgress } from "../../../components/Wrappers"
 
import ReactApexChart from './DonutCharts'

export default function ComptaPaiement() {
  const [isLoading, setIsLoading] = useState(true);
  const [mat, setmat] =useState([]);
  async function  reg  (  ) {
   const d= sessionStorage.getItem('user_id')
   setIsLoading(true)
   await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/PaimentCompt`)
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
            title="Gestion de paiement"
         data={  mat}
            columns={[ "id","Montant", "date de paiment","Status" ]}
            options={{
              filterType: "checkbox",
              textLabels: {
                body: {
                    noMatch:  isLoading ?
                    <CircularProgress />:
                        'Sorry, there is no matching data to display',
                },
            },
            }}
          />
        </Grid>
      </Grid>
 </div>;
    
    return(
    
    <div>
         <h1>Gestion de Paiement</h1>
         <br />
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
    <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Etudiant
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Professeur
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Ouvriers
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Autre charge
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
         {/* <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion de paiement"
         data={  mat}
            columns={[ "id","Montant", "date de paiment","Status" ]}
            options={{
              filterType: "checkbox"
            }}
          />
        </Grid>
      </Grid> */}
         </div>
    </div>
     
    )
}