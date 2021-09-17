import React from 'react'
import ReactApexChart from '../comptabilitéFournisseur/DonutCharts'
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
 import Chart from '../comptabilitéPaiement/DonutCharts';
import Charts from '../comptabilitéFacture/DonutCharts';
export default function ComptaDashboard() {
    return(
       <div>
           <center>
            <h1>Dashboard</h1>
            </center>
            <br />
            <br />
            <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/fournisseur" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px'}}>
      Gestion des fournisseurs
       </Button> 
       <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/paiement" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px'}}>
      Gestion de paiement
       </Button>
        <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/factures" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px'}}>
      Gestion des factures
       </Button>
       <Button variant="contained" color="secondary" href="http://localhost:3000/#/comptabilite/commande" style={{borderRadius:'20px', letterSpacing:5,backgroundColor:'#BA181B',height:'90px'}}>
      Bon de commande
       </Button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div style={{display:'flex',justifyContent:'space-evenly'}}>
<ReactApexChart style={{height:'100'}} />
<Chart />
<Charts />
            </div>
       </div>
    )
}