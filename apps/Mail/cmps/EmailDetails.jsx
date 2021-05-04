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
    this.setState({emailId : id});
    const mails = mailService.mails
    // Finding the Curr email By Find Id
    var currEmail = mails.find(mail => mail.id === id)
    this.setState({ currEmail: currEmail.body })
    console.log(this.state.currEmailId)
    console.log(id)
  }

  render() {
    return <div className="email-container">
      <section className="email">
        {this.state.currEmail} <span onClick={this.onDeleteMail} className="delete-email">X</span>
      </section>
    </div>
  }
}


