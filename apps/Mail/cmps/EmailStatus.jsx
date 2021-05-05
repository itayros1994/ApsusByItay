import { mailService } from '../services/mailService.js'
export class EmailStatus extends React.Component {

    componentDidMount() {
    }

    findReadingEmails = () => {
        if (!this.props.emails) return 'loading....' 
        return this.props.emails.filter((email) => email.isRead === false).length
    }

    render() {
        return <div className="unread-mails">Unread Mails :  {this.findReadingEmails()}</div>
    }
}