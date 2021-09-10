import React, { useState } from "react";
import { Button } from "../../../components/Wrappers/Wrappers";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid, Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";

export default function ClassesAdmin() {
  const [showText, setShowText] = useState(false);
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)

  const [mat, setmat] = useState([]);
  const [action1, setAction1] = useState("Choisissez Année...");
  const [action2, setAction2] = useState("Choisissez Section...");
  const [action3, setAction3] = useState("Choisissez Numéro...");

  const [year, setYear] = useState([
    { id: 1, year: "1ère Année" },
    { id: 2, year: "2ème Année" },
    { id: 3, year: "3ème Année" }
  ]);

  const [section, setSection] = useState([]);

  const [numero, setNumero] = useState([]);

  function reg(nv) {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesMAdmin/${nv}`)
      .then(res => {
        setmat(res.data)
      }, 2000)
  }

  // const onClick = () => setShowText(true);

  const handleChangeS = e => {
    setSection([
      { id: 1, section: "Science Informatique" },
      { id: 2, section: "Mathématique" },
      { id: 3, section: "Economie et Gestion" },
      { id: 4, section: "Lettre" },
      { id: 5, section: "Science Exprimentale" },
      { id: 6, section: "Technique" }
    ])
    setAction1("1ère Année")
  };

  const handleChangeN = e => {
    setNumero([
      { id: 1, numero: 1 },
      { id: 2, numero: 2 },
      { id: 3, numero: 3 }
    ])
    setAction2("Science Informatique")
  };

  const handleChange = e => {
    reg("bac")
    setAction3("3")
    setShow(true)
  };

  const toggleHover = () => {
    setHover(!hover)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Classes</h1>
        <Button variant="contained" color="secondary" href="http://localhost:3000/#/admin/addclasse"
          style={hover ? {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#0E0D47",
            alignSelf: 'center'
          } : {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#9D0208",
            color: "#9D0208",
            alignSelf: 'center'
          }}
          onMouseEnter={toggleHover} onMouseLeave={toggleHover}
        >
          {/* // style={{ borderRadius: '20px', letterSpacing: 5, backgroundColor: '#9D0208', height: '50px' }} */}
          Ajouter un niveau <AddCircleIcon />
        </Button>
      </div>
      <div style={{ marginTop: 50 }}>
        <center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
            <Grid item md={4} xs={12} lg={4}>
              <p>Année: </p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                // value={action}
                renderValue={() => { return action1 }}
                onChange={handleChangeS}
              >
                {year.map((y) =>
                  <MenuItem value={y.id} key={y.id}>
                    {y.year}
                  </MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item md={4} xs={12} lg={4}>
              <p>Section: </p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                // value={action}
                renderValue={() => { return action2 }}
                onChange={handleChangeN}
              >
                {section.map((s) =>
                  <MenuItem value={s.id} key={s.id}>
                    {s.section}
                  </MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item md={4} xs={12} lg={4}>
              <p>Classe: </p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                // value={action}
                renderValue={() => { return action3 }}
                onChange={handleChange}
              >
                {numero.map((c) =>
                  <MenuItem value={c.id} key={c.id}>
                    {c.numero}
                  </MenuItem>
                )}
              </Select>
            </Grid>
          </div>
        </center>
      </div>

      <br />
      <br />
      <br />

      <div>
        {show ?
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Listes des Classes"
                data={mat}
                columns={["id", "Nom de class", "Capacité", "Nombre des éléves",]}
                options={{
                  filterType: "checkbox"
                }}
              />
            </Grid>
          </Grid>
          :
          <center>
            <div style={{ marginTop: 50 }}>
              <h3>Choisissez une classe</h3>
            </div>
          </center>
        }
      </div>
    </div>
  );
}
