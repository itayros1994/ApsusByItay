import { NoteEditor } from './NoteEditor.jsx'
import { NoteTitleEditable } from './NoteTitleEditable.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteImg extends React.Component {
    state = {

    }


    render() {
        const { id, info, style } = this.props.note

        return (
            <article className="note-container">
                <div className="note-preview-container" style={style}>
                    <NoteTitleEditable id={id} title={info.title} />
                    <img src={info.url} className="note-img" />
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </article>
        )
    }
}

export const NoteImg = withRouter(_NoteImg)