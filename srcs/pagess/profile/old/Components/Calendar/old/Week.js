import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Day from './Day';
import moment from 'moment/moment'
import { v4 as uuid } from 'uuid';
import axios from "axios";
const styles = (theme) => ({
  calendarRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  week: {
    height: '15%',
  },
})

const Week = ({ selected, currentMonthView, previousCurrentNextView, currentDay, classes }) => {

  const [homeworks, setHomeWorks] = useState([]);

  useEffect(() => {
    getHomeWorks()
  }, []);

  const getHomeWorks = async () => {
    let arrayHomeWorks = new Array()
    var year
    var month
    var day
    await axios
      .get('http://www.pointofsaleseedigitalaency.xyz/public/APIUser/HomeWork/1')
      .then(res => {
        res.data.map((h) => {
          if (h.date_fin != null) {
            year = h.date_fin.date.substring(0, 4)
            month = h.date_fin.date.substring(5, 7)
            day = h.date_fin.date.substring(8, 10)

            console.log(year + ' ********* ' + month + ' ********* ' + day)

            arrayHomeWorks.push({
              title: h.nom,
              info: h.nom,
              itemStyle: "#7C90FF",
              // date: "20210827"
              date: moment(`${year}-${month}-${day}`, "YYYYMMDD")
            })
          } else console.log("DATE IS NULL")
        })
        setHomeWorks(arrayHomeWorks)
      }, 2000)
      .catch((e) => {
        console.log("ERROR: " + e)
      });
  }

  const [events, setevents] = useState([]);
  useEffect(function () {
    details()
  }, [])


  const details = async () => {

    const d = localStorage.getItem('user_id')
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/${d}`)
      .then(res => {
        setevents(res.data[0])
      }, 2000)

      .catch((e) => {
        console.log("ERROR: " + e)
      })

  };

  let days = [];
  let date = previousCurrentNextView;


  let selectedMonthEvents = homeworks
  // [
  //   {

  //     title: homeworks.nom,
  //     info: "Contents here",
  //     itemStyle: "#7C90FF",

  //     date: moment(`${moment().year()}-${moment().month() + 1}-02`, "YYYYMMDD"),
  //   },
  //   {
  //     title: "Stop world water pollution",
  //     info: "Have a kick off meeting with .inc company",
  //     itemStyle: "#FFC35F",
  //     date: moment(`${moment().year()}-${moment().month() + 1}-05`, "YYYYMMDD"),
  //   },
  //   {
  //     title: "Light Blue 2.2 release",
  //     info: "Some contents here",
  //     itemStyle: "#3CD4A0",
  //     date: moment(`${moment().year()}-${moment().month() + 1}-18`, "YYYYMMDD"),
  //   },
  //   {
  //     title: "A link",
  //     info: "",
  //     itemStyle: "#FF5C93",
  //     link: "www.flatlohttp://gic.com",
  //     date: moment(`${moment().year()}-${moment().month() + 1}-28`, "YYYYMMDD"),
  //   },
  // ];


  for (var i = 0; i < 7; i++) {
    let dayHasEvents = false,
      title = '',
      info = '',
      itemStyle = '',
      link = '';

    for (var j = 0; j < selectedMonthEvents.length; j++) {
      if (selectedMonthEvents[j].date.isSame(date, "day")) {
        dayHasEvents = true;
        title = selectedMonthEvents[j].title ? selectedMonthEvents[j].title : '';
        info = selectedMonthEvents[j].info ? selectedMonthEvents[j].info : '';
        itemStyle = selectedMonthEvents[j].itemStyle ? selectedMonthEvents[j].itemStyle : '';
        link = selectedMonthEvents[j].link ? selectedMonthEvents[j].link : '';
      }
    }

    let day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === currentMonthView.month(),
      isToday: date.isSame(new Date(), "day"),
      date: date,
      hasEvents: dayHasEvents,
      title: title,
      info: info,
      itemStyle: itemStyle,
      link: link
    };

    days.push(<Day
      key={uuid()}
      day={day}
      selected={selected}
    />);
    date = date.clone();
    date.add(1, "d");
  }

  return (
    <div className={`${classes.calendarRow} ${classes.week}`}>
      {days}
    </div>
  );
}

export default withStyles(styles)(Week);