import { mailService } from "../services/mailService.js"
import { EmailList } from "./EmailList.jsx"


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
        return <div>{<EmailList onDeleteMail={this.onDeleteMail} emails={emails}/>}</div>
    }

}
