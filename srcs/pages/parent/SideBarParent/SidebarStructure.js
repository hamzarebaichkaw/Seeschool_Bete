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
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PaymentIcon from '@material-ui/icons/Payment';

import AssignmentIcon from '@material-ui/icons/Assignment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ForumIcon from '@material-ui/icons/Forum';
const structure = [
    { id: 100, label: 'Profile', link: '/parent/profile', icon: <HomeIcon /> },
    { id: 51, label: ' Cours et exercices', link: '/parent/cours', icon: <BorderAllIcon /> },
    { id: 50, label: ' Emploie ', link: '/parent/emploie', icon: <AssignmentIcon /> },
  
    { id: 52, label: ' Notification ', link: '/parent/notification', icon: <NotificationsNoneIcon /> },
    { id: 53, label: '  notes ', link: '/parent/notes', icon: <EventNoteIcon /> },
    { id: 54, label: ' Events', link: '/parent/events', icon: <ForumIcon /> },
    { id: 55, label: ' Absences', link: '/parent/absence', icon: < AccessTimeIcon /> },
    { id: 56, label: ' HomeWork', link: '/parent/HomeWork', icon: < CreateIcon /> },
    { id: 56, label: ' Paiement', link: '/parent/payement', icon: <PaymentIcon /> },
    { id: 56, label: ' Support', link: '/parent/Support', icon: <HelpOutlineIcon /> },
    
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
