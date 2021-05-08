const { Route, Switch } = ReactRouterDOM
import { EmailPreview } from '../cmps/EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
import { EmailDetails } from '../cmps/EmailDetails.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { EmailStars } from '../cmps/EmailStars.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        isHamburgerOpen : false
    }
    removeEvent;

    componentDidMount() {
        this.loadMails()
        this.removeEvent = eventBusService.on('add-mail',this.loadMails())
    }
    componentDidUpdate() {
        if (!this.state.emails)
            this.loadMails()
    }
    componentWillUnmount(){
        this.removeEvent()
    }

    loadMails() {
        mailService.getMails(this.state.filterBy)
            .then(mails => this.setState({ emails: mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    onDeleteMail = (emailId) => {
        mailService.deleteEmail(emailId)
            .then(() => {
                this.loadMails()
            })
    }

    onHamburgerClick = () => {
        this.setState({isHamburgerOpen : !this.state.isHamburgerOpen})
    }

    render() {
        return (
            <div className="email-main-container">
                <SideBar isHamburgerOpen={this.state.isHamburgerOpen} emails={this.state.emails}></SideBar>
                <div className="actions-list-container">
                    <div className={`hamburger ${this.state.isHamburgerOpen ? 'hamburger-open' : 'hamburger-close' }`} onClick={this.onHamburgerClick}>☰</div>
                    <EmailFilter onSetFilter={this.onSetFilter} />
                    <Switch>
                        <Route component={EmailDetails} path="/mail/:emailId" />
                        {/* <Route component={EmailStars} path="/mail/stars" /> */}
                        <EmailList onDeleteMail={this.onDeleteMail} emails={this.state.emails}></EmailList>
                    </Switch>

                </div>

                {/* <EmailStatus emails={this.state.emails} /> */}
            </div>
        )

    }
}
