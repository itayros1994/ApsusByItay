import { utilService } from '../../../../services/util-service.js'
import { eventBusService } from '../../../../services/event-bus-service.js'
import { noteService } from '../../services/notes-service.js'

const { withRouter } = ReactRouterDOM

export class _TodoPreview extends React.Component {
    state = {
        isEditing: false,
        editedTodo: ''
    }


    onDeleteTodo = (tId) => {
        noteService.deleteTodo(this.props.noteId, tId)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Todo deleted ', type: 'ntf-alarm' })
                this.props.history.push('/notes')
            })
    }

    onToggleCheckTodo = (tId) => {
        noteService.toggleCheckTodo(this.props.noteId, tId)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Todo status updated ', type: 'ntf-update' })
                this.props.history.push('/notes')
            })
    }

    toggleEditing = () => {
        const { isEditing } = this.state
        this.setState({ isEditing: !isEditing })
    }

    handleChange = (ev) => {
        this.setState({ editedTodo: ev.target.value })
    }

    clearEditedTodo = () => {
        const { isEditing } = this.state
        this.setState({ isEditing: !isEditing, editedTodo: '' })
    }

    onChangeTodo = () => {
        const { editedTodo } = this.state
        const { noteId, todo } = this.props
        noteService.editTodo(noteId, todo.id, editedTodo)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Todo updated ', type: 'ntf-update' })
                this.setState({ isEditing: false, editedTodo: '' })
                this.props.history.push('/notes')
            })

        this.toggleEditing()
    }


    render() {
        const { id, txt, doneAt } = this.props.todo
        const { isEditing, editedTodo } = this.state

        return (
            <section className="note-todo-container">
                {!isEditing &&
                    <React.Fragment>
                        <span className={'pointer fas ' + (doneAt ? 'note-todo-check-btn' : 'note-todo-uncheck-btn')}
                            onClick={() => this.onToggleCheckTodo(id)}></span>

                        <button className="pointer float-right fas note-edit-btn" onClick={this.toggleEditing}></button>
                        <span className="pointer float-right fas note-edit-todo-delete" onClick={() => this.onDeleteTodo(id)}></span>

                        <span className={'fl-uppercase ' + (doneAt ? 'note-todo-text-done' : 'note-todo-text-not-done')}>
                            {txt}
                        </span>
                        {(doneAt) ? <div className="note-todo-done-text">({utilService.returnDateFromTs(doneAt)})</div> : ''}
                    </React.Fragment>
                }

                {isEditing &&
                    <section className="flex space-between align-center note-title">
                        <input className="note-edit-todo-input" type="text" placeholder={txt} name="editedTodo" value={editedTodo} onChange={this.handleChange} />
                        <div>
                            <button className="pointer fas note-edit-confirm" onClick={this.onChangeTodo}></button>
                            <button className="pointer fas note-edit-cancel" onClick={this.clearEditedTodo}></button>
                        </div>
                    </section>
                }
            </section>
        )
    }
}

export const TodoPreview = withRouter(_TodoPreview)