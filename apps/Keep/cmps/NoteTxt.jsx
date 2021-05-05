import { NoteEditor } from './NoteEditor.jsx'


const { withRouter } = ReactRouterDOM

export class _NoteTxt extends React.Component {
    state = {

    }


    render() {
        const { id, info, isPinned, style } = this.props.note

        return (
            <article className="note-container">
                <div className="note-preview-container" style={style}>
                    <div className="note-title">Don't forget!</div>
                    txt: {info.txt}
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </article>
        )
    }
}

export const NoteTxt = withRouter(_NoteTxt)