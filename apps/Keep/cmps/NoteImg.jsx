import { NoteEditor } from './NoteEditor.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteImg extends React.Component {
    state = {

    }


    render() {
        const { id, info, style } = this.props.note

        return (
            <article className="note-container">
                <div className="note-preview-container" style={style}>
                    <div className="note-title">{info.title}</div>
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