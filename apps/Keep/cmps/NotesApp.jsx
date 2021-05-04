import { noteService } from '../services/notes-service.js'
import { AddNote } from '/AddNote.jsx'
import { NotePreview } from '/NotePreview.jsx'


export class NoteApp extends React.Component {
    state = {
        notes: null
    }


    componentDidMount() {
        this.loadNotes();
    }


    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }


    render() {
        const { notes } = this.state

        if (!notes) return <div>Loading...</div>

        return (
            <section>
                total notes: {this.state.notes.length}
                <AddNote />
                {notes.map(note => {
                    return <NotePreview note={note} key={note.id} />
                })}
            </section>
        )
    }
}