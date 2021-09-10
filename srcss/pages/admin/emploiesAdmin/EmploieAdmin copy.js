import React, { useState, useEffect, useMemo } from "react";
import useStyles from "./styles";
import { Grid, Select, MenuItem } from "@material-ui/core";
// components
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import * as Icons from "@material-ui/icons";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#dfe6e9',
  borderStyle: 'dashed',
  backgroundColor: '#0E0D47',
  color: '#dfe6e9',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#0E0D47',
  backgroundColor: '#dfe6e9',
  color: '#0E0D47'
};

const acceptStyle = {
  borderColor: '#0E0D47'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Basic() {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));



  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style })}>
        <input {...getInputProps()} />
        <Icons.CloudUpload style={{ width: 100, height: 100 }} />
        <p style={{ alignSelf: 'center', fontSize: 30 }}>Drag/Drop ou cliquer pour sélectionner un Emploi du temps</p>
      </div>
      <br />
      <aside>
        <h4>Files</h4>
        <ul style={{ listStyle: 'none' }}>{files}</ul>
      </aside>
    </section>
  );
}


export default function Emploie() {
  const classes = useStyles();

  const [mat, setmat] = useState([])

  const [selected, setSelected] = useState('')

  const [CoursM, setCoursM] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [action, setAction] = useState("Choisissez...");


  const handleChange = e => {
    reg(e.target.value)
  };

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


  function reg(id) {

    const d = sessionStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/EmploieAdmin/${id}`)
      .then(res => {
        setmat(res.data)
        console.log(res.data)
      }, 2000)
  }

  return (
    <div>
      <h1>Emplois du temps</h1>
      <div style={{ backgroundColor: '', }}>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>


          <Button
            style={selected === 'classe' ? { backgroundColor: "#0984e3", color: "#0E0D47" } : { backgroundColor: "#0E0D47" }}
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => setSelected('classe')}
          >
            Classe
          </Button>

          <br />
          <br />
          <Button style={selected === 'Prof' ? { backgroundColor: "#0984e3", color: "#0E0D47" } : { backgroundColor: "#0E0D47" }}
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => setSelected('Prof')}
          >
            Professeur
          </Button>
        </div>
        <br />
        <br />
        <br />
        {
          selected === 'classe' ?
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
              </div>
            </center>
            :
            selected === 'Prof'
              ?
              <center>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                  <Grid item md={4} xs={12} lg={4}>
                    <Form.Control as="select">
                      {
                        mat.map(
                          (m) => (
                            <option>{m.nom}</option>
                          ))}
                    </Form.Control>
                  </Grid>
                </div>
              </center>
              :
              null
        }
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Basic />
        {/* <MultipleFileUploadField /> */}


        {/* <button style={{ height: '500px', width: '1210px', textAlign: 'center', backgroundImage: 'url()' }}  >   <CloudUploadIcon />
          <Form.File style={{}} id="exampleFormControlFile2" label=" " />
        </button> */}

      </div>
    </div>
  );
}