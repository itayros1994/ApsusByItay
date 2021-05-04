import { EmailPreview } from './EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
import { EmailDetails } from './EmailDetails.jsx'
import { EmailFilter } from "./EmailFilter.jsx"
export class EmailList extends React.Component {

    state = {
        emails: null
    }

    componentDidMount() {
        this.loadMails()
        console.log(this.props.emails)
    }

    loadMails() {
        mailService.getMails()
            .then(mails => this.setState({ emails: mails }))
    }

    render() {
        const { mails } = mailService
        return <div>
            <section>
                <div>{mails.map((email, idx) => <EmailPreview key={idx} email={email} />)}</div>
            </section>
        </div>
    }
}
