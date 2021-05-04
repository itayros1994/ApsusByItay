import { mailService } from '../services/mailService.js'
export class EmailStatus extends React.Component {
    state = {
        emails: null,
        mailReaded: null,
    }

    componentDidMount = () => {
        const { emails } = this.props
        this.setState({ emails })
        console.log('oren!')
    }

    componentDidUpdate() {
    console.log(this.state.emails)
    }



    render() {
        return <div>emailread!</div>
    }
}