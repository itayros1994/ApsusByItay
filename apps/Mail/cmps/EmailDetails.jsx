import { mailService } from '../services/mailService.js'

export class EmailDetails extends React.Component {

  state = {
    currEmail: '',
    emailId: null
  }

  componentDidMount() {
    this.loadEmail()
    console.log(mailService.mails)
  }

  onDeleteMail = () => {
    mailService.deleteEmail(this.state.currEmailId)
      .then(() => {
        this.props.history.push('/mail')
        console.log('hey')
      })
  }

  loadEmail = () => {
    const id = this.props.match.params.emailId
    const mail = mailService.getMailById(id)
    this.setState({ currEmail: mail })
  }

  render() {
    if(!this.state.currEmail) return <div>'loading...'</div>
    return <div className="email-container">
      <section className="email">
        <div>{this.state.currEmail.body}</div> <span onClick={this.onDeleteMail} className="delete-email">X</span>
      </section>
    </div>
  }
}


