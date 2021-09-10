import React from 'react'
import { Button } from "../../../components/Wrappers/Wrappers";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PaymentIcon from '@material-ui/icons/Payment';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DnsIcon from '@material-ui/icons/Dns';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Header from "../HeaderAdmin/Header";

export default function DashboardAdmin() {
  return (
    <div>
      <Header />
      <div>
        <center >
          <h1>Dashboard</h1>
        </center>
      </div>
      <br />   <br />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/Inscription"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <AssignmentIndIcon style={{width: 50, height: 50}} />
          Gestion des Inscriptions
        </Button>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/paiement"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <PaymentIcon style={{width: 50, height: 50}} />
          Gestion des Paiements
        </Button>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/emploies"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <AccessTimeIcon style={{width: 50, height: 50}} />
          Gestion des Emplois
        </Button>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/branches"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <TouchAppIcon style={{width: 50, height: 50}} />
          Gestion des Professeurs
        </Button>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/cycles"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <RecordVoiceOverIcon style={{width: 50, height: 50}} />
          Gestion des Assiduités
        </Button>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/classes"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <DashboardIcon style={{width: 50, height: 50}} />
          Gestion des Classes
        </Button>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/mati%C3%A9res"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <DnsIcon style={{width: 50, height: 50}} />
          Gestion des Matières
        </Button>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/admin/conges"
          style={{ letterSpacing: 4, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "#0E0D47", height: '200px', width: '400px' }}>
          <CalendarTodayIcon style={{width: 50, height: 50}} />
          Gestion des Congés
        </Button>
      </div>
    </div>
  )
}