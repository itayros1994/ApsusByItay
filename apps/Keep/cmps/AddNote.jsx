import { noteService } from '../../services/notes-service.js'

const { withRouter } = ReactRouterDOM

export class _AddNote extends React.Component {
    state = {
        type: 'NoteText',
        title: '',
        txt: ''
    }


    onAddNote = (ev) => {
        ev.preventDefault()
        const { type, title, txt } = this.state
        if (!txt || !title) return

        noteService.addNote(type, title, txt)
            .then(() => {
                this.setState({ txt: '' })
                this.setState({ title: '' })
                this.props.history.push('/notes')
            })
    }

    handleChangeText = (ev) => {
        const key = ev.target.name
        const txt = ev.target.value
        this.setState({ [key]: txt })
    }

    handleTypeChange = (type) => {
        this.setState({ type })
    }

    get formPlaceHolder() {
        switch (this.currNoteType) {
            case 'NoteText':
                return 'Whats on you\'re mind'
            case 'NoteTodos':
                return 'Enter comma seperated list'
            case 'NoteImg':
                return 'Enter Image URL'
            case 'NoteVideo':
                return 'Enter Video URL'
        }
    }

    get currNoteType() {
        return this.state.type
    }


    render() {
        const { type, title, txt } = this.state

        return (
            <React.Fragment>
                <form onSubmit={this.onAddNote} className="add-note-form">
                    <input type="text" size="40" name="title" value={title} placeholder="New note title" onChange={this.handleChangeText} /><br />
                    <input type="text" size="40" name="txt" value={txt} placeholder={this.formPlaceHolder + '...'} onChange={this.handleChangeText} />

                    <span onClick={() => { this.handleTypeChange("NoteText") }}>
                        <i className={"pointer fas fa-text notes-type-btn" + (type === 'NoteText' ? ' notes-type-btn-active' : '')}></i>
                    </span>

                    <span onClick={() => { this.handleTypeChange("NoteTodos") }}>
                        <i className={"pointer fas fa-list notes-type-btn" + (type === 'NoteTodos' ? ' notes-type-btn-active' : '')}></i>
                    </span>

                    <span onClick={() => { this.handleTypeChange("NoteImg") }}>
                        <i className={"pointer fas fa-img notes-type-btn" + (type === 'NoteImg' ? ' notes-type-btn-active' : '')}></i>
                    </span>

                    <span onClick={() => { this.handleTypeChange("NoteVideo") }}>
                        <i className={"pointer fab fa-video notes-type-btn" + (type === 'NoteVideo' ? ' notes-type-btn-active' : '')}></i>
                    </span>

                    <input type="submit" value="Add note!" />
                </form >
            </React.Fragment>
        )
    }
}

export const AddNote = withRouter(_AddNote)