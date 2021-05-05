import { noteService } from '../../services/notes-service.js'

const { withRouter } = ReactRouterDOM

export class _AddNote extends React.Component {
    state = {
        type: "NoteText",
        value: null
    }


    onAddNote = (ev) => {
        const { type, value } = this.state
        ev.preventDefault()
        noteService.addNote(type, value)
            .then(() => {
                this.props.history.push('/notes')
            })
    }

    handleChangeText = (ev) => {
        const value = ev.target.value
        this.setState({ value })
    }

    handleTypeChange = (value) => {
        this.setState({ type: value })
    }

    get formPlaceHolder() {
        switch (this.currNoteType) {
            case 'NoteText':
                return "Whats on you're mind"
            case 'NoteTodos':
                return "Enter comma seperated list"
            case 'NoteImg':
                return "Enter Image URL"
            case 'NoteVideo':
                return "Enter Video URL"
        }
    }

    get currNoteType() {
        return this.state.type
    }


    render() {
        return (
            <form onSubmit={this.onAddNote} className="add-note-form">
                <input type="text" size="40" placeholder={this.formPlaceHolder + '...'} onChange={this.handleChangeText} />
                <span onClick={() => { this.handleTypeChange("NoteText") }}>
                    <i className={"pointer fas fa-text notes-type-btn" + (this.state.type === 'NoteText' ? ' notes-type-btn-active' : '')}></i>
                </span>

                <span onClick={() => { this.handleTypeChange("NoteTodos") }}>
                    <i className={"pointer fas fa-list notes-type-btn" + (this.state.type === 'NoteTodos' ? ' notes-type-btn-active' : '')}></i>
                </span>

                <span onClick={() => { this.handleTypeChange("NoteImg") }}>
                    <i className={"pointer fas fa-img notes-type-btn" + (this.state.type === 'NoteImg' ? ' notes-type-btn-active' : '')}></i>
                </span>

                <span onClick={() => { this.handleTypeChange("NoteVideo") }}>
                    <i className={"pointer fab fa-video notes-type-btn" + (this.state.type === 'NoteVideo' ? ' notes-type-btn-active' : '')}></i>
                </span>

                <input type="submit" value="Add note!" />
            </form >
        )
    }
}

export const AddNote = withRouter(_AddNote)