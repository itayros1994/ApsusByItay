export class LongTextToggler extends React.Component {
    state = {
        isTxtLong: true,
        isShowingLong: false
    }

    componentDidMount() {
        if (this.props.txt.length <= 100) this.setState({ isTxtLong: false })
    }


    toggleLongText = () => {
        const { isShowingLong } = this.state
        this.setState({ isShowingLong: !isShowingLong })
        console.log(isShowingLong)
    }

    get getShortTxt() {
        return this.props.txt.slice(0, 100)
    }


    render() {
        const { isTxtLong, isShowingLong } = this.state
        const { txt } = this.props

        return (
            <React.Fragment>
                {txt.length <= 100 &&
                    <div>{txt}</div>
                }

                { isShowingLong && isTxtLong &&
                    <React.Fragment>
                        <div>{txt}</div>
                        <div className="pointer text-center show-more-toggler-btn" onClick={this.toggleLongText}>Show less</div>
                    </React.Fragment>
                }

                { !isShowingLong && isTxtLong &&
                    <React.Fragment>
                        <div>{this.getShortTxt}...</div>
                        <div className="pointer text-center show-more-toggler-btn" onClick={this.toggleLongText}>Show more</div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}