import { NoteEditor } from './NoteEditor.jsx'
import { NoteTitleEditable } from './NoteTitleEditable.jsx'
import { TodoPreview } from './TodoPreview.jsx'
import { AddTodo } from './AddTodo.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteTodos extends React.Component {
    render() {
        const { id, info, style } = this.props.note

        return (
            <article className="note-container">
                <div className="note-preview-container" style={style}>
                    <NoteTitleEditable id={id} title={info.label} todos={true} />
                    {info.todos.map((todo) => {
                        return <TodoPreview todo={todo} noteId={id} key={todo.id} />
                    })}
                    <AddTodo noteId={id} />
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </article>
        )
    }
}

export const NoteTodos = withRouter(_NoteTodos)