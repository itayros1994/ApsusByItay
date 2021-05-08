import { noteService } from '../services/notes-service.js'
import { eventBusService } from '../../../services/event-bus-service.js'

export class AddNoteFromMail extends React.Component {
    onAddNote = () => {
        const { noteTitle, noteContent } = this.props.match.params
        noteService.addNote('NoteText', noteTitle, noteContent)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note added successfully ', type: 'ntf-success' })
                this.props.history.push('/notes')
            })
    }

    onCancelAdd = () => {
        this.props.history.push('/mail')
    }


    render() {
        const { noteTitle, noteContent } = this.props.match.params

        return (
            <section className="container note-from-mail-container">
                <div className="note-from-mail-question">Do you want to add the following note?</div>
                <div className="note-from-mail-title"><span>Title</span>: {noteTitle}</div>
                <div className="note-from-mail-content"><span>Note</span>: {noteContent}</div>
                <div className="text-center note-from-mail-btns-container">
                    <button className="pointer" onClick={this.onAddNote}>ADD</button>
                    <button className="pointer" onClick={this.onCancelAdd}>NO</button>
                </div>
            </section>
        )
    }
}