import { utilService } from '/util-service.js'

const gTeam = [
    {
        id: utilService.makeId(),
        name: "Reem Ben David",
        img: "https://ca.slack-edge.com/T01JRLNVCEA-U01PVGYMT0U-59a698606caa-512",
        role: "C.E.O & Founder",
        mail: "ReemBenDavid@appsus.com",
        tel: "+972-50-7561817",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quidem laboriosam voluptates, necessitatibus doloribus, vitae dolor eveniet quae dolore fuga excepturi sapiente perspiciatis. Sapiente, nobis sequi. Quam quod saepe quo necessitatibus ullam ex alias porro animi, pariatur neque repudiandae culpa asperiores voluptates eligendi explicabo consequatur. Expedita in sed atque debitis."
    },

    {
        id: utilService.makeId(),
        name: "Liel Ben David",
        img: "https://ca.slack-edge.com/T01JRLNVCEA-U01KBK24GG1-a16f9f98e454-512",
        role: "Team Leader",
        mail: "LielBenDavid@appsus.com",
        tel: "+972-50-7561817",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quidem laboriosam voluptates, necessitatibus doloribus, vitae dolor eveniet quae dolore fuga excepturi sapiente perspiciatis. Sapiente, nobis sequi. Quam quod saepe quo necessitatibus ullam ex alias porro animi, pariatur neque repudiandae culpa asperiores voluptates eligendi explicabo consequatur. Expedita in sed atque debitis."
    },

    {
        id: utilService.makeId(),
        name: "Basya Bat David",
        img: "https://ca.slack-edge.com/T01JRLNVCEA-U01Q213LRA5-2c613978d1d6-512",
        role: "Chief Operating Officer",
        mail: "BasyaBatDavid@appsus.com",
        tel: "+972-50-7561817",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quidem laboriosam voluptates, necessitatibus doloribus, vitae dolor eveniet quae dolore fuga excepturi sapiente perspiciatis. Sapiente, nobis sequi. Quam quod saepe quo necessitatibus ullam ex alias porro animi, pariatur neque repudiandae culpa asperiores voluptates eligendi explicabo consequatur. Expedita in sed atque debitis."
    }
]

export function teamMembersDb() {
    return gTeam
}