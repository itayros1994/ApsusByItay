import { mailService } from '../services/mailService.js'

export class EmailCompose extends React.Component {

    state = {
        sendBy: null,
        tite: null,
        body: null
    }


    onAddMail(sendBy,title,body) {
        mailService.addMail(sendBy,title,body)
        this.props.history.push('/mail')

    }


    render() {
        const {sendBy , title, body} = this.state

        console.log('ada');
        return <div>
            <form className="add-email">
            <input type="text" value={sendBy} placeholder="your name" onChange={ (ev) => this.setState({sendBy : ev.target.value})} ></input>
            <input type="text" value={title} placeholder="Title" onChange={(ev) => this.setState({title : ev.target.value})}></input>
            <textarea name="textarea" value={body}
                rows="10" cols="100" onChange={(ev) => this.setState({body : ev.target.value})}>Write something here</textarea>
            <button onClick={() => this.onAddMail(sendBy,title,body)} >Send Email</button>
            </form>
                
        </div>
    }
}