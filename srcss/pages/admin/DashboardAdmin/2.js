import React from 'react'
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import * as moment from 'moment'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PaymentIcon from '@material-ui/icons/Payment';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DnsIcon from '@material-ui/icons/Dns';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Header from "../HeaderAdmin/Header";
export default function DashboardAdmin() {
    return(
        <div>
            <Header/>
        <div>
          <center >
        <h1>Dashboard</h1>
        </center>
        </div>
        <br />   <br />
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/Inscription" style={{ letterSpacing:2, backgroundColor: "#0E0D47",height:'100px', witdh:'100px' }}>
    {/* Gestion des Inscriptions */} <AssignmentIndIcon />  
      </Button>
      <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/paiement" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des paiements*/}  <PaymentIcon />  
      </Button>
      </div>
      <br />   <br />
<div style={{display:'flex',justifyContent:'space-evenly'}}>
      <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/emploies" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des emploies */}  <AccessTimeIcon />  
      </Button>
      <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/branches" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des profs */} <TouchAppIcon />  
      </Button>
      </div>
      <br />   <br />
      <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/cycles" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des assuidités  */}  <RecordVoiceOverIcon />  
      </Button> 
      <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/classes" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des classes */}  <DashboardIcon />  
      </Button> 
      </div>
      <br />   <br />
      <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/mati%C3%A9res" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des matiéres */}   <DnsIcon />  
      </Button>
      <Button variant="contained" color="primary"  href="http://localhost:3000/#/admin/conges" style={{ letterSpacing:4,  backgroundColor: "#0E0D47",height:'100px', witdh:'100px'}}>
    {/* Gestion des Congés  */}  <CalendarTodayIcon />  
      </Button>
      </div>
        </div>
    )
}