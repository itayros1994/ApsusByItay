import { noteService } from '../services/notes-service.js'
import { AddNote } from '/AddNote.jsx'
import { NoteFilter } from '/NoteFilter.jsx'
import { NotePreview } from '/NotePreview.jsx'


export class NoteApp extends React.Component {
    state = {
        notes: null,
        filterTxt: ''
    }


    componentDidMount() {
        this.loadNotes()
    }


    loadNotes = () => {
        noteService.query(this.state.filterTxt)
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSetFilter = (filterTxt) => {
        this.setState({ filterTxt }, this.loadNotes)
    }

    get filterPinned() {
        return this.state.notes.filter((note) => {
            return note.isPinned
        })
    }

    get filterNotPinned() {
        return this.state.notes.filter((note) => {
            return !note.isPinned
        })
    }


    render() {
        const { notes } = this.state

        if (!notes) return <div>Loading...</div>

        return (
            <section>
                total notes: {this.state.notes.length}
                <AddNote />
                <NoteFilter onSetFilter={this.onSetFilter} />

                <div className="note-ispinned-title">pinned:</div>
                <div className="notes-container">
                    {this.filterPinned.map(note => {
                        return <NotePreview note={note} key={note.id} />
                    })}
                </div>

                <div className="note-ispinned-title">not pinned:</div>
                <div className="notes-container">
                    {this.filterNotPinned.map(note => {
                        return <NotePreview note={note} key={note.id} />
                    })}
                </div>
            </section >
        )
    }
}