import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import {Form} from 'react-bootstrap';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Badge, Chip, Button } from '../../../components/Wrappers';

// data
import mock from "../../dashboard/mock";


export default function Support() {
  const classes = useStyles();
    return (
    <div>
      <h1>Contact Support</h1> 
    
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
  <div   style={{display:'flex', justifyContent:'space-between' }}>
  <Button     
                  
                  variant="contained"
                  className={classes.button}
                style={{backgroundColor:'#343a40', color:'white'}}
                >
             <h5   style={{ color:'white'}}> Information</h5>  
                </Button>
             
                <Button     
                  color="primary"
                  variant="contained"
                  className={classes.button}
                
                >
                   Envoyer
                </Button>
                </div>
</div>

  );
}
