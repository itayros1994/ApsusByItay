import { noteService } from '../../services/notes-service.js'
import { NoteEditor } from './NoteEditor.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteImg extends React.Component {
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
                    <div className="note-title">{info.title}</div>
                    <img src={info.url} className="note-img" />
                </div>

                <div className="note-editor-container">
                    <button onClick={this.onDeleteNote}>X</button>
                    <NoteEditor note={this.props.note} />
                </div>
            </div>
        )
    }
}

export const NoteImg = withRouter(_NoteImg)