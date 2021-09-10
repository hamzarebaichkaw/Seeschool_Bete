import React, { useState, useEffect } from "react"; 
import { Grid  } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
 
import axios from "axios";
 
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
 
export default function CongesAdmin() {
  const classes = useStyles();
  const [CoursM, seCoursM] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(function () {
    getStats()
  }, [])
    
    
    const getStats = async () => {
    const d= sessionStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/CongeByProf`)
      .then(res => {
        seCoursM(res.data)
          console.log(res.data)
      }, 2000)
     

      setIsLoading(false)

  } ;
  const [mat, setmat] =useState([]);
 
  return (
    <div>
<div style={{display:'flex', justifyContent:'space-between'}}>
   <h1>Gestion des Congés </h1>
      </div>
 <div style={{backgroundColor:'',}}>
         <br />
         <div style={{display:'flex', justifyContent:'space-between', }}>
        
         </div>
         <br />
         <br />
         <br />
         <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des Congés"
            data={ CoursM }
            columns={[    "Monsieur/Madame",
            "maladie","Début","Fin","Status" 
          ]}
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
         
          </div>
          </div>
  );
}