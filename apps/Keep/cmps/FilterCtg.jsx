export class FilterCtg extends React.Component {
    state = {
        ctg: ''
    }


    onChangeSelect = (ev) => {
        const ctg = ev.target.value
        this.setState(({ shitBakod }) => ({
            ctg
        }), () => {
            this.props.onSetCtg(this.state.ctg)
        })
    }


    render() {
        return (
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