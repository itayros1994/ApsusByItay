import { Notifications } from './Notifications.jsx'

const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
    state = {
        isOpen: false
    }

    toggleMenu = () => {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }

    closeMenu = () => {
        this.setState({ isOpen: false })
    }

    render() {
        const { isOpen } = this.state

        return (
            <React.Fragment>
                <nav className="main-nav-container">
                    <div className="container flex align-center space-between">
                        <div className="nav-logo">
                            <a href="/">Appsus</a>
                        </div>

                        <Notifications />

                        <div>
                            <span className="fas nav-grid-symbol" onClick={this.toggleMenu}></span>
                            {isOpen &&
                                <ul className="nav-links-container clean-list">
                                    <li><NavLink exact to="/" onClick={this.closeMenu}>Home</NavLink></li>
                                    <li><NavLink to="/mail" onClick={this.closeMenu}>Mail</NavLink></li>
                                    <li><NavLink to="/notes" onClick={this.closeMenu}>Notes</NavLink></li>
                                    <li><NavLink to="/about" onClick={this.closeMenu}>About</NavLink></li>
                                </ul>
                            }

                            <ul className="nav-links-container-large clean-list">
                                <li><NavLink exact to="/">Home</NavLink></li>
                                <li><NavLink to="/mail">Mail</NavLink></li>
                                <li><NavLink to="/notes">Notes</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)