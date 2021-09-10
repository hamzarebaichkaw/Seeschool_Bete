import React, { useState, useEffect } from "react";
import { Grid, Select, MenuItem } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";

// components
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Inscription() {
  const classes = useStyles();

  const [action, setAction] = useState("Choisissez...");
  const [mat, setmat] = useState([])
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [CoursM, setCoursM] = useState([]);

  useEffect(function () {
    getStats()
  }, [])

  const getStats = async () => {
    const d = sessionStorage.getItem('user_id')

    setIsLoading(true)
    setListLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        setCoursM(res.data.result)
        setAction(res.data.result.matieress)
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
    setListLoading(false)
  };

  async function reg(id) {
    const d = sessionStorage.getItem('user_id')
    setIsLoading(true)
    setTableLoading(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Students`)
      .then(res => {
        setmat(res.data)
      }, 2000)
    setIsLoading(false)
    setShow(true)
    setTableLoading(false)
  }

  const handleChange = e => {
    reg(e.target.value)
  };

  const toggleHover = () => {
    setHover(!hover)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Inscriptions</h1>
        <Button variant="contained" href="http://localhost:3000/#/admin/Register"
          style={hover ? {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#F6F7FF",
            color: "#0E0D47",
            alignSelf: 'center'
          } : {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#0E0D47",
            color: "#F6F7FF",
            alignSelf: 'center'
          }}
          onMouseEnter={toggleHover} onMouseLeave={toggleHover}
        >
          Inscrire un élève
          <AddCircleIcon />
        </Button>
      </div>
      <div style={{ marginTop: 50 }}>
        <center>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Grid item md={4} xs={12} lg={4}>
              <p>Année: </p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                renderValue={action}
                onChange={handleChange}
              >
                {listLoading ? <center><CircularProgress size={20} /></center> :
                  CoursM.map((m) =>
                    <MenuItem value={m.id} key={m.id}>
                      {m.matieress}
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
                renderValue={action}
                onChange={handleChange}
              >
                {CoursM.map((m) =>
                  <MenuItem value={m.id} key={m.id}>
                    {m.matieress}
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
                renderValue={action}
                onChange={handleChange}
              >
                {CoursM.map((m) =>
                  <MenuItem value={m.id} key={m.id}>
                    {m.matieress}
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
                {}
              </Button>
                

              )
            )} */}
          </div>
        </center>

        <br />
        <br />
        <br />
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}  > {show ? "Liste des Etudiants" : "Choisissez une classe"} </h2>
        {tableLoading ?
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <center><CircularProgress size={40} /></center>
            </Grid>
          </Grid>
          :
          show ?
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MUIDataTable
                  title="List Etudiants"
                  data={mat}
                  columns={["ID", "Nom et prenom", "Lieu", "date de naissance", "Class"]}
                  options={{
                    filterType: "checkbox",
                    textLabels: {
                      body: {
                        noMatch: isLoading ?
                          <CircularProgress /> :
                          'Sorry, there is no matching data to display',
                      },
                    },
                  }}
                />
              </Grid>

            </Grid>
            :
            null
        }
      </div>
    </div>
  );
}