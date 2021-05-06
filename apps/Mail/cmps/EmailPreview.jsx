const { Link } = ReactRouterDOM
import { EmailDetails } from "./EmailDetails.jsx"
import { EmailStatus } from "./EmailStatus.jsx"
import { mailService } from "../services/mailService.js"

export function EmailPreview({ email, onDeleteMail }) {

    function onEmailClicked() {
        mailService.isEmailRead(email.id)
        console.log('asd');
    }

    return (

        <div className="email-preview-container">
            <Link onClick={onEmailClicked} to={`/mail/${email.id}`}>
                <div className="emails-container">
                    <div className="email-send-by">SendBy : {email.sendBy}</div>
                    <div className="email-subject"><span className="email-subject-prev">{email.subject}</span> : <span className="email-body-prev">{email.body.substring(0, 10)}</span></div>
                    <div className="email-read">{email.isRead ? '📨' : '✉️'}</div>
                    {/* <div className="email-sentAt">{email.sentAt}</div> */}
                    {/* <Link onClick={onEmailClicked} to={`/mail/${email.id}`}>Read Email</Link> */}
                    <button onClick={() => onDeleteMail(email.id)}>❌</button>
                </div>
            </Link>
        </div>
    )

}