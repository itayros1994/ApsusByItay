import { noteService } from '../../services/notes-service.js'
import { eventBusService } from '../../../../services/event-bus-service.js'

const { withRouter } = ReactRouterDOM


export class _AddTodo extends React.Component {
    state = {
        isAdding: false,
        addTodo: ''
    }

    toggleTodo = () => {
        const { isAdding } = this.state
        this.setState({ isAdding: !isAdding })
        if (!isAdding) this.setState({ addTodo: '' })
    }

    handleChange = (ev) => {
        this.setState({ addTodo: ev.target.value })
    }

    onAddNewTodo = () => {
        const { addTodo } = this.state
        noteService.addTodo(this.props.noteId, addTodo)
            .then(() => {
                eventBusService.emit('show-user-ntf', { msg: 'Todo added successfully ', type: 'ntf-success' })
                this.toggleTodo()
                this.props.history.push('/notes')
            })
    }

    render() {
        const { isAdding, addTodo } = this.state
        return (
            <section>
                {isAdding &&
                    <section className="flex space-between align-center note-title">
                        <input className="note-edit-todo-input" type="text" placeholder="Add todo" name="addTodo" value={addTodo} onChange={this.handleChange} />
                        <div>
                            <button className="pointer fas note-edit-confirm" onClick={this.onAddNewTodo}></button>
                            <button className="pointer fas note-edit-cancel" onClick={this.toggleTodo}></button>
                        </div>
                    </section>
                }

                {!isAdding &&
                    <button className="fas pointer note-todo-add-btn" onClick={this.toggleTodo}></button>
                }
            </section>
        )
    }
}

export const AddTodo = withRouter(_AddTodo)