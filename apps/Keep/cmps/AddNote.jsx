export class AddNote extends React.Component {
    state = {
        type: 'NoteText'
    }


    onAddNote = (ev) =>{
        ev.preventDefault()
    }


    render() {
        return (
            <form onSubmit={this.onAddNote}>
                <input type="text" size="40" placeholder="Whats on you're mind" />
                <button value="NoteText"><i className="fas fa-text notes-type-btn"></i></button>
                <button value="NoteTodos"><i className="fas fa-list notes-type-btn"></i></button>
                <button value="NoteImg"><i className="fas fa-img notes-type-btn"></i></button>
                <button value="NoteVideo"><i className="fab fa-video notes-type-btn"></i></button>
            </form >
        )
    }
}