const { Link } = ReactRouterDOM
import {EmailStatus} from './EmailStatus.jsx'

export function SideBar({}) {

    return (
        <div className="sidebar-container">
            <button className="email-compose"><Link to={'/compose'}>+Compose</Link></button>
            <div className="inbox">Inbox 📨</div>
            <div className="stared">Stared⭐</div>
            <div className='pinned'>Pinned</div>
        </div>
    )
}

