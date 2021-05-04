import { noteService } from '../../services/notes-service.js'
import { NoteEditor } from './NoteEditor.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteTodos extends React.Component {
    state = {

    }


    onDeleteNote = () => {
        noteService.deleteNote(this.props.note.id)
            .then(() => {
                this.props.history.push('/notes')
            })
    }


    render() {
        const { id, info, style } = this.props.note

        return (
            <div className="note-container">
                <div className="note-preview-container" style={style}>
                    <button onClick={this.onDeleteNote}>X</button>
                id: {id}<br />
                title: {info.label}<br />
                todos: {JSON.stringify(info.todos)}
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </div>
        )
    }
}

export const NoteTodos = withRouter(_NoteTodos)