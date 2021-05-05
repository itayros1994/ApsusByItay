export class FilterCtg extends React.Component {
    state={

    }


    onChangeSelect = (ev) =>{
        console.log(ev.target.value)
    }


    render(){
        return(
            <select onChange={this.onChangeSelect}>
                <option value="">All</option>
                <option value="NoteText">Text</option>
                <option value="NoteTodos">Todos</option>
                <option value="NoteImg">Image</option>
                <option value="NoteVideo">Video</option>
            </select>
        )
    }
}