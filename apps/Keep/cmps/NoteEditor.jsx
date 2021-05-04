import { noteService } from '../../services/notes-service.js'

const { withRouter } = ReactRouterDOM

export class _NoteEditor extends React.Component {
    state = {

    }


    getNoteSymbol() {
        const { type } = this.props.note
        switch (type) {
            case 'NoteText':
                return <i className="fas fa-text font-normal" title="Text note"></i>
            case 'NoteTodos':
                return <i className="fas fa-list font-normal" title="Todos note"></i>
            case 'NoteImg':
                return <i className="fas fa-img font-normal" title="Image note"></i>
            case 'NoteVideo':
                return <i className="fab fa-video font-normal" title="Video note"></i>
            default:
                return <div>Error loading note Editor</div>
        }
    }

    onTogglePin = (nId) => {
        noteService.togglePin(nId)
            .then(() => {
                this.props.history.push('/notes')
            })
    }

    onChangeBgcColor = (nId, color) => {
        noteService.changeBgcColor(nId, color)
            .then(() => {
                this.props.history.push('/notes')
            })
    }

    onCopyToClipboard = (nId) => {
        noteService.getNoteTxtToCopy(nId)
        .then(() => {
        })
    }


    render() {
        const { id, isPinned, style } = this.props.note
        return (
            <div className="note-editor-container">
                <span className="note-editor-type-symbol">{this.getNoteSymbol()}</span>

                <span className="note-editor-pin">
                    <img src={isPinned ? "./apps/Keep/assets/img/unpin.png" : "./apps/Keep/assets/img/pin.png"}
                        onClick={() => { this.onTogglePin(id) }} />
                </span>

                <span className="fas note-editor-color-picker" style={{ color: style.backgroundColor }}>
                    <input className="note-editor-hider" type="color" onChange={(ev) => { this.onChangeBgcColor(id, ev.target.value) }} />
                </span>

                <span className="fas note-editor-copy" onClick={() => { this.onCopyToClipboard(id) }}></span>
            </div>
        )
    }
}

export const NoteEditor = withRouter(_NoteEditor)