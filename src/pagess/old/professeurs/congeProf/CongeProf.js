import React from 'react'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
export default function CongeProf() {
    return(
        <div>
               <h1 > Gestion des congés</h1>
               <br />
               <br />
               <div style={{display:'flex', justifyContent:'space-evenly'}}>
<h3   style={{ border:'solid', color:'white', backgroundColor:'#3A86FF'}}>Début de Congé </h3>
                      <TextField
    id="date"
    label="Début de Congé"
    type="date"
    defaultValue="AAAA-MM-JJ"
 
    InputLabelProps={{
      shrink: true,
    }}
  />
<h3   style={{ border:'solid', color:'white', backgroundColor:'#3A86FF'}}>Fin de congé</h3>
  <TextField
    id="date"
    label="Fin de congé"
    type="date"
    defaultValue="AAAA-MM-JJ"
   
    InputLabelProps={{
      shrink: true,
    }}
  />
               </div>
               <div>
               <br />
<br />
<TextareaAutosize style={{width:'1220px'}} aria-label="minimum height" rowsMin={7} placeholder="Saisie Votre Texte ..." /> 
<br />
<br />
<Button
              color="primary"
              variant="contained"
             
              style={{backgroundColor: "#3a86ff",width:'100%'}}
            >
              envoyer
            </Button>
               </div>
        </div>
     
    )
}