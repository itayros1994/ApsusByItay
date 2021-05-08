const { Link } = ReactRouterDOM
import { EmailDetails } from "./EmailDetails.jsx"
import { EmailStatus } from "./EmailStatus.jsx"
import { mailService } from "../services/mailService.js"

export function EmailPreview({ email, onDeleteMail }) {

    function onEmailClicked() {
        mailService.isEmailRead(email.id)
    }
    function onAddStar(ev) {
        mailService.addStar(email.id, email.isStar)
    }

    return (

        <div className="email-preview-container">
            <Link onClick={onEmailClicked} to={`/mail/${email.id}`}>
                <div className={email.isRead ? "email-content" : "email-content email-read-bgc"} >
                    <div className="sendby-subject-container">
                    <div className="email-send-by"><span className="from">From : </span>{email.sendBy}</div>
                    <div className="email-subject"><span className="email-subject-prev">{email.subject}</span> : <span className="email-body-prev">{email.body.substring(0, 10)}</span></div>
                    </div>
                    {/* <Link onClick={onEmailClicked} to={`/mail/${email.id}`}>Read Email</Link> */}
                    <div className="email-prev-menu">
                        <div className={email.isRead ? "old-messege" : "new-messege"}>New Email</div>
                    <span className="email-sentAt">{email.sentAt}</span>
                        <span className="read-sign">{email.isRead ? '✔' : '📩'}</span>
                       <button className="email-star" onClick={onAddStar}>{email.isStar ? '⭐' : <span className="grey-star">⭐</span>}</button>
                        <button onClick={() => onDeleteMail(email.id)}>❌</button>
                    </div>

                </div>
            </Link>
        </div>
    )

}