import React from 'react';
import Header from "../comptabilité/HeaderCompta/Header";
import Sidebar from "../comptabilité/SideBarCompta/Sidebar";
import structure from "../comptabilité/SideBarCompta/SidebarStructure";

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import ComptaFournisseur from './comptabilitéFournisseur/ComptaFournisseur';
import { useLayoutState } from '../../context/LayoutContext'

import useStyles from './styles'
import ComptaPaiement from './comptabilitéPaiement/comptaPaiement';
import ComptaFacture from './comptabilitéFacture/comptaFacture';
import ComptaProfs from './comptabilitéPorfs/comptaProfs';
import ComptaExel from './comptabilitéExel/comptaExel';
import ComptaCommande from './comptabilitéCommande/comptaCommande';
import ComptaHistorique from './comptabilitéHistorique/comptaHistorique';
import ComptaDashboard from './comptabilitéDashboard/comptabilitéDashboard';


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
                     <Route path="/comptabilite/Dashboard" component={ComptaDashboard} /> 
                    <Route path="/comptabilite/fournisseur" component={ComptaFournisseur} />
                    <Route path="/comptabilite/paiement" component={ComptaPaiement} />
                    <Route path="/comptabilite/factures" component={ComptaFacture} />
                    <Route path="/comptabilite/Prof" component={ComptaProfs} />
                    <Route path="/comptabilite/exel" component={ComptaExel} />
                    <Route path="/comptabilite/commande" component={ComptaCommande} />
                    <Route path="/comptabilite/historique" component={ComptaHistorique} />
                    
                </Switch>
             
                {/* <Footer>
                   
                </Footer> */}
            </div>
        </div>
)



}

export default withRouter(Layout)