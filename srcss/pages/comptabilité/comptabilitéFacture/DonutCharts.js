import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import ReactApexChart from "react-apexcharts";
import { Box } from "@material-ui/core";
import axios from "axios";
// components
import Widget from "../../../components/Widget/Widget";
import { Button } from "../../../components/Wrappers";
import { CircularProgress } from "../../../components/Wrappers"

 

export default function Charts(props) {



  
 



  const themeOptions = theme => {
  
    return {
      labels: [  "livré", "En cours", ],
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
          .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ChartFactureAdmin`)
          .then(res => {
            setState(res.data);
          }, 2000)
          .catch((e) => {
            console.error(e)
          });
          setIsLoading(false)
      };
 
   
 

 

  return (
    
    <>
      <Grid container spacing={4}>
        <Grid item md={10} xs={12}>
          <Widget title={"Gestion des Facture"} noBodyPadding>
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
                  type="pie"
                  height="380"
                  stroke={""}
                />
            }
          </Widget>
       
        </Grid>
 
      </Grid>
    </>
  );
}
