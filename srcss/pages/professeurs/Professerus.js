import React from 'react';
import Header from "../professeurs/HeaderProfs/Header";
import Sidebar from "../professeurs/SideBarProfesserus/Sidebar";
import structure from "../professeurs/SideBarProfesserus/SidebarStructure";
import ProfsDashboard from "./dashboardProf/DashboardProf"
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import { useLayoutState } from '../../context/LayoutContext'

import useStyles from './styles'
import EventsProfs from './EventsProfs/eventsProfs';
import EmploieProf from './emlpoieProfs/EmploieProf';
import NotesProfs from './notesProfs/NotesProfs';
import AssuiditeProf from './assuiditéProf/AssuiditeProf';
import NotificationsProfs from './NotificationProfs/NotificationProfs';
import HomeworksProfs from './HomeworkProfs/HomeworkProfs';
import CoursProfs from './CoursProfs/CoursProfs';
import SupportProfs from './supportProf/SupportProfs';
import CongeProf from './congeProf/CongeProf';
import ExamenProf from './examenProf/Examen';


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


return(

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
                    <Route path="/Professeur/dashboard" component={ProfsDashboard} />
                    <Route path="/Professeur/emploi" component={EmploieProf} />
                    <Route path="/Professeur/cours" component={CoursProfs} />
                    <Route path="/Professeur/notifications" component={NotificationsProfs} />
                    <Route path="/Professeur/notes" component={NotesProfs} />
                    <Route path="/Professeur/Events" component={EventsProfs} />
                    <Route path="/Professeur/assuidité" component={AssuiditeProf} />
                    <Route path="/Professeur/homework" component={HomeworksProfs} />
                    <Route path="/Professeur/conges" component={CongeProf} />
                    <Route path="/Professeur/support" component={SupportProfs} />
                    <Route path="/Professeur/examen" component={ExamenProf} />
                </Switch>
             
                {/* <Footer>
                   
                </Footer> */}
            </div>
        </div>
)



}

export default withRouter(Layout)