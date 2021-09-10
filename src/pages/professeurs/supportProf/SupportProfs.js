import React, { useState, useEffect } from "react";
import {
  Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { Link, Button, Avatar } from "../../../components/Wrappers/Wrappers";
import useStyles from "./styles";
import { Form } from 'react-bootstrap';
// components
import Widget from "../../../components/Widget";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";


export default function SupportProfs() {



  const classes = useStyles();
  return (
    <Grid item xs={12} item justify={'center'} container>
      <Widget>

        <h1>Contact Support</h1>

        <Form.Control as="select" style={{ width: 600 }}>
          <option>Demande de double correction</option>
          <option>Demande de attestation de présence</option>

          <option>Autre</option>
        </Form.Control>
        <br />
        <br />
        <TextareaAutosize style={{ width: '600px', paddingLeft: 5 }} aria-label="minimum height" rowsMin={7} placeholder="Saisie Votre Texte ..." />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>


          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            style={{ width: 600 }}

          >
            Envoyer
          </Button>
        </div>
      </Widget>
    </Grid>
  );
}
