import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
// components
import Widget from "../../../components/Widget/Widget";
import { CircularProgress } from "../../../components/Wrappers"
import { Button } from "../../../components/Wrappers";


 

export default function Charts(props) {

  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ChartAbsenceMatiere/1`)
      .then(res => {
        seCoursM(res.data.series)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);


  const themeOptions = theme => {

    return {
      labels: CoursM,

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

  const theme = useTheme();

  useEffect(function () {
    getStats()
  }, []);

  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const reset = () => {
    getStats()
  };

  const getStats = async () => {
    const d = sessionStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ChartAbsence/1`)
      .then(res => {
        setState(res.data);
        console.log(res.data)
      }, 2000)
      .catch((e) => {
        console.error(e)
      });
      setIsLoading(false)
  };

  // local

  return (

    <>
      
          <Widget title={"Absence Total "} >
            {
              isLoading ?
                <Box my={3} display="flex" flexWrap="wrap" justifyContent="center">
                  <Box mt={1} mr={2}>
                    <CircularProgress />
                  </Box>
                </Box>
                :
                <ReactApexChart
                  options={themeOptions(theme)}
                  series={state.series}
                  type="donut"
                  height="380"
                  stroke={""}
                />
            }
          </Widget>
        
     
    </>
  );
}
