import React , { useState, useEffect } from 'react';

import useStyles from "./styles";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import axios from "axios";

export default function NotificationsProfs(){
    const classes = useStyles();
    const [CoursM, seCoursM] = useState([]);
   
    useEffect(function () {
      const d = localStorage.getItem('user_id')
      axios
        // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
        .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotficationProf/15`)
        .then(res => {
          seCoursM(res.data)
          // console.log(res.data.result)
        }, 2000)
    
        .catch(() => {
          console.log("ERROR")
        });
    }, []);
    return (
  <div>
      <h2>Notifications</h2>
      <div>
      { 
      CoursM.map(
  
        (m)=>( 
      
      <div style={{backgroundColor:'#e2eafc', border: 'thick double #3a86ff',display:'flex', justifyContent:'space-evenly'}} >
        <p> <NotificationsActiveIcon />
          {m.Message}   
          </p>
     <p style={{backgroundColor:'yellow'}}>{m.Status}</p>
     
          <br />
          <br />
      {/* <nr /> */}
      </div>
    
        ))
  }
    </div>
    </div>
    );
  }
  