import { noteService } from '../../services/notes-service.js'

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
            this.toggleTodo()
            this.props.history.push('/notes')
        })
    }

    render() {
        const { isAdding, addTodo } = this.state
        return (
            <section>
                {isAdding &&
                    <React.Fragment>
                        <input type="text" placeholder="Add todo" name="addTodo" value={addTodo} onChange={this.handleChange} />
                        <button className="fas pointer note-todo-add-btn" onClick={this.onAddNewTodo}></button>
                        <button className="fas pointer note-todo-clear-btn" onClick={this.toggleTodo}></button>
                    </React.Fragment>
                }

                {!isAdding &&
                    <button className="fas pointer note-todo-add-btn" onClick={this.toggleTodo}></button>
                }
            </section>
        )
    }
}

export const AddTodo = withRouter(_AddTodo)