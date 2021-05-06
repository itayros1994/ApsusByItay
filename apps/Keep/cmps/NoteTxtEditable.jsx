import { noteService } from '../../services/notes-service.js'
import { eventBusService } from '../......../services/event-bus-service.js'

const { withRouter } = ReactRouterDOM

export class _NoteTxtEditable extends React.Component {
    state = {
        isEditing: false,
        newTxt: ''
    }


    toggleEdit = () => {
        const { isEditing } = this.state
        this.setState({ isEditing: !isEditing })
    }

    handleChange = (ev) => {
        const newTxt = ev.target.value
        this.setState({ newTxt })
    }

    cancelChange = () => {
        this.setState({ newTxt: '', isEditing: false })
    }

    onChangeText = () => {
        const { isEditing, newTxt } = this.state
        if (!newTxt) {
            this.toggleEdit()
            return
        }
        noteService.editNoteTxt(this.props.id, newTxt)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Note text updated ', type: 'ntf-update' })
                this.setState({ isEditing: false, newTxt: '' })
                this.props.history.push('/notes')
            })

        this.toggleEdit()
    }


    render() {
        const { isEditing, newTxt } = this.state
        const { txt } = this.props

        return (
            <section>
                {!isEditing &&
                    <React.Fragment>
                        <div>{this.props.txt}</div>
                        <button onClick={this.toggleEdit}>Edit</button>
                    </React.Fragment>
                }

                {isEditing &&
                    <React.Fragment>
                        <textarea type="text" placeholder={txt} name="newTxt" value={newTxt} onChange={this.handleChange} />
                        <button onClick={this.cancelChange}>X</button>
                        <button onClick={this.onChangeText}>V</button>
                    </React.Fragment>
                }
            </section>
        )
    }
}

export const NoteTxtEditable = withRouter(_NoteTxtEditable)