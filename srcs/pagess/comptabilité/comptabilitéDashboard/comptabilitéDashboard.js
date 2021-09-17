import React from 'react'
import ReactApexChart from '../comptabilitéFournisseur/DonutCharts'
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
 import Chart from '../comptabilitéPaiement/DonutCharts';
import Charts from '../comptabilitéFacture/DonutCharts';
export default function ComptaDashboard() {
    return(
       <div>
           <center>
            {/* <h1 style={{border:'solid',backgroundColor:'black', color:'white',borderRadius:'50px',width:'550px'}}>Dashboard comptabilite</h1> */}
            </center>
            <br />
            <br />
            <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/fournisseur" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px',width:'550px'}}>
      Gestion des fournisseurs
       </Button> 
       <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/paiement" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px',width:'550px'}}>
      Gestion de paiement
       </Button>
       </div>
       <br /> <br />
       <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/factures" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px',width:'550px'}}>
      Gestion des factures
       </Button>
       <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/commande" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px',width:'550px'}}>
      Bon de commande
       </Button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div style={{display:'flex',justifyContent:'space-around'}}>
<ReactApexChart style={{height:'100'}} />
<Chart />
<Charts />
            </div>
       </div>
    )
}