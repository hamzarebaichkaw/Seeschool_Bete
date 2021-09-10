import React, { useState, useEffect } from "react";
import { Grid,  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import { Form } from 'react-bootstrap';
// data
import { useTheme } from "@material-ui/styles";
import mock from "../../dashboard/mock";
import ReactApexChart from "react-apexcharts";
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import axios from "axios";
const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_GRID":
      return {
        ...state,
        toggleGrid: true
      };
    case "CLOSE_GRID":
      return {
        ...state,
        toggleGrid: false
      };
    }
  };
const datatableData = [
  
];
const themeOptions = theme => {
  return {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.warning.main,
      theme.palette.success.light,
      theme.palette.info.main
    ],
    options: {
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      colors: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.warning.main,
        theme.palette.success.light,
        theme.palette.info.main
      ]
    },
    options2: {
      dataLabels: {
        enabled: false
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 230
      },
      colors: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.warning.main,
        theme.palette.success.light,
        theme.palette.info.main
      ]
    },
    options3: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      theme: {
        monochrome: {
          enabled: true
        }
      },
      colors: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.warning.main,
        theme.palette.success.light,
        theme.palette.info.main
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  };
};

export default function Absences() {
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  const [CoursM, seCoursM] = useState([]);
  const theme = useTheme();
useEffect(function () {
  regs()
}, [])
const regs = async () => {
  const d= sessionStorage.getItem('user_id')

  setIsLoading(true)
  
 await axios
    // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Note/${d}`)
    .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Absences/1`)
    .then(res => {
      seCoursM(res.data )
     console.log(res.data )
    }, 2000)

    .catch(() => {
      console.log("ERROR")
    });
   
    setIsLoading(false)
};

async function  popup  ( id  ) {
  dispatch({ type: "OPEN_GRID" })

}
// async function  regs  (   ) {
//   const d= sessionStorage.getItem('user_id')
//   dispatch({ type: "OPEN_GRID" })
//   setIsLoading(true)
//   await axios
//      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Absences/1`)
//      .then(res => {
//       seCoursM(res.data)
//       console.log(res.data )
//      }, 2000)
    
//            setIsLoading(false)
//  } 

  return (
    <>
      <Grid style={{backgroundColor:' ',}} container spacing={4}>
        
        <Grid item xs={12}>
        <br /> <br />
        <h1>Absence </h1>
     
        <br /><br />
          <MUIDataTable
            title="Absences"
            data={CoursM}
            columns={["matiere", "N°de jours d'absences",
          
            {
              name: "Actions",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <Button
                        
                        variant={"contained"}
                        className={classes.marginRight}
                        onClick={
                          () => popup(tableMeta.rowData["0"]) }
                          
                      >
                       < MoreVertIcon/>
                      </Button>
                        
                      )
                  }
              }
          }
          
          
          
          
          
          
          
          
          ]}
            options={{
              filterType: "checkbox",
              textLabels: {
                body: {
                    noMatch:  isLoading ?
                    <CircularProgress />:
                        'Sorry, there is no matching data to display',
                },
            },
            }}
          />
        </Grid>
        {/* <Grid item md={6} xs={12}> 
        <Widget title={"Simple Pie"} noBodyPadding>
            <ReactApexChart
            options={ themeOptions(theme)}
                series={CoursM.chart }
              type="pie"
              height="380"
              stroke={""}
            />
          </Widget>
          </Grid> */}
      </Grid>
      <Dialog
              fullWidth={true}
              maxWidth={"lg"}
              open={state.toggleGrid}
              onClose={() => dispatch({ type: "CLOSE_GRID" })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Absence"}</DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  component={"div"}
                >
<MUIDataTable
            title="Gestion des Congés"
            // data={ mats }
            columns={[    "nombre absence",
            "date_absence"
          ]}
            options={{
              filterType: "checkbox",
              
              textLabels: {
                body: {
                    noMatch:  isLoading ?
                    <CircularProgress />:
                        'Sorry, there is no matching data to display',
                },
            },
            }}
          />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => dispatch({ type: "CLOSE_GRID" })}
                  color="primary"
                >
                 Fermer
                </Button>
           
              </DialogActions>
            </Dialog>
    </>
  );
}