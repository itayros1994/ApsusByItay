import { teamMembersDb } from '../services/about-us-service.js'
import { LongTextToggler } from '../cmps/LongTextToggler.jsx'
import { TeamMember } from '../cmps/TeamMember.jsx'

export function AboutUs() {
  const teamMembers = teamMembersDb()

  return (
      <section className="container">
        <section className="about-us-intro-container">
          <h1 className="text-center about-us-section-title">About us</h1>
          <div className="text-center about-us-sub-title">
            Apssus. A whole new world of innovation.
          </div>

          <div className="about-us-lorem">
            <LongTextToggler txt="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, quia tempore! Explicabo molestiae animi molestias nemo magni quas non laborum in numquam vel quam inventore voluptatibus nesciunt autem aliquid unde ullam ipsum aut, magnam, voluptatem quisquam dolor sint tempore. Magni nostrum eligendi voluptatem fuga nulla? Beatae quo reprehenderit porro obcaecati." />
          </div>
        </section>

        <section>
          <h1 className="text-center about-us-section-title">The team</h1>
          <div className="about-us-team-container">
            {teamMembers.map(member => <TeamMember member={member} key={member.id} />)}
          </div>
        </section>
      </section>
  )
}