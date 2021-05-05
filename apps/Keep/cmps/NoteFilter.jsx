export class NoteFilter extends React.Component {
    state = {
        filter: ''
    }


    handleChange = (ev) => {
        const txt = ev.target.value
        this.setState(({ shitBakod }) => ({
            filter: txt
        }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }


    render() {
        const { filter } = this.state
        return (
            <form >
                <input type="text" placeholder="Search notes" name="filter" value={filter} onChange={this.handleChange} />
            </form>
        )
    }
}