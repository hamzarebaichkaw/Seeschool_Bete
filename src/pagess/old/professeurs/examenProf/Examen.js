import React from 'react'
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import {Form} from 'react-bootstrap';
// components
import Widget from "../../../components/Widget";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function ExamenProf() {


return(

    <div>
        <h1>Gestion des examens</h1>
        <br />
          <div style={{display:'flex',justifyContent:'space-evenly'}}>
          <Button  
    style={{backgroundColor: "#3a86ff",borderRadius:'10px', letterSpacing:5,}}
    color="primary"
    variant="contained"
   
    
  >
  Bac Maths
  </Button>
  <Button  
    style={{backgroundColor: "grey",borderRadius:'10px', letterSpacing:5,}}
    color="primary"
    variant="contained"
   
    
  >
  3éme Maths
  </Button>
  <Button  
    style={{backgroundColor: "grey",borderRadius:'10px', letterSpacing:5,height:'50px'}}
    color="primary"
    variant="contained"
   
    
  >
  3éme technique
  </Button>
  <Button  
    style={{backgroundColor: "grey",borderRadius:'10px', letterSpacing:5,height:'50px'}}
    color="primary"
    variant="contained"
   
    
  >
  1ére
  </Button>
  
          </div>
          <br />
          <br />
          <div>
          <Form.Control as="select">
<option>Selectionner une option</option>
<option>Selectionner une option</option>
<option>Selectionner une option</option>
<option>Selectionner une option</option>
<option>Selectionner une option</option>
</Form.Control>
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
              Save
            </Button>
          </div>
    </div>
)


}