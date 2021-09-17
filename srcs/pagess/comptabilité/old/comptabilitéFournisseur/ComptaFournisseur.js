import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { Grid,  Box } from "@material-ui/core";
    import MUIDataTable from "mui-datatables";
    import axios from "axios";
    import { CircularProgress } from "../../../components/Wrappers"
    import AddCircleIcon from '@material-ui/icons/AddCircle';
    import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ReactApexChart from './DonutCharts'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/styles';
import {Select,MenuItem} from '@material-ui/core'
import PieChartIcon from '@material-ui/icons/PieChart';
import TocIcon from '@material-ui/icons/Toc';
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
  const useStyless = makeStyles({
    flexGrow: {
      flex: '1',
    },
    button: {
      fontSize: 20,
      width: 250,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      
      
      backgroundColor: "#ba181b",
      color: "#F6F7FF",
      alignSelf: 'center',
      '&:hover': {
        fontSize: 20,
              width: 250,
              alignItems: 'center',
              justifyContent: 'space-evenly',
             
              
             backgroundColor: "#dc3545",
              color: "#F6F7FF",
              alignSelf: 'center'
    },
  }})

  const Text = () =>
  <div  >
   <ReactApexChart />
   </div>;
const [types, setTypes] = useState([
  { id: 1, type: 'Canitie' },
  { id: 2, type: 'Transport' },
  { id: 3, type: 'Sanitaire' },
  { id: 4, type: 'Imprimerie' },
  { id: 5, type: 'Autre' },
])

const Table = () =>
<div  >
<Grid container spacing={4}>

 
  
        <Grid item xs={12}>
          
     
          <MUIDataTable
            title="Gestion des fournisseurs"
        data={  mat}
            columns={[
              {name: "id", label: "ID"},
              {name: "Fornisseur", label: "Fournisseur"},
              {name: "produit", label: "Produit"},
              {name: "Quantite", label: "QuantitÃ©"},
              {name: "Prix", label: "Prix"},
              {name: "date_Order", label: "Date d'order"},
              {name: "Status", label: "Status"},
              {name: "", label: "Actions"},
            ]}
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
const classes = useStyless();
const [type, setType] = useState('')

    return(
<div>
  
    
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <h1>Gestion des Fournisseurs</h1>
    <div style={{ justifyContent : "flex-end",float:"right"  }}>
    
    <Button  className={classes.button} variant="contained" color="primary" href="http://localhost:3000/#/comptabilite/addfournisseur" >
        <AddShoppingCartIcon style={{width:'80px', height:'50px'}} />      Fournisseur 
      </Button>
   
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      
      
      <Button  className={classes.button} variant="contained" color="primary" href="http://localhost:3000/#/comptabilite/addproduit" >
       <TransferWithinAStationIcon  style={{width:'80px', height:'50px'}}  />    Produit
      </Button>
     
      </div>
        </div>
        <br/><br/><br/><br/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ fontSize: 20 }}>Type:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 850, height: 20, marginBottom: 80 }}
                      value={type}
                      onChange={e => {
                        
                        setType(e.target.value)
                        reg()
                       setShowTable(true) 
                        // if (type === "Primaire" || type === "Secondaire")
                        // getNumerosNiveau(e.target.value)
                      }}
                    >
                      {
                        types.map((n) =>
                         
                            <MenuItem value={n.id} key={n.id}>
                              {n.type}
                            </MenuItem> 
                        )
                      }
                    </Select>
                  </div>
                </div>
    
    
    <br />    <br />    <br />
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
    

    </div>
   
    <br />
    <br />
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
  

    
    
    </div>
    {/* <Donut /> */}
    {showText ? 
    <div >
   <div style={{ justifyContent : "flex-end",float:"right" }}>
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
     onClick={()=>{{reg()};
             setShowTable(!showTable) 
             setShowText(null)
     }}
   >  <TocIcon/> Tableau 
   </Button> 
   
     
   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    
     onClick={()=>{
      setShowTable(null) 
      setShowText(!showText)}
    
    }
   > <PieChartIcon/> Chart
   </Button>
      </div>


     <Text />
     </div> : null}
    {showTable ?
    <>
      <div style={{ justifyContent : "flex-end",float:"right" }}>
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
     onClick={()=>{{reg()};
             setShowTable(!showTable) 
             setShowText(null)
     }}
   > <TocIcon/> Tableau 
   </Button> 
   
   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      
      
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    
     onClick={()=>{
      setShowTable(null) 
      setShowText(!showText)}
    
    }
   > <PieChartIcon/> Chart
   </Button>
      </div>

    <Table /> 
    </>
    
    
    : null}
             <br />
         <br />
         <div>
   
         </div>
</div>



    )
}