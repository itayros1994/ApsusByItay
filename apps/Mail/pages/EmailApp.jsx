import { EmailPreview } from '../cmps/EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
<<<<<<< HEAD
// import { EmailDetails } from './EmailDetails.jsx'
=======
import { EmailDetails } from './EmailDetails.jsx'
>>>>>>> 9fb9d7fe929dd06a0608c69e03aff09f082e6078
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

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

    render() {
        return <div>
            <section>
                <h1 className="email-topic">Emails Box</h1>
                <div className='page-content-container'>
                    <div className='page-content'>
                        <EmailFilter onSetFilter={this.onSetFilter} />
                        <EmailList emails={this.state.emails}></EmailList>
                        <EmailStatus emails={this.state.emails} />
                    </div>
                </div>
            </section>
        </div>
    }
}
