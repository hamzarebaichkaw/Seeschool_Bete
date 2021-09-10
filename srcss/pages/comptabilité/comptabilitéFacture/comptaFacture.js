import React, { useState, useEffect } from 'react';
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import { Grid, Box  } from "@material-ui/core";
    import MUIDataTable from "mui-datatables";
    import axios from "axios";
 
import { CircularProgress } from "../../../components/Wrappers"
import ReactApexChart from './DonutCharts'

export default function ComptaFacture() {
  const [mat, setmat] =useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async  function  reg  (  ) {
   const d= sessionStorage.getItem('user_id')
   setIsLoading(true)
   await    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/FactureCompt`)
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
                    title="Gestion des Factures"
               data={mat}
                    columns={[ "Order ID","Fornisseur", "Total TTC","Quantite",  "date de paiement", "Status", "Actions"]}
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
            <h1>Gestion des Factures</h1>
            <br />
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <Button style={{backgroundColor: "#ba181b",width:'150px'}}
             color="primary"
             variant="contained"
             onClick={()=>{{reg()};
             setShowTable(!showTable) 
             setShowText(null)
     }}
           > tableau
           </Button> 
           <Button style={{backgroundColor: "grey",width:'150px'}}
             color="primary"
             variant="contained"
            
            onClick={()=>{
              setShowTable(null) 
              setShowText(!showText)}
            
            }
           > chart
           </Button> 
        
            </div>
           
            <br />
            <br />
         
            {showText ? <Text /> : null}
    {showTable ? <Table /> : null}
          
                     <br />
                 <br />
                 <div>
               
                 </div>
        </div>
        
        
        
            )
        }