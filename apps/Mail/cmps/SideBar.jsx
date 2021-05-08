const { Link } = ReactRouterDOM
import { EmailStatus } from './EmailStatus.jsx'
import {EmailStarsStatus} from './EmailStarsStatus.jsx'

export class SideBar extends React.Component {


    render() {
        return (
            <div className="sidebar-container">
                <button className="email-compose"><Link to={'/compose'}>➕ Compose</Link></button>
                <div className="inbox sidebar-link"><Link to={'/mail'}>Inbox <span><EmailStatus emails={this.props.emails}></EmailStatus></span></Link> </div>
                <div className="stared sidebar-link"><Link to={'/stars'}>Stared ⭐<span><EmailStarsStatus emails={this.props.emails}></EmailStarsStatus></span> </Link></div>
            </div>
        )
    }


}

