
import { mailService } from '../services/mailService.js'
export class EmailStarsStatus extends React.Component {

    componentDidMount() {
    }

    findStarsEmails = () => {
        if (!this.props.emails) return 'loading....' 
        return this.props.emails.filter((email) => email.isStar === true).length
    }

    render() {
        return <div className="unread-mails">({this.findStarsEmails()})</div>
    }
}