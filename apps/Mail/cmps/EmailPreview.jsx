const { Link } = ReactRouterDOM
import { EmailDetails } from "./EmailDetails.jsx"
import { EmailStatus } from "./EmailStatus.jsx"
import { mailService } from "../services/mailService.js"

export function EmailPreview({ email }) {

    function onEmailClicked() {
        mailService.isEmailRead(email.id)
        console.log('asd');
    }

    return (
        <div>
            <div className="emails-container">
               <div>Subject : {email.subject} :</div> 
                <Link onClick={onEmailClicked} to={`/mail/${email.id}`}>Email</Link>
            </div>
        </div>
    )

}