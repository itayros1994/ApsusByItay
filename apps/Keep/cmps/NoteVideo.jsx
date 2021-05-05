import { NoteEditor } from './NoteEditor.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteVideo extends React.Component {
    state = {

    }

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
                    <div className="note-title">{info.title}</div>
                    <iframe width="420" height="315" frameBorder="0" src={this.youtubeFixed} ></iframe>
                    </div>

                <div className="note-editor-container">
                    <NoteEditor note={this.props.note} />
                </div>
            </article>
        )
    }
}

export const NoteVideo = withRouter(_NoteVideo)