import { NoteEditor } from './NoteEditor.jsx'
import { NoteTitleEditable } from './NoteTitleEditable.jsx'
import { NoteTxtEditable } from './NoteTxtEditable.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteTxt extends React.Component {
    state = {
    }


    render() {
        const { id, info, style } = this.props.note

        return (
            <article className="note-container">
                <div className="note-preview-container" style={style}>
                    <NoteTitleEditable id={id} title={info.title} />
                    <NoteTxtEditable id={id} txt={info.txt} />
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </article>
        )
    }
}

export const NoteTxt = withRouter(_NoteTxt)