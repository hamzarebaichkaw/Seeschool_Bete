import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import ReactApexChart from "react-apexcharts";
import { Box } from "@material-ui/core";

// components
import Widget from "../../../components/Widget/Widget";
import { Button } from "../../../components/Wrappers";

const themeOptions = theme => {
  return {
    labels: ["Payer", "Non Payer",],
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

const values = {
  series: [70,30],
 
};

export default function Charts(props) {
  const theme = useTheme();
  const [state, setState] = useState(values);
  const appendData = () => {
    var arr = state.series3.slice();
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);

    setState({
      ...state,
      series3: arr
    });
  };

  const removeData = () => {
    if (state.series3.length === 1) return;

    var arr = state.series3.slice();
    arr.pop();

    setState({
      ...state,
      series3: arr
    });
  };

  const randomize = () => {
    setState({
      ...state,
      series3: state.series3.map(() => {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      })
    });
  };
  console.log(themeOptions(theme))

  const reset = () => {
    setState({
      ...state,
      series3: [44, 55, 13, 33]
    });
  };

  // local

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Widget title={"Gestion des paiements"} noBodyPadding>
            <ReactApexChart
              options={themeOptions(theme)}
              series={state.series}
              type="pie"
              height="380"
              stroke={""}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
