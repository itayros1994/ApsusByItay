import { NoteEditor } from './NoteEditor.jsx'
import { NoteTitleEditable } from './NoteTitleEditable.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteVideo extends React.Component {
    get youtubeFixed() {
        let { videoUrl } = this.props.note.info
        let fixedUrl = videoUrl.split('?v=')
        return `https://www.youtube.com/embed/${fixedUrl[1]}`
    }


    render() {
        const { id, info, style } = this.props.note

        return (
            <article className="note-container">
                <div className="note-preview-container" style={style}>
                    <NoteTitleEditable id={id} title={info.title} />
                    <iframe src={this.youtubeFixed} frameBorder="0"></iframe>
                </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </article>
        )
    }
}

export const NoteVideo = withRouter(_NoteVideo)