import { utilService } from '../........./services/util-service.js'
import { noteService } from '../../services/notes-service.js'

const { withRouter } = ReactRouterDOM

export class _TodoPreview extends React.Component {
    state = {

    }


    onDeleteTodo = (tId) => {
        noteService.deleteTodo(this.props.noteId, tId)
            .then(() => {
                this.props.history.push('/notes')
            })
    }

    onToggleCheckTodo = (tId) => {
        noteService.toggleCheckTodo(this.props.noteId, tId)
            .then(() => {
                this.props.history.push('/notes')
            })
    }


    render() {
        const { id, txt, doneAt } = this.props.todo

        return (
            <div>
                <span className={'pointer fas ' + (doneAt ? 'note-todo-check' : 'note-todo-uncheck')}
                    onClick={() => this.onToggleCheckTodo(id)}></span>

                <span className={doneAt ? 'note-todo-text-done' : 'note-todo-text-not-done'}>
                    {txt}
                    {(doneAt) ? `(${utilService.returnDateFromTs(doneAt)})` : ''}
                </span>

                <span className="fas note-editor-delete pointer" onClick={() => this.onDeleteTodo(id)}></span>
            </div>
        )
    }
}

export const TodoPreview = withRouter(_TodoPreview)