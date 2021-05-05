const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Notes } from './pages/Notes.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Home } from './pages/Home.jsx'
import { EmailList } from './apps/Mail/cmps/EmailList.jsx'
import { EmailDetails } from './apps/Mail/cmps/EmailDetails.jsx'
<<<<<<< HEAD
import { EmailApp } from './apps/Mail/pages/EmailApp.jsx'

=======
import {EmailApp} from './apps/Mail/Pages/EmailApp.jsx'
import {EmailCompose} from './apps/Mail/cmps/EmailCompose.jsx'
 
>>>>>>> 9fb9d7fe929dd06a0608c69e03aff09f082e6078

export function App() {
    return (
        <Router>
            <div className="page-layout-container">
                <AppHeader />

                <main className="container">
                    <Switch>
                        {/* MAIL ROUTES */}
                        <Route component={EmailDetails} path="/mail/:emailId" />
                        <Route component={EmailApp} path="/mail" />
                        <Route component={EmailCompose} path="/compose" />

<<<<<<< HEAD

=======
                        
>>>>>>> 9fb9d7fe929dd06a0608c69e03aff09f082e6078
                        {/* KEEP ROUTES */}
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