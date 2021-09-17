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
    CheckBox as CheckBoxIcon,
    Payment as PaymentIcon,
    TouchApp as ProfIcon,
    AccessTime as EmploiesIcon,
    RecordVoiceOver as AssiduiteIcon,
    Dashboard as ClassIcon,
    Dns as SubjectIcon,
    EmojiEvents as EventIcon,
    CalendarToday as CongesIcon,
    AssignmentInd as InscriptionIcon,
    
      
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/styles'
 

 
import ForumIcon from '@material-ui/icons/Forum';
const structure = [
    { id: 100, label: 'Dashboard', link: '/Admin/Dashboard', icon: <HomeIcon /> },
    { id: 50, label: 'Gestion des Inscriptions ', link: '/admin/Inscription', icon: <InscriptionIcon /> },
    { id: 51, label: 'Gestion de Paiements', link: '/admin/paiement', icon: <PaymentIcon/> },
    { id: 52, label: 'Gestion des Emplois', link: '/admin/emploies', icon: <EmploiesIcon /> },
    { id: 53, label: 'Gestion des Professeurs', link: '/admin/Prof', icon: <ProfIcon /> },
    { id: 54, label: 'Gestion des Assiduités', link: '/admin/Assiduite', icon: <AssiduiteIcon /> },
    { id: 55, label: 'Gestion des Classes', link: '/admin/classes', icon: <ClassIcon /> },
    { id: 56, label: 'Gestion des Matières', link: '/admin/matieres', icon: <SubjectIcon /> },
    { id: 57, label: 'Gestion des Congés', link: '/admin/conges', icon: <CongesIcon /> },
    { id: 58, label: 'Gestion des Évènements', link: '/admin/event', icon: <EventIcon /> },
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
