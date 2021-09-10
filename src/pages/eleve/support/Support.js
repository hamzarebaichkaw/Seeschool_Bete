import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { Form } from 'react-bootstrap';
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
