import { EmailPreview } from '../cmps/EmailPreview.jsx'
import { mailService } from '../services/mailService.js'
import { EmailDetails } from './EmailDetails.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadMails()
        console.log(this.state.emails)
    }
    componentDidUpdate() {
        if (!this.state.emails)
            this.loadMails()
    }

    loadMails() {
        mailService.getMails(this.state.filterBy)
            .then(mails => this.setState({ emails: mails }))
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy)
        this.setState({ filterBy }, this.loadMails)
    }

     onDeleteMail =(emailId) => {
        mailService.deleteEmail(emailId)   
          .then(() => {
              this.loadMails()
          })
      }

    render() {
        return <div>
            <section>
                <h1 className="email-topic">gGays</h1>
                <div className='page-content-container'>
                    <div className='page-content'>
                        <EmailFilter onSetFilter={this.onSetFilter} />
                        <EmailList onDeleteMail={this.onDeleteMail} emails={this.state.emails}></EmailList>
                        <EmailStatus emails={this.state.emails} />
                    </div>
                </div>
            </section>
        </div>
    }
}
