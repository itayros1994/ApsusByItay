const { Link } = ReactRouterDOM
import { mailService } from '../services/mailService.js'
import { SideBar } from '../cmps/SideBar.jsx'

export class EmailDetails extends React.Component {

  state = {
    // currEmail: '',
    emailId: null,
    replay: ''
  }

  onDeleteMail = () => {
    mailService.deleteEmail(this.state.currEmailId)
      .then(() => {
        this.props.history.push('/mail')
        console.log(this.props.history)
      })
  }

  onAddComment = () => {
    mailService.addComment(this.props.match.params.emailId, this.state.replay)
      // const id = this.props.match.params.emailId
      this.props.history.push(`/mail`)
      // .then(() => this.setState({ replay: '' }))
      // this.forceUpdate()
  }

  render() {
    const currEmail = mailService.getMailById(this.props.match.params.emailId)
    console.log(this.state.replay)
    if (!currEmail) return <div>'loading...'</div>

    return <div className="email-container">
      <section className="email">
        <div><Link className="back-mailbox" to={'/mail'}>➡</Link></div>
        <div className="email-body">{currEmail.sendBy} :  {currEmail.body}</div>
        <div className="email-replay"> Replay : {currEmail.replays}</div>
        <div className="inputs-container">
          <textarea value={this.state.replay} onChange={(ev) => this.setState({ replay: ev.target.value })} required placeholder="Replay Messege" name="textarea" rows="20" cols="100" >Write something here</textarea>
          <button className="comment-button" onClick={this.onAddComment}>Replay</button>
          <button onClick={this.onDeleteMail} className="delete-email">Delete Email</button>
        </div>
      </section>
    </div>
  }
}

// onChange={(ev) => this.setState({ body: ev.target.value })}
