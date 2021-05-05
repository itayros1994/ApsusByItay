const { Link } = ReactRouterDOM
import { EmailPreview } from './EmailPreview.jsx'
export class EmailList extends React.Component {


    render() {
        const { emails } = this.props
        if(!emails) return ''
        return <div>
            <section>
                <div>
                    <Link className="email-compose" to={'/compose'}>Email Compose</Link>
                </div>
                <div>{emails.map((email, idx) => <EmailPreview key={idx} email={email} />)}</div>
            </section>
        </div>
    }
}
