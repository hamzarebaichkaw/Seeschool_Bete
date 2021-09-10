import React from 'react'
import {
    Home as HomeIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,
    BarChart as ChartIcon,
    Map as MapIcon,
    Apps as CoreIcon,
    Description as DescriptionIcon,
    ShoppingCart as ShoppingCartIcon,
    StarBorder as ExtraIcon,
    Chat as ChatIcon,
    Add as AddSectionIcon,
    FolderOpen as FolderIcon,
    Description as DocumentationIcon,
    Person as PersonIcon,
    AccountCircle as ProfileIcon,
    Schedule as ScheduleIcon,
    NotificationsNone as NotificationsNoneIcon,
    Create as CreateIcon,
    BorderAll as BorderAllIcon,
    CheckBox as CheckBoxIcon
} from '@material-ui/icons'
import ViewCompactRoundedIcon from '@material-ui/icons/ViewCompactRounded';
import { makeStyles } from '@material-ui/styles'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LiveTvIcon from '@material-ui/icons/LiveTv';
// components
import Dot from './components/Dot'
 
import AssignmentIcon from '@material-ui/icons/Assignment';
 
import ForumIcon from '@material-ui/icons/Forum';
const structure = [
    { id: 100, label: 'Dashboard', link: '/Admin/Dashboard', icon: <HomeIcon /> },
    { id: 50, label: 'Gestion des inscriptions ', link: '/admin/Inscription', icon: <AssignmentIcon /> },
    { id: 51, label: 'Gestion de paiement', link: '/admin/paiement', icon: <BorderAllIcon /> },
    { id: 52, label: 'Gestion des emploies ', link: '/admin/emploies', icon: <NotificationsNoneIcon /> },
    { id: 53, label: 'Gestion des professeurs', link: '/admin/Prof', icon: <ForumIcon /> },
    { id: 54, label: 'Gestion des assuidités', link: '/admin/Assiduite', icon: <ForumIcon /> },
    { id: 55, label: 'Gestion des classes', link: '/admin/classes', icon: <ForumIcon /> },
    { id: 56, label: 'Gestion des matiéres', link: '/admin/matiéres', icon: <ForumIcon /> },
    { id: 57, label: 'Gestion des Conge', link: '/admin/conges', icon: <ForumIcon /> },
    { id: 58, label: 'Ajouter un Evenement', link: '/admin/event', icon: <ForumIcon /> },
]

function AddSection() {
    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '50%',
            height: 30,
            width: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
        },
    }))

    const classes = useStyles()

    return (
        <section className={classes.root}>
            <AddSectionIcon />
        </section>
    )
}

function Chat() {
    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
            height: 45,
            width: 45,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
        },
    }))

    const classes = useStyles()

    return (
        <>
            <section className={classes.root}>
                <ChatIcon />
            </section>
        </>
    )
}

export default structure
