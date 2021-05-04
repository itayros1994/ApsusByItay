const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    render() {

        return (
            <nav className="main-nav-container">
                <div className="container flex align-center space-between">
                    <div className="nav-logo">
                        <NavLink exact to="/">Appsus</NavLink>
                    </div>

                    <div>
                        <span className="fas nav-hamburger"></span>
                        <ul className="nav-links-container clean-list">
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/mail">Mail</NavLink></li>
                            <li><NavLink to="/notes">Notes</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}

export const AppHeader = withRouter(_AppHeader)