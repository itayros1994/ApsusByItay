const { Link } = ReactRouterDOM
import { EmailStatus } from './EmailStatus.jsx'

export class SideBar extends React.Component {


    render() {
        return (
            <div className="sidebar-container">
                <button className="email-compose"><Link to={'/compose'}>➕</Link></button>
                <div className="inbox">Inbox <span><EmailStatus emails={this.props.emails}></EmailStatus></span></div>
                <div className="stared"><Link to={'/stars'}>Stared ⭐</Link></div>
                <div className='pinned'>Pinned 📍</div>
            </div>
        )
    }


}

