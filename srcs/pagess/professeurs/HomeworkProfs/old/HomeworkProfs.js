import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import { Grid } from "@material-ui/core"
import useStyles from "./styles"
// components
import Widget from "../../../components/Widget"
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import axios from 'axios';

export default function HomeworksProfs() {
  const classes = useStyles();
  const [Titre, setTitre] = useState("")
  const [date_naissance, setdate_naissance] = useState("");
  const [profClasses, SetProfClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)

  useEffect(() => {
    getProfClasses()
  }, [])

  const getProfClasses = async () => {
    // const current_prof = sessionStorage.getItem('user_id')
    setLoadingClasses(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/15`)
      .then(res => {
        SetProfClasses(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
  }

  return (
    <div>
      <h1>Home Work</h1>

      <br />

      <Grid item xs={12} item justify={'center'} container>
        <Widget>

          <h1>Ajouter un devoir</h1>

          <br /><br />

          <h6>Choisissez une classe</h6>

          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            style={{ width: 300, height: 20, marginBottom: 40 }}
            required
            onChange={e => {
              console.log(e.target.value)
            }}
          >
            {
              loadingClasses ?
                <CircularProgress size={25} />
                :
                (
                  profClasses.map((m) =>
                    <MenuItem value={m.Calsse} key={m.id}>
                      {m.Calsse}
                    </MenuItem>
                  )
                )
            }
          </Select>

          <br /><br />

          <TextField
            id="outlined-basic"

            label="Titre"
            name="Code_produit"
            value={Titre}
            onChange={e => setTitre(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35, width: '600px' }}
            type={'textera'}
          />

          <br /><br />

          <p>Description</p>
          <TextareaAutosize style={{
            width: '600px',
            height: '70px',
            padding: '5px'
          }}
            aria-label="minimum height"
            rowsMin={7}
            placeholder="Saisir votre texte..." />

          <br /><br />

          <TextField
            id="date"
            label="Date finale de dépôt"
            style={{ marginBottom: 35, width: '600px' }}
            type="date"
            defaultValue="AAAA-MM-JJ"
            onChange={e => setdate_naissance(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <br /><br />

          <input type="file" id="myFile" name="filename"></input>

          <br /><br />

          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            style={{ width: 600 }}

          >
            Envoyer
          </Button>

        </Widget>
      </Grid>

    </div>
  )
}