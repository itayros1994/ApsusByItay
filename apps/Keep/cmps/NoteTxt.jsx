import { noteService } from '../../services/notes-service.js'
import { NoteEditor } from './NoteEditor.jsx'


const { withRouter } = ReactRouterDOM

export class _NoteTxt extends React.Component {
    state = {

    }


    onDeleteNote = () => {
        noteService.deleteNote(this.props.note.id)
            .then(() => {
                this.props.history.push('/notes')
            })
    }


    render() {
        const { id, info, isPinned, style } = this.props.note

        return (
            <div className="note-container">
                <div className="note-preview-container" style={style}>
                    <button onClick={this.onDeleteNote}>X</button>
                id: {id}<br />
                txt: {info.txt}<br />
                isPinned: {JSON.stringify(isPinned)}
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </div>
        )
    }
}

export const NoteTxt = withRouter(_NoteTxt)