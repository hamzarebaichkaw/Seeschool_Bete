import React, { useState, useEffect } from 'react'
import {
  Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { Badge, Typography } from "../../../components/Wrappers/Wrappers";
import {
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import ToDo from '../../../pages/profile/Components/ToDo';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import Donut from '../../../pages/profile/Components/DonutChart';
// data
import mock from "../../dashboard/mock";
import Calendar from '../../profile/Components/Calendar/Calendar';
import Box from '@material-ui/core/Box'
import Newss from './NewsWidget';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from "axios";
export default function Homework() {
  const [otpdata] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])

  const [selectedMatiere, setSelectedMatiere] = useState()
  const [Mat, setMat] = useState([])
  const [work,setwork] = useState ([])
  const [isloading,setIsLoading]  = useState(false)

  useEffect(function () {
    
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .then(res => {
        setMat(res.data.result)
         console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);

  useEffect(function () {
    var inter = []
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/1/1`)
      .then(res => {
        res.data.map((e)=> 
        {
           if (e.type ==="home_work") {
              inter.push(e)
           }
           setIsLoading(false)
        })

   setwork(inter)
   console.log(inter)
    // console.log( res.data)
      }
    )
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  



  function allwork () {
    setIsLoading(true)
    
   const d = localStorage.getItem('user_id')
    var inter = []
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/1`)
      .then(res => {
          res.data.map((e)=> 
          {
             if (e.type ==="home_work") {
                inter.push(e)
             }
             setIsLoading(false)
          })

     setwork(inter)
     console.log(inter)
      // console.log( res.data)
        }
      )
    }
  function  reg  ( id ) {
    setIsLoading(true)
    console.log( id)
   const d = localStorage.getItem('user_id')
    var inter = []
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .then(res => {
          res.data.map((e)=> 
          {
             if (e.type ==="home_work") {
                inter.push(e)
             }
             setIsLoading(false)
          })

     setwork(inter)
     console.log(inter)
      // console.log( res.data)
      }, 2000)
  
      
  }


  const classes = useStyles();
  return (
    <div>
      <h1>Homework</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} lg={4} style={{ marginRight: 30 }}>
          <Widget
            title="Nouvelles tâches"
            bodyClass={classes.widgetBody}
            widgetWithDropdown
          >
            <ToDo />
          </Widget>
        </Grid>

        <Grid item xs={12} lg={4} style={{ marginRight: 30 }}>
          <Widget
            title="Expiration Bientôt"
            bodyClass={classes.widgetBody}
            widgetWithDropdown
          >
            <ToDo />
          </Widget>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Widget>
            <Calendar />
          </Widget>
        </Grid>


      </div>
      <br />
      <br />
      <br />

      <Grid item xs={12} item justify={'center'} container>
        <Widget>
         
            <div style={{ position: 'left' }} >
              <p style={{ fontSize: 15, }} >Choisissez une matière</p>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 250, height: 20, marginBottom: 25 }}
                defaultValue="ALL"
                value={selectedMatiere}
                onChange={e => {
                  if (e.target.value ==="ALL")   {
                    allwork()
                  }
                  else {
                  setSelectedMatiere(e.target.value)
                  reg(e.target.value)
                }
                }}
              >
                <MenuItem value="ALL" >
                      ALL
                    </MenuItem>
                {
                  Mat.map((n) =>

                    
                    <MenuItem value={n.id} key={n.id}>
                      {n.matieress}
                    </MenuItem>
                  )
                }
              </Select>
              <Newss data={work} />
            </div>
                
      
          
        </Widget>
      </Grid>
    </div>
  );
}
