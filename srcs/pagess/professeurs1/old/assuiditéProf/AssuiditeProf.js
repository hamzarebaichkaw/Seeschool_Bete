import React, {useState} from 'react';
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import useStyles from "./styles";
import {
    Grid,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Paper
  } from "@material-ui/core";
   
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
  import MUIDataTable from "mui-datatables";
export default function AssuiditeProf(){
    const [isLoading, setIsLoading] = useState(true);
return(
    <div>
        <h1>Gestion d'assuidité</h1>
        <br />
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <Button  
  style={{backgroundColor: "#3a86ff",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
 
  
>
Bac Maths
</Button>
<Button  
  style={{backgroundColor: "#faa307",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
 
  
>
3éme Maths
</Button>
<Button  
  style={{backgroundColor: "#dc2f02",borderRadius:'20px', letterSpacing:5,height:'50px'}}
  color="primary"
  variant="contained"
 
  
>
3éme technique
</Button>
<Button  
  style={{backgroundColor: "#ffd60a",borderRadius:'20px', letterSpacing:5,height:'50px'}}
  color="primary"
  variant="contained"
 
  
>
1ére
</Button>

        </div>
        <br />
        <br />
        <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des Assuidités"
           // data={ CoursM }
            columns={[    "Nom & Prenom","Present", "Absent"
             
          ]}
            options={{
              filterType: "checkbox",
              textLabels: {
                body: {
               //     noMatch:  isLoading ?
               //     <CircularProgress />:
                 
               //         'Désolé, il n\'y a aucune donnée correspondante à afficher',
                },
                
            },
              
              textLabels: {
                // body: {
                //     noMatch:  isLoading ?
                //     <CircularProgress />:
                //         'Désolé, il n\'y a aucune donnée correspondante à afficher',
                // },
            },
            }}
          />
        </Grid>
      </Grid>
    </div>
)

}