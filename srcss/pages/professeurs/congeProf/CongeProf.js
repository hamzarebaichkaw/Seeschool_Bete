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
<h3   style={{ border:'solid', color:'white', backgroundColor:'#3A86FF', borderRadius:25,width:'180px',height:'80px', textAlign:'center', alignItems:'center', display:'flex',justifyContent:'center'}}>Debut de Conge </h3>
                      <TextField
    id="date"
    label="Debut de Conge"
    type="date"
    defaultValue="2017-05-24"
 
    InputLabelProps={{
      shrink: true,
    }}
  />
<h3   style={{ border:'solid', color:'white', backgroundColor:'#3A86FF', borderRadius:25,width:'180px',height:'80px', textAlign:'center', alignItems:'center', display:'flex',justifyContent:'center'}}>Fin de conge </h3>
  <TextField
    id="date"
    label="Fin de conge"
    type="date"
    defaultValue="2017-05-24"
   
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