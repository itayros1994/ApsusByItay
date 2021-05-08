import {LongTextToggler} from './LongTextToggler.jsx'

export class TeamMember extends React.Component {
    render() {
        const { img, name, role, mail, tel, desc } = this.props.member

        return (
            <article className="text-center team-member-container">
                <img src={img} />
                <div className="team-member-name">{name}</div>
                <div className="team-member-role">{role}</div>
                <div className="team-member-desc">
                    <LongTextToggler txt={desc} />
            </div>
                <div className="team-member-contact">
                    <div className="fas team-member-mail">{mail}</div>
                    <div className="fas team-member-phone">{tel}</div>
                </div>
            </article>
        )
    }
}