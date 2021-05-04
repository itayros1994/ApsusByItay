import { EmailPreview } from '../cmps/EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
import { EmailDetails } from './EmailDetails.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'

export class EmailApp extends React.Component {

    state = {
        emails: null
    }

    componentDidMount() {
        this.loadMails()
        console.log(this.state.emails)
        console.log('fada')
    }

    loadMails() {
        mailService.getMails()
            .then(mails => this.setState({ emails: mails }))
    }

    render() {
        return <div>
            <section>
                <EmailFilter />
                <EmailList emails={this.state.emails}></EmailList>
                <EmailStatus emails={this.state.emails} />

            </section>
        </div>
    }
}
