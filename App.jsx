const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Notes } from './pages/Notes.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Home } from './pages/Home.jsx'
<<<<<<< HEAD
import { EmailList } from './apps/Mail/cmps/EmailList.jsx'
import { EmailDetails } from './apps/Mail/cmps/EmailDetails.jsx'
import {EmailApp} from './apps/Mail/Pages/EmailApp.jsx'
import {EmailCompose} from './apps/Mail/cmps/EmailCompose.jsx'
=======
// import { EmailList } from './apps/Mail/cmps/EmailList.jsx'
// import { EmailDetails } from './apps/Mail/cmps/EmailDetails.jsx'
// import {EmailApp} from './apps/Mail/pages/EmailApp.jsx'
>>>>>>> 4e19f2353c4315e3ad65544a6a978c262dd415e3
 

export function App() {
    return (
        <Router>
            <div className="page-layout-container">
                <AppHeader />

                <main className="container">
                    <Switch>
                        {/* MAIL ROUTES */}
<<<<<<< HEAD
                        <Route component={EmailDetails} path="/mail/:emailId" />
                        <Route component={EmailApp} path="/mail" />
                        <Route component={EmailCompose} path="/compose" />

=======
                        {/* <Route component={EmailDetails} path="/mail/:emailId" />
                        <Route component={EmailApp} path="/mail" /> */}
>>>>>>> 4e19f2353c4315e3ad65544a6a978c262dd415e3
                        
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