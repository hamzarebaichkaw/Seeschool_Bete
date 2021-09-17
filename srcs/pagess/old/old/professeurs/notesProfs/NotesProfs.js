import React, { useState, useEffect } from "react"; 
import { Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell, } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

  import useStyles from "./styles";
  
  import { CircularProgress } from "../../../components/Wrappers/Wrappers";
    import MUIDataTable from "mui-datatables";
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
 
import axios from "axios";

export default function NotesProfs(){
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = React.useState(true);
  // <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return(
      <div>
          <h1>Gestion des Notes</h1>
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
    style={{backgroundColor: "grey",borderRadius:'20px', letterSpacing:5,}}
    color="primary"
    variant="contained"
   
    
  >
  3éme Maths
  </Button>
  <Button  
    style={{backgroundColor: "grey",borderRadius:'20px', letterSpacing:5,height:'50px'}}
    color="primary"
    variant="contained"
   
    
  >
  3éme technique
  </Button>
  <Button  
    style={{backgroundColor: "grey",borderRadius:'20px', letterSpacing:5,height:'50px'}}
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
              title="Gestion des Notes"
            //   data={ data }
            
              columns={[    "Etudiant","Controle 1", "Controle 2", "Note d'oral", "Devoir de synthése", "Pratique"
               
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
              }}
            />
          </Grid>
        </Grid>
      </div>
  )
  
  }