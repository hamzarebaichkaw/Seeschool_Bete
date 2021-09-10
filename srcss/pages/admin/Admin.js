// import React, { useState, useEffect } from "react";
// import Header from "../admin/HeaderAdmin/Header";
// import Sidebar from "../admin/SideBarAdmin/Sidebar";
// import structure from "../admin/SideBarAdmin/SidebarStructure";
// function ProfileAdmin() {
//   return (
//       <div>
//   <Header/>
//   <Sidebar structure={structure} />

//     <h1>HELLOOO  Admin</h1>  
//     </div>
//   );
// }
 
// export default ProfileAdmin;

import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Icon from '@mdi/react'
 

// styles
import useStyles from './styles'

// components
 
import Header from "../admin/HeaderAdmin/Header";
import Sidebar from "../admin/SideBarAdmin/Sidebar";
import structure from "../admin/SideBarAdmin/SidebarStructure";
import Inscription from "../admin/InscriptionAdmin/Inscription";

import PaimentAdmin from "../admin/paiementAdmin/paiementAdmin";
// import Footer from '../Footer'
import { Link } from '../../components/Wrappers'
 

// pages
 
// context
import { useLayoutState } from '../../context/LayoutContext'
import { ProductsProvider } from '../../context/ProductContext'
import registerAdmin from './InscriptionAdmin/registerAdmin'
import Emploie from './emploiesAdmin/EmploieAdmin'
import CongesAdmin from './CongeAdmin/CongeAdmin'
import MatiereAdmin from './matieresAdmin/MatiereAdmin'
import AddMatiere from './matieresAdmin/AddMatiere'
import DashboardAdmin from './DashboardAdmin/DashboardAdmin'
import ClassesAdmin from './classesAdmin/CalsssesAdmin'
import ProfAdmin from './ProfAdmin/ProfAdmin'
import Assuidite from './AssiduiteAdmin/AssiduiteAdmin'
import AddClasse from './classesAdmin/AddClasse'
import AddProfs from './ProfAdmin/AddProf'
import imggg from './InscriptionAdmin/img'
import Imggg from './InscriptionAdmin/img'
import AddEvent from './EventAdmin/EventAdmin'
 

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
                   <Route path="/admin/Dashboard" component={DashboardAdmin} /> 
                    <Route path="/admin/Inscription" component={Inscription} />
                    <Route path="/admin/paiement" component={PaimentAdmin} />
                    <Route path="/admin/emploies" component={Emploie} />
                    <Route path="/admin/Prof" component={ProfAdmin} />
                    <Route path="/admin/Assiduite" component={Assuidite} />
                    <Route path="/admin/classes" component={ClassesAdmin} />
                    <Route path="/admin/matiéres" component={MatiereAdmin} />
                    <Route path="/admin/Addmatiere" component={AddMatiere} />
                    <Route path="/admin/Register" component={registerAdmin} />
                    <Route path="/admin/conges" component={CongesAdmin} />
                    <Route path="/admin/addclasse" component={AddClasse} />
                    <Route path="/admin/addprof" component={AddProfs} />
                    <Route path="/admin/img" component={Imggg} />
                    <Route path="/admin/event" component={AddEvent} />
                </Switch>
             
                {/* <Footer>
                   
                </Footer> */}
            </div>
        </div>
    )
}

export default withRouter(Layout)
