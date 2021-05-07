import { noteService } from '../../services/notes-service.js'
import { eventBusService } from '../../../../services/event-bus-service.js'

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
            <section className="note-text-content-container">
                {!isEditing &&
                    <React.Fragment>
                        <button className="pointer float-right fas note-edit-btn" onClick={this.toggleEdit}></button>
                        <div className="fl-uppercase">{this.props.txt}</div>
                    </React.Fragment>
                }

                {isEditing &&
                    <React.Fragment>
                        <textarea className="note-text-edit-textarea" type="text" placeholder={txt} name="newTxt" value={newTxt} onChange={this.handleChange} />
                        <button className="pointer fas note-edit-confirm" onClick={this.onChangeText}></button>
                        <button className="pointer fas note-edit-cancel" onClick={this.cancelChange}></button>
                    </React.Fragment>
                }
            </section>
        )
    }
}

export const NoteTxtEditable = withRouter(_NoteTxtEditable)