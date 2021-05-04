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


    DynamicCmp = (note) => {
        console.log(note)
        switch (note.type) {
            case 'NoteText':
                return <NoteTxt note={note} key={note.id} />
            case 'NoteImg':
                return <NoteImg note={note} key={note.id} />
            case 'NoteTodos':
                return <NoteTodos note={note} key={note.id} />
            case 'NoteVideo':
                return <NoteVideo note={note} key={note.id} />
            default:
                return <div>Error loading note</div>
        }
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