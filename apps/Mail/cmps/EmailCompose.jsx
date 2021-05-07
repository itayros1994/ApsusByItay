import { mailService } from '../services/mailService.js'

export class EmailCompose extends React.Component {

    state = {
        sendBy: '',
        tite: '',
        body: ''
    }

    onAddMail(sendBy, title, body) {
        mailService.addMail(sendBy, title, body)
        this.props.history.push('/mail')
    }

    render() {
        console.log(this.state);
        const { sendBy, title, body } = this.state
        return <div>
        
            <form className="add-email">
                <div className="add-new-mail-title">New Mail</div>
                <input className="input-detail" required type="text" value={sendBy} placeholder="your name" onChange={(ev) => this.setState({ sendBy: ev.target.value })} ></input>
                <input className="input-detail" required type="text" value={title} placeholder="Title" onChange={(ev) => this.setState({ title: ev.target.value })}></input>
                <textarea className="textarea-detail" required placeholder="write text here" name="textarea" value={body}
                    rows="10" cols="100" onChange={(ev) => this.setState({ body: ev.target.value })}>Write something here</textarea>
                <button className="button-detail" onClick={() => this.onAddMail(sendBy, title, body)} >Send Email</button>
            </form>

        </div>
    }
}