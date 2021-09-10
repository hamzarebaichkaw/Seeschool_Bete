import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
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
import axios from "axios";
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
 
  const classes = useStyles();
  const [CoursM, seCoursM] = useState([]);
  const theme = useTheme();
useEffect(function () {
  const d= sessionStorage.getItem('user_id')
  axios
    // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Note/${d}`)
    .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Absences/1`)
    .then(res => {
      seCoursM(res.data )
     console.log(res.data )
    }, 2000)

    .catch(() => {
      console.log("ERROR")
    });
}, []);
  return (
    <>
      <Grid style={{backgroundColor:' ',}} container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Absences"
            data={CoursM}
            columns={["matiere", "N°de jours d'absences"]}
            options={{
              filterType: "checkbox"
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
    </>
  );
}