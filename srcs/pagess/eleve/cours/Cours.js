import React, { useState, useEffect } from "react";
import {
  Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import GetAppIcon from '@material-ui/icons/GetApp';
import useStyles from "./styles";
import { withStyles, useTheme } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
// components
import Widget from "../../../components/Widget";
// import Table from "../../dashboard/components/Table/Table";
// data
import mock from "../../dashboard/mock";
import { Link, Avatar } from "../../../components/Wrappers";
import { Button } from '@material-ui/core';
import Tabs from '../../profile/Components/Tabs';
import axios from "axios";
import FolderBlue from '../../profile/Icons/FolderBlue';
import IconButton from '@material-ui/core/IconButton';
import { CircularProgress } from "../../../components/Wrappers";
import { Multiselect } from 'multiselect-react-dropdown';
import FolderRed from '../../profile/Icons/FolderRed';
import { MenuItem } from "@material-ui/core";
import { Select } from "@material-ui/core";
// const [mat, setmat] =  




export default function Cours() {
  const classes = useStyles();


  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontSize: '14px',
      fontWeight: theme.typography.fontWeightMedium,
      marginRight: theme.spacing(0),
      color: theme.palette.text.primary,
      fontFamily: [
        'Roboto',
        'sans-serif'
      ].join(','),
      '&:hover': {
        color: theme.palette.text.primary,
        opacity: 1,
      },
      '&$selected': {
        color: theme.palette.text.primary,
      },
      '&:focus': {
        color: theme.palette.text.primary,
      },
    },
    selected: {},
  }));

  const styles = (theme) => ({
    root: {
      flexGrow: 1,
      '& .react-swipeable-view-container': {
        transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
      },
      paddingBottom: 0,
    },
    codeComponent: {
      flexGrow: 1,
      borderRadius: '10px',
      backgroundColor: 'red',
      border: '3px solid black',
      // '&::-webkit-scrollbar': {
      //   width: '6px'
      // },
      '&:: -webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 7px rgba(0,0,0,.3)',
        borderRadius: '10px',
        backgroundColor: '#F5F5F5'
      },
      '&:: -webkit-scrollbar': {
        width: '5px',
        backgroundColor: '#F5F5F5',
        borderRadius: '10px'
      },
      '&:: -webkit-scrollbar-thumb': {
        width: '4px',
        height: '5px',
        borderRadius: '10px',
        '-webkit-box-shadow': 'inset 0 0 7px rgba(0,0,0,.3)',
        backgroundColor: 'white'
      }
    },
    padding: {
      padding: theme.spacing(3),
      paddingBottom: 0,
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    folderWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
    }
  })
  const [isLoading, setIsLoading] = useState(false);
  const [CoursM, seCoursM] = useState([]);
  const onSelect = (da) => {

    reg(da.id)
  }

  useEffect(function () {

    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .then(res => {
        seCoursM(res.data.result)
        console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  const [mat, setmat] = useState([]);
  function reg(id, typ) {
    setIsLoading(true)
    console.log(id)
    const d = localStorage.getItem('user_id')
    var inter = []
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .then(res => {
        res.data.map((e) => {
          if (e.type === typ) {
            inter.push(e)
          }
          setIsLoading(false)
        })

        setmat(inter)
        console.log(inter)
        // console.log( res.data)
      }, 2000)


  }

  const [type, setType] = useState('')
  const [types, setTypes] = useState([
    { id: 1, type: 'Cours' },
    { id: 2, type: 'Exercices' },

  ])
  const theme = useTheme();

  const [showTable, setShowTable] = useState(false);

  const [showMatiere, setShowMatiere] = useState(false);


  const [ShowexErcice, setShowexErcice] = useState(false);
  const [mati, setMati] = useState("")

  const Matiere = () =>
    <div style={{ display: 'flex', justifyContent: 'center' }}  >
      {
        CoursM.map(

          (m) => (


            theme.palette.type === "dark",
            <IconButton onClick={() => {
              { reg(m.id) };
              setShowTable(!showTable)
            }}>

              <FolderBlue title={m.matieress} label="" value="165files" />

            </IconButton>
          )

        )}
    </div>

  const Exercice = () =>
    <div style={{ display: 'flex', justifyContent: 'center' }} >
      <FolderRed title="Python" label="Exercice" value={'Exercice'} />
      <FolderRed title="C++" label="Exercice" value={'Exercice'} />
    </div>

  /////

  /////

  const Table = () =>
    <div  >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des cours"
            data={mat}
            columns={[
              { name: "Matiere", label: "Matière" },
              { name: "type", label: "Type" },
              {
                name: "Fichier", options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button
                        variant={"contained"}
                        style={{ backgroundColor: '#536dfe' }}
                        onClick={
                          () => {
                            console.log(tableMeta.rowData[2])
                          }
                        }
                        href={tableMeta.rowData[2]}
                        target="_blank"
                      >
                        <GetAppIcon style={{ width: 30, height: 30, color: 'white' }} />
                      </Button>

                    )
                  }
                }
              },
              { name: "date_fin", label: "Date" }
            ]}
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
    </div>


  return (
    <div>
      <h1>Cours et exercices</h1>

      <div style={{ backgroundColor: '', }}>
        <br />
        <center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: '#5e6ecc', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#536dfe", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    if (type != "" && mati != "") { reg(mati, t.type) }
                    setType(t.type)
                  }}
                > {t.type}
                </Button>
              )
            }
          </div>
          <br /><br />
          {type != "" ?
            <div>

              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                style={{ width: 600, height: 20, marginBottom: 40 }}

                onChange={e => {
                  setMati(e.target.value)
                  reg(e.target.value, type)
                  setShowTable(true)
                }}

              >
                {
                  CoursM.map((m) =>

                    <MenuItem value={m.id} key={m.id}>
                      {m.matieress}
                    </MenuItem>
                  )}


              </Select>

            </div>
            : <></>}
        </center>











        {/* {
mat.map((item) => (
 <div>   
  <p>
    {item.Matiere}
  </p>
   <p>
   {item.Fichier}
   </p>
   </div>
)) 

} */}
        <br />
        <br />
        {showTable ? <Table /> : null}
        {/* <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell > Matiere</TableCell>

        <TableCell > Type</TableCell>
       
        <TableCell > Fichier</TableCell>
        <TableCell > date</TableCell>
        <TableCell >  </TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {
        // mat ? (
        //   <TableRow  > <TableCell><CircularProgress /></TableCell> </TableRow>
        //   ) : (
         
        mat.map(
            ({ Matiere, type, TypeF, date_fin, Fichier  }) => (
              <TableRow  >
                 
                <TableCell>{Matiere}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{TypeF}</TableCell>
                
               <TableCell>
        {date_fin}  </TableCell> 
                <TableCell>
                
               
                <Button
                  
                    size="small"
                    className="px-2"
                    variant="contained"
                    onClick={()=> window.open(Fichier, "_blank")}
                  >
                  Télecharger 
                  </Button>
                
                 
                </TableCell>
        
              </TableRow>
            )
        )
             
          // )
        
        } 
      </TableBody>
    </Table> */}

        {/* </Widget> */}
      </div>
    </div>
  );
}