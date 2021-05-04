import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export class NotePreview extends React.Component {

    DynamicCmp = (props) => {

        switch (this.noteType) {
            case 'NoteText':
                return <NoteTxt  {...props} />
            case 'NoteImg':
                return <NoteImg  {...props} />
            case 'NoteTodos':
                return <NoteTodos {...props} />
            case 'NoteVideo':
                return <NoteVideo {...props} />
            default:
                return <div>Error loading note</div>
        }
    }

    get noteType() {
        return this.props.note.type
    }

    render() {
        const { DynamicCmp, props } = this
        return (
            <DynamicCmp {...props} />
        )
    }
}