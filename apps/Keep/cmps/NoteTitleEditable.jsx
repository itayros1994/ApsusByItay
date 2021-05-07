import { noteService } from '../../services/notes-service.js'
import { eventBusService } from '../../../../services/event-bus-service.js'

const { withRouter } = ReactRouterDOM

export class _NoteTitleEditable extends React.Component {
    state = {
        isTodos: false,
        isEditing: false,
        newTitle: ''
    }


    componentDidMount() {
        if (this.props.todos) this.setState({ isTodos: true })
    }


    onCancelChange = () => {
        this.setState({ isEditing: false, newTitle: '' })
    }

    toggleEditing = () => {
        const { isEditing } = this.state
        this.setState({ isEditing: !isEditing })
    }

    handleChange = (ev) => {
        const newTitle = ev.target.value
        this.setState({ newTitle })
    }

    onChangeTitle = () => {
        const { newTitle, isTodos } = this.state
        if (!newTitle) {
            this.toggleEditing()
            return
        }
        noteService.editNoteTitle(this.props.id, newTitle, isTodos)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note title updated ', type: 'ntf-update' })
                this.setState({ isEditing: false, newTitle: '' })
                this.props.history.push('/notes')
            })

        this.toggleEditing()
    }


    render() {
        const { title } = this.props
        const { isEditing, newTitle } = this.state

        return (
            <React.Fragment>
                {!isEditing &&
                    <section className="flex space-between align-center note-title">
                        <div>{title}</div>
                        <button className="pointer fas note-edit-btn note-edit-title-btn" onClick={this.toggleEditing}></button>
                    </section>}


                {isEditing &&
                    <section className="flex space-between align-center note-title">
                        <input className="note-edit-title-input" type="text" placeholder={title} name="newTitle" value={newTitle} onChange={this.handleChange} />
                        <div>
                            <button className="pointer fas note-edit-confirm" onClick={this.onChangeTitle}></button>
                            <button className="pointer fas note-edit-cancel" onClick={this.onCancelChange}></button>
                        </div>
                    </section>}
            </React.Fragment>
        )
    }
}

export const NoteTitleEditable = withRouter(_NoteTitleEditable)