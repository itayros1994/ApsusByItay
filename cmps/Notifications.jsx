import { eventBusService } from '../services/event-bus-service.js'
export class Notifications extends React.Component {

    removeEvent;

    state = {
        type: null,
        msg: null
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('show-user-ntf', ({ msg, type }) => {
            this.setState({ msg, type })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 1500);
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        if (!this.state.msg) return <span className="hider"></span>
        const msgClass = this.state.type || ''
        return (
            <span className={'fas text-center user-ntf-container ' + msgClass}>
                {this.state.msg}
            </span>
        )
    }
}
