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

    onClearFilter = (ev) => {
        this.setState(({ shitBakod }) => ({
            filter: ''
        }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }


    render() {
        const { filter } = this.state

        return (
            <section className="text-center notes-search-container">
                <label htmlFor="notes-search-input" className="fas"></label>
                <span>
                    <input type="text" id="notes-search-input" placeholder="Search notes" name="filter" value={filter} onChange={this.handleChange} />
                    <i onClick={this.onClearFilter} className="pointer fas notes-filter-cancel-btn"></i>
                </span>
            </section>
        )
    }
}