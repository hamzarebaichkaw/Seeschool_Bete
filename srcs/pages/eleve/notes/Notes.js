import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetAppIcon from '@material-ui/icons/GetApp';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import { Form } from 'react-bootstrap';
import { CircularProgress } from "../../../components/Wrappers";
// data
import mock from "../../dashboard/mock";
import axios from "axios";
const datatableData = [
  ["Math ", "Example Inc.", "Yonkers", "NY"],
  ["Physique", "Example Inc.", "Hartford", "CT"],
  ["Francais", "Example Inc.", "Tampa", "FL"],
  ["Anglais", "Example Inc.", "Dallas", "TX"],
  ["Sport", "Example Inc.", "Hartford", "CT"],
  
];

export default function Notes() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [moy,setmoy] = useState(0)




  const [CoursM, seCoursM] = useState([]);
  const [may,setmay] = useState(0);
  const [maycolor,setmayColor] = useState("");
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    var ph =0
    var cof = 0
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Note/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Note/${d}`)
      .then(res => {
        seCoursM(res.data )
        console.log(res.data)
        res.data.map((e)=> {
          ph = ph + (( parseInt(e["Controle 1"]) +parseInt( e.Partique)  +(2 * parseInt(e["Controle 2"]) ) ) / 4 ) * parseInt( e.Coefficient)
          cof += parseInt(e.Coefficient)
          

        } )
        setmay((ph / cof).toFixed(2))
        if (ph / cof < 10) {setmayColor("#dc3545")}
        else if (ph / cof < 15) {setmayColor("#ffc107")}
        else {setmayColor("#28a745")}
        
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
     
  }, []);


  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Notes"
           
            // data={ CoursM.map((m)=>( m.matiere))}
            data={ CoursM }
            columns={[ 
              {name: "matiere", label: "Matière"},
              {name: "Controle 1", label: "Contrôle 1"},
              {name: "Controle 2", label: "synthèse"},
              {name: "Partique", label: "Pratique"},
              {name: "Remaque", label: "Remarque"},
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
      <br/>
      <div style={{ justifyContent: "flex-end", float: "right" }}>
            <Button style={{ backgroundColor: "#536dfe", width: '250px' }}
              color="primary"
              variant="contained"
              onClick={() => {
                
              }}
            >
               <GetAppIcon/>
            </Button>


            &nbsp; &nbsp;

            <Button style={{ backgroundColor: maycolor, width: '250px' }}
              color={maycolor}
              variant="contained"
              
            >
               Moyen :  {may} / 20
            </Button>
          </div>
      <br />
      

    </>
  );
}
