const { Link } = ReactRouterDOM
import { EmailDetails } from "./EmailDetails.jsx"

export function EmailPreview({ email }) {

    return (
        <div>
            <div className="emails-container">
                Subject : {email.subject} isRead? : {email.isRead}
                <Link to={`/mail/${email.id}`}>Email</Link>
            </div>
        </div>
    )

}