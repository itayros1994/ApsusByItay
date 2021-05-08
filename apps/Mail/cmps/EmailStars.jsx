import { mailService } from "../services/mailService.js"
import { EmailList } from "./EmailList.jsx"
const { Link } = ReactRouterDOM


export class EmailStars extends React.Component {

    state = {
        emails: []
    }
    componentDidMount() {
        this.loadMails()

    }

    onDeleteMail = (emailId) => {
        mailService.deleteEmail(emailId)
            .then(() => {
                this.loadMails()
            })
    }


    loadMails = () => {
        mailService.getMails()
            .then(mails => this.setState({ emails: mails }))
    }

    render() {
        const emails = this.state.emails.filter(email => email.isStar)
        return <div>
            <div className="stars-menu-container">
                <div className="stared-mailes-topic">Stared Mails ⭐</div>
                 <Link to={'/mail'}><span className="back-inbox-fromstars">Inbox 📨</span></Link>
            </div>
            {<EmailList onDeleteMail={this.onDeleteMail} emails={emails} />}
        </div>
    }

}
