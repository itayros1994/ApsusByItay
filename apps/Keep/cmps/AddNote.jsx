export class AddNote extends React.Component {
    state = {
        type: 'NoteText'
    }


    onAddNote = (ev) => {
        ev.preventDefault()
    }

    handleTypeChange = (ev) => {
        console.log(ev.target.value)
    }


    render() {
        const { type } = this.state.type

        return (
            <form onSubmit={this.onAddNote}>
                <input type="text" size="40" placeholder="Whats on you're mind" />
                <button onClick={this.handleTypeChange} value="NoteText">
                    <i className="fas fa-text notes-type-btn"></i>
                </button>
                <button onClick={this.handleTypeChange} value="NoteTodos">
                    <i className="fas fa-list notes-type-btn"></i>
                </button>
                <button onClick={this.handleTypeChange} value="NoteImg">
                    <i className="fas fa-img notes-type-btn"></i>
                </button>
                <button onClick={this.handleTypeChange} value="NoteVideo">
                    <i className="fab fa-video notes-type-btn"></i>
                </button>
            </form >
        )
    }
}