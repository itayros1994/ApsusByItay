const { withRouter } = ReactRouterDOM

class _AppFooter extends React.Component {
    render() {
        return (
            <footer>
                <section className="container text-center">
                    &copy; Appsus 2021 - Coding Academy sprint 3 by Itay Rosental & Oren Yaniv
                </section>
            </footer>
        )
    }
}

export const AppFooter = withRouter(_AppFooter)