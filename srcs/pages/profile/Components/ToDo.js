import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import ToDoItem from './ToDoItem';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ background: index % 2 === 0 && '#E1EFFF' }} p={0}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid rgba(185, 185, 185, 0.3)`,
    margin: '0 24px',
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    '&:hover': {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.text.primary,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const styles = (theme) => ({
  root: {
    maxHeight: 575,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    overflow: 'auto',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-track': {
      width: '3px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#D8D8D8',
      borderRadius: 5,
      outline: '1px solid #D8D8D8',
    },
    flexGrow: 1,
    '& .react-swipeable-view-container': {
      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
    },
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  folderWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
})

function CustomizedTabs({ classes }) {

  const [index, setIndex] = React.useState(0);

  const [homeworks, setHomeWorks] = useState([]);

  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/HomeWork/${d}`)
      .then(res => {
        setHomeWorks(res.data)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
console.log(homeworks);
  const handleChange = (event, index) => {
    setIndex(index)
  }

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

 


  return (
    <div className={classes.root}>
     
      <SwipeableViews
        index={index}
        style={{ padding: 0 }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel style={{ padding: 0 }}>
          {homeworks.map((item, index) => (
            <ToDoItem key={index} title={item.nom} color={item.color} time={item.time} />
          ))}
        </TabPanel>
      
      </SwipeableViews>
    </div>
  );
}

export default withStyles(styles)(CustomizedTabs);