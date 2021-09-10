import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import Widget from "../../../components/Widget";
import {
  Grid,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup
} from "@material-ui/core";
import axios from 'axios';
import BlueRadio from "@material-ui/core/Radio"

export default function CongeProf() {

  const [dateDep, setDateDep] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [maladie, setMaladie] = useState('Oui')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)


  const ajouterConge = async () => {
    console.log(dateDep + ' ' + dateFin + ' ' + description + ' ' + maladie)
    setLoading(true)
    await axios
      .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/conges`, {
        "Cause": description,
        "Description": description,
        "maladie": maladie,
        "Created_At": "2021-06-24T00:00:00+02:00",
        "modified_at": "2021-07-14T00:00:00+02:00",
        // "Created_At": dateDep,
        // "modified_at": dateFin,
        // "prof": `/public/api/enseignants/${id_prof}`,
        "prof": `/public/api/enseignants/15`,
        "status": "En Cours",
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoading(false)
  }

  const handleChange = (e) => {
    setMaladie(e.target.value)
  }

  return (
    <Grid item xs={12} item justify={'center'} container>
      <Widget>

        <h1 > Gestion des congés</h1>

        <br /><br />

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

          <h3>Début de Congé </h3>

          <TextField
            id="date"
            label="Début de Congé"
            type="date"
            defaultValue="AAAA-MM-JJ"
            onChange={e => setDateDep(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <h3>Fin de congé</h3>

          <TextField
            id="date"
            label="Fin de congé"
            type="date"
            defaultValue="AAAA-MM-JJ"
            onChange={e => setDateFin(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

        </div>

        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Maladie?</FormLabel>
            <RadioGroup aria-label="maladie" name="maladie1" value={maladie} onChange={handleChange}>
              <FormControlLabel value="Oui" control={<BlueRadio />} label="Oui" />
              <FormControlLabel value="Non" control={<BlueRadio />} label="Non" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <div>

          <br /><br />

          <TextareaAutosize
            style={{ width: '1220px' }}
            aria-label="minimum height"
            rowsMin={7}
            placeholder="Saisir votre texte..."
            onChange={e => setDescription(e.target.value)}
          />

          <br /><br />

          <Button
            color="primary"
            variant="contained"
            style={{ backgroundColor: "#3a86ff", width: '100%' }}
            onClick={() => ajouterConge()}
          >
            {
              loading ?
                <CircularProgress size={25} />
                :
                "Envoyer"
            }
          </Button>
        </div>
      </Widget>
    </Grid>

  )
}