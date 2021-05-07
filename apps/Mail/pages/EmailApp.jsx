const { Route, Switch } = ReactRouterDOM
import { EmailPreview } from '../cmps/EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
import { EmailDetails } from './EmailDetails.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { EmailStars } from '../cmps/SideBar.jsx'

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadMails()
        console.log(this.state.emails)
    }
    componentDidUpdate() {
        if (!this.state.emails)
            this.loadMails()
    }

    loadMails() {
        mailService.getMails(this.state.filterBy)
            .then(mails => this.setState({ emails: mails }))
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy)
        this.setState({ filterBy }, this.loadMails)
    }

    onDeleteMail = (emailId) => {
        mailService.deleteEmail(emailId)
            .then(() => {
                this.loadMails()
            })
    }

    render() {
        return (
            <div className="email-main-container">
                <SideBar emails={this.state.emails}></SideBar>
                <div className="actions-list-container">
                    <EmailFilter onSetFilter={this.onSetFilter} />
                    <Switch>
                        <Route component={EmailDetails} path="/mail/:emailId" />
                        <Route component={EmailStars} path="/mail/stars" />
                        <EmailList onDeleteMail={this.onDeleteMail} emails={this.state.emails}></EmailList>
                    </Switch>

                </div>

                {/* <EmailStatus emails={this.state.emails} /> */}
            </div>
        )

    }
}
