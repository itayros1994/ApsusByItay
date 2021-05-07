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
            <section className="note-from-mail-container">
                <div className="note-from-mail-title">Do you want to add the following note?</div>
                title: {noteTitle}<br />
                note: {noteContent}<br />
                <button onClick={this.onAddNote}>ADD</button>
                <button onClick={this.onCancelAdd}>NO</button>
            </section>
        )
    }
}