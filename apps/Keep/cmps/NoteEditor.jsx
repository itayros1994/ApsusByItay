import { noteService } from '../../services/notes-service.js'
import { eventBusService } from '../../../../services/event-bus-service.js'

const { Link, withRouter } = ReactRouterDOM

export class _NoteEditor extends React.Component {
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
                eventBusService.emit('show-user-ntf', { msg: 'Note pin status updated ', type: 'ntf-update' })
                this.props.history.push('/notes')
            })
    }

    onChangeBgcColor = (nId, color) => {
        noteService.changeBgcColor(nId, color)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note background color updated ', type: 'ntf-update' })
                this.props.history.push('/notes')
            })
    }

    onCopyToClipboard = (nId) => {
        noteService.getNoteTxtToCopy(nId)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note copied to clipboard ', type: 'ntf-success' })
            })
    }

    onSendAsMail = (nId) => {
        const subject = noteService.getNoteTitle(nId)

        console.log(subject)
    }

    onDeleteNote = (nId) => {
        noteService.deleteNote(nId)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note deleted successfully ', type: 'ntf-alarm' })
                this.props.history.push('/notes')
            })
    }


    render() {
        const { id, isPinned, style } = this.props.note
        return (
            <div className="note-editor-container">
                <span className="note-editor-type-symbol">{this.getNoteSymbol()}</span>

                <span className="pointer note-editor-pin" title="Toggle pin note">
                    <img src={isPinned ? "./apps/Keep/assets/img/unpin.png" : "./apps/Keep/assets/img/pin.png"}
                        onClick={() => { this.onTogglePin(id) }} />
                </span>

                <span className="fas note-editor-color-picker" title="Change note background color" style={{ color: style.backgroundColor }}>
                    <input className="pointer note-editor-hider" type="color" onChange={(ev) => { this.onChangeBgcColor(id, ev.target.value) }} />
                </span>

                <span className="fas pointer note-editor-copy" title="Copy note to clipboard" onClick={() => { this.onCopyToClipboard(id) }}></span>

                <span className="fas pointer note-editor-mail" title="Send note as mail" onClick={() => { this.onSendAsMail(id) }}></span>

                <span className="fas pointer note-editor-delete" title="Delete note" onClick={() => { this.onDeleteNote(id) }}></span>
            </div>
        )
    }
}

export const NoteEditor = withRouter(_NoteEditor)