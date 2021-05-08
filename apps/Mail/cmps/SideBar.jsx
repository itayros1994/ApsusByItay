const { Link } = ReactRouterDOM
import { EmailStatus } from './EmailStatus.jsx'
import {EmailStarsStatus} from './EmailStarsStatus.jsx'

export class SideBar extends React.Component {


    render() {
        return (
            <div className="sidebar-container">
                <button className="email-compose"><Link to={'/compose'}>➕ Compose</Link></button>
                <button className="send-to-notes">➕ Notes</button>
                <div className="inbox"><Link to={'/mail'}>Inbox <span><EmailStatus emails={this.props.emails}></EmailStatus></span></Link> </div>
                <div className="stared"><Link to={'/stars'}>Stared ⭐<span><EmailStarsStatus emails={this.props.emails}></EmailStarsStatus></span> </Link></div>
                <div className='pinned'>Pinned 📍</div>
            </div>
        )
    }


}

