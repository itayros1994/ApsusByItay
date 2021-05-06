const { Link } = ReactRouterDOM
export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            readStatus: '',
            text: ''
        }
    }

    handleChange = (ev) => {
        const filter = ev.target.name
        const value = ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, [filter]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { text } = this.state.filterBy
        return (
            <div className="mail-filter-container">
                <select className="mail-filter-by" name="readStatus" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

                <div>
                    <label  htmlFor="FilterByText"></label>
                    <input placeholder="Search Email" className="input-filter-name" type="text" name="text" value={text} onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}

