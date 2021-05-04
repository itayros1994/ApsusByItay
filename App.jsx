const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Notes } from './pages/Notes.jsx'
import { Mail } from './pages/Mail.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Home } from './pages/Home.jsx'


export function App() {
    return (
        <Router>
            <div className="page-layout-container">
                <AppHeader />

                <main className="container">
                    <Switch>
                        <Route component={Mail} path="/mail" />
                        <Route component={Notes} path="/notes" />
                        <Route component={AboutUs} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>

                <AppFooter />

            </div>
        </Router>
    )
}