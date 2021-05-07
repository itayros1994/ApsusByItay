// import { eventBusService } from '../......../services/event-bus-service.js'
import {eventBusService} from '../../../services/event-bus-service.js'

export class NotesCount extends React.Component {
    removeEvent;

    state = {
        count: null,
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('notes-count', (count) => {
            this.setState({ count })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        if (!this.state.count) return <span>0</span>

        return (
            <span>
                {this.state.count}
            </span>
        )
    }
}
