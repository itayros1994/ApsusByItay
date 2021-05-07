import { noteService } from '../../services/notes-service.js'
// import { eventBusService } from '../......../services/event-bus-service.js'
import { eventBusService } from '../../../services/event-bus-service.js'
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
            <section className="note-title">
                {!isEditing &&
                    <React.Fragment>
                        <div>{title}</div>
                        <button onClick={this.toggleEditing}>edit</button>
                    </React.Fragment>}


                {isEditing &&
                    <React.Fragment>
                        <input type="text" placeholder={title} name="newTitle" value={newTitle} onChange={this.handleChange} />
                        <button onClick={this.onChangeTitle}>V</button>
                        <button onClick={this.onCancelChange}>X</button>
                    </React.Fragment>}
            </section>
        )
    }
}

export const NoteTitleEditable = withRouter(_NoteTitleEditable)