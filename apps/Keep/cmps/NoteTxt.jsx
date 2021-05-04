import { noteService } from '../../services/notes-service.js'

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

    handleBgcChange = (ev) => {
        noteService.changeNoteBgc(this.props.note.id, ev.target.value)
            .then(() => {
                this.props.history.push('/notes')
            })
    }


    render() {
        const { id, info, style } = this.props.note

        return (
            <div className="note-container" style={style}>
                <button onClick={this.onDeleteNote}>X</button>
                id: {id}<br />
                txt: {info.txt}<br /><br />

                Change BGC:
                <input type="color" onChange={this.handleBgcChange} value="#fff" /><br />
            </div>
        )
    }
}

export const NoteTxt = withRouter(_NoteTxt)