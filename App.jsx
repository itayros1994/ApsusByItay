const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Home } from './pages/Home.jsx'
import { Notes } from './apps/Keep/pages/NotesApp.jsx'
import { AddNoteFromMail } from './apps/Keep/pages/AddNoteFromMail.jsx'
import { EmailDetails } from './apps/Mail/cmps/EmailDetails.jsx'
import {EmailApp} from './apps/Mail/Pages/EmailApp.jsx'
import {EmailCompose} from './apps/Mail/cmps/EmailCompose.jsx'
import {EmailStars} from './apps/Mail/cmps/EmailStars.jsx'
 

export function App() {
    return (
        <Router>
            <div className="page-layout-container">
                <AppHeader />
                <div className="main-spacer"></div>

                <main className="container">
                    <Switch>
                        {/* MAIL ROUTES */}
                        <Route component={EmailDetails} path="/mail/:emailId" />
                        <Route component={EmailApp} path="/mail" />
                        <Route component={EmailStars} path="/stars" />
                        <Route component={EmailCompose} path="/compose" />

                        
                        {/* KEEP ROUTES */}
                        <Route component={AddNoteFromMail} path="/notes/add/:noteTitle/:noteContent" />
                        <Route component={Notes} path="/notes" />

                        {/* APP ROUTES */}
                        <Route component={AboutUs} path="/about" />
                        <Route component={Home} exact path="/" />
                    </Switch>
                </main>

                <AppFooter />

            </div>
        </Router>
    )
}