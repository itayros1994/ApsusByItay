const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Notes } from './pages/Notes.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Home } from './pages/Home.jsx'
import { EmailDetails } from './apps/Mail/cmps/EmailDetails.jsx'
import {EmailApp} from './apps/Mail/Pages/EmailApp.jsx'
import {EmailCompose} from './apps/Mail/cmps/EmailCompose.jsx'
 

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