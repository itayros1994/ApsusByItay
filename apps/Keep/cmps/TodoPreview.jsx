import { utilService } from '../........./services/util-service.js'
// import { eventBusService } from '../......../services/event-bus-service.js'
import {eventBusService} from '../../../services/event-bus-service.js'

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
            <section>
                {!isEditing &&
                    <React.Fragment>
                        <span className={doneAt ? 'note-todo-text-done' : 'note-todo-text-not-done'}>
                            {txt}
                            {(doneAt) ? `(${utilService.returnDateFromTs(doneAt)})` : ''}
                        </span>

                        <span className={'pointer fas ' + (doneAt ? 'note-todo-check' : 'note-todo-uncheck')}
                            onClick={() => this.onToggleCheckTodo(id)}></span>
                        <button onClick={this.toggleEditing}>Edit</button>
                        <span className="fas note-editor-delete pointer" onClick={() => this.onDeleteTodo(id)}></span>
                    </React.Fragment>
                }

                {isEditing &&
                    <React.Fragment>
                        <input type="text" placeholder={txt} name="editedTodo" value={editedTodo} onChange={this.handleChange} />
                        <button onClick={this.clearEditedTodo}>X</button>
                        <button onClick={this.onChangeTodo}>V</button>
                    </React.Fragment>
                }
            </section>
        )
    }
}

export const TodoPreview = withRouter(_TodoPreview)