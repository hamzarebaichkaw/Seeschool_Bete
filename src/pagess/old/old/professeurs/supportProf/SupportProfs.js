import React, { useState, useEffect } from "react"; 
import { Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell, } from "@material-ui/core";
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import useStyles from "./styles";
import {Form} from 'react-bootstrap';
// components
import Widget from "../../../components/Widget";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";


export default function SupportProfs(){



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
<Button
              color="primary"
              variant="contained"
              className={classes.button}
              style={{backgroundColor: "#3a86ff"}}
            >
              envoyer
            </Button>
</div>

);
}
