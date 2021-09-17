

import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Icon from '@mdi/react'
 

// styles
import useStyles from './styles'

// components
 
import Header from "../parent/HeaderParent/Header";
import Sidebar from "../parent/SideBarParent/Sidebar";
import structure from "../parent/SideBarParent/SidebarStructure";

// import Footer from '../Footer'
import { Link } from '../../components/Wrappers'
 

// pages
 
// context
import { useLayoutState } from '../../context/LayoutContext'
import { ProductsProvider } from '../../context/ProductContext'
import emploie from './parentEmploie/Emploie'
import Coursparent from './coursParent/Cours'
import Events from './eventsParent/Events'
import Notification from './notificationParent/Notification'
import Notes from './notesParent/Notes'
import Emploi from './parentEmploie/Emploie'
import Absences from './absenceParent/Absence'
import Homework from './homeworkParent/Homework'
import Support from './supportParent/Support'
import payement from './payementParent/PayementParent'
import Payement from './payementParent/PayementParent'
import DashboardParent from './DashboardParent/DashboardParent'
import ChooseCHild from './parentChild/ParentChild'
 

function Layout(props) {
    const classes = useStyles()
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = React.useState(2)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    const layoutState = useLayoutState();

    // eslint-disable-next-line no-unused-vars
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    // eslint-disable-next-line no-unused-vars
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    return (
        <div className={classes.root}>
   <Header/>
    <Sidebar structure={structure} />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
            
                <Switch>
                  <Route path="/parent/profile" component={DashboardParent} />
                    <Route path="/parent/emploie" component={Emploi} />
                    <Route path="/parent/cours" component={Coursparent} />
                    <Route path="/parent/notification" component={Notification} />
                    <Route path="/parent/notes" component={Notes} />
                    <Route path="/parent/events" component={Events} />
                    <Route path="/parent/absence" component={Absences} />
                    <Route path="/parent/HomeWork" component={Homework} />
                    <Route path="/parent/Support" component={Support} />
                    <Route path="/parent/child" component={ChooseCHild} />
                    <Route path="/parent/payement" component={Payement} />
                </Switch>
             
                {/* <Footer>
                   
                </Footer> */}
            </div>
        </div>
    )
}

export default withRouter(Layout)
