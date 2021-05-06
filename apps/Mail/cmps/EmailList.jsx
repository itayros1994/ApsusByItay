const { Link } = ReactRouterDOM
import { EmailPreview } from './EmailPreview.jsx'
export class EmailList extends React.Component {


    render() {
        const { emails, onDeleteMail } = this.props
        if (!emails) return ''

        return <div className="cheak-itay-container">

            <div className="check-itay">
                <section className="email-list-container">
                    <div>
                        <button className="email-compose"><Link to={'/compose'}>+Compose</Link></button>
                    </div>
                    <div className="email-prev-cont">{emails.map((email, idx) => <EmailPreview onDeleteMail={onDeleteMail} key={idx} email={email} />)}</div>
                </section>
            </div>

        </div>

    }

}
