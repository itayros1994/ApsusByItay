const { Link } = ReactRouterDOM
import { EmailDetails } from "./EmailDetails.jsx"
import {EmailStatus} from "./EmailStatus.jsx"
export function EmailPreview({ email , isEmailRead }) {

    return (
        <div>
            <div className="emails-container">

                Subject : {email.subject} isRead? : {email.isRead}
                <Link to={`/mail/${email.id}`}>Email</Link> <span><EmailStatus isEmailRead={isEmailRead}/></span>
            </div>
        </div>
    )

}