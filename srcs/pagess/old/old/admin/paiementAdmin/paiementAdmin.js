import React, { useState, useEffect } from "react";
import { Grid, Select, MenuItem } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import axios from "axios";

export default function PaimentAdmin() {
  const classes = useStyles();

  useEffect(() => {
    const d = localStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, [])

  const [listLoading, setListLoading] = useState(false)
  const [action, setAction] = useState("Choisissez...")

  const [annee, setAnnee] = useState("")
  const [section, setSection] = useState("0")
  const [numero, setNumero] = useState("")

  const [allAnnee, setAllAnnee] = useState(["7ème", "8ème", "9ème", "3eme"])
  const [allSection, setAllSection] = useState(["Science Informatique", "Science", "Mathématique", "Science Exprimentale"])
  const [allNumero, setAllNumero] = useState([])

  const [mat, setmat] = useState([]);

  useEffect(function () {

  }, []);

  function handleAnnee(e) { setAnnee(e.target.value) }


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Paiement </h1>

      </div>
      <div style={{ backgroundColor: '', }}>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Grid item md={4} xs={12} lg={4}>
            <p>Année: </p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
              // renderValue={annee}
              onChange={handleAnnee}
            >
              {listLoading ? <center><CircularProgress size={20} /></center> :
                allAnnee.map((a) =>
                  <MenuItem value={a} key={a}>
                    {a}
                  </MenuItem>
                )}
            </Select>
          </Grid>

          {(annee === '2ème' || annee === '3eme' || annee === 'Bac') ?
            <Grid item md={4} xs={12} lg={4}>
              <p>Section: </p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                // renderValue={section}
                onChange={async e => {
                  setSection(e.target.value)
                  await axios
                    .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${annee}/${section}`)
                    .then(res => {
                      setAllNumero(res.data)
                      console.log(res.data)
                    }, 2000)
                    .catch((e) => {
                      console.log(e)
                    });
                }}
              >
                {allSection.map((s) =>
                  <MenuItem value={s} key={s}>
                    {s}
                  </MenuItem>
                )}
              </Select>
            </Grid> : null}
          <Grid item md={4} xs={12} lg={4}>
            <p>Classe: </p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
              // renderValue={numero}
              onChange={e => {
                setNumero(e.target.value)
              }}
            >
              {allNumero.map((n) =>
                <MenuItem value={n} key={n}>
                  {n["Numéro des classes"]}
                </MenuItem>
              )}
            </Select>
          </Grid>
          {/* {
            CoursM.map(
              (m) => (
                <Button
                  style={{ backgroundColor: "#0E0D47", }}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => { reg(m.id) }}
                >
                  {m.matieress}
                </Button>
              )
            )} */}
        </div>
        <br />
        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Liste des étudiants"
              data={mat}
              columns={["ID", "Nom et prenom", "Class"]}
              options={{
                filterType: "checkbox"
              }}
            />
          </Grid>
        </Grid>


      </div>
    </div >
  );
}