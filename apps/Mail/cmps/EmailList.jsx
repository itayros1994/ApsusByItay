import { EmailPreview } from './EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
import { EmailDetails } from './EmailDetails.jsx'
export class EmailList extends React.Component {

    render() {
        const { mails } = mailService
        return <div>
            <section></section>
            {mails.map((email, idx) =><EmailPreview key={idx} email={email}/>)}

        </div>
    }
}
