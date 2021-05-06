const { Link } = ReactRouterDOM
import { EmailPreview } from './EmailPreview.jsx'
export class EmailList extends React.Component {


    render() {
        const { emails, onDeleteMail } = this.props
        if (!emails) return ''

        return (
            <div className="email-list-container">
                {emails.map((email, idx) => <EmailPreview onDeleteMail={onDeleteMail} key={idx} email={email} />)}
            </div>
        )

    }

}
