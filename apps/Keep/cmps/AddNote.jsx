import { noteService } from '../../services/notes-service.js'
import { eventBusService } from '../......../services/event-bus-service.js'

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
        
        if (!title) {
            eventBusService.emit('show-user-ntf', { msg: 'Note title required', type: 'ntf-alarm' })
            return
        }
        if (!txt) {
            eventBusService.emit('show-user-ntf', { msg: 'Note content required', type: 'ntf-alarm' })
            return
        }

        noteService.addNote(type, title, txt)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note added successfully ', type: 'ntf-success' })
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
                <div className="add-note-container">
                    <form onSubmit={this.onAddNote}>
                        <input type="text" name="title" value={title} placeholder="New note title" onChange={this.handleChangeText} />

                        {type === "NoteText" &&
                            <textarea name="txt" value={txt} placeholder={this.formPlaceHolder + '...'} onChange={this.handleChangeText} />}

                        {type !== "NoteText" &&
                            <input type="text" name="txt" value={txt} placeholder={this.formPlaceHolder + '...'} onChange={this.handleChangeText} />}

                        <div className="add-note-actions-container text-center">
                            <div className="flex">
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
                            </div>

                            <input type="submit" className="pointer" value="Add note!" />
                        </div>
                    </form >
                </div>
            </React.Fragment>
        )
    }
}

export const AddNote = withRouter(_AddNote)