import { utilService } from '/util-service.js'
import { storageService } from '/storage-service.js'

let mails = [
    { id: utilService.makeId(), subject: 'Wassap?', body: 'Oren Is King!!', isRead: false, sentAt: 1551133930594 },
    { id: utilService.makeId(), subject: 'Wassap?', body: 'Itay is The Queen!', isRead: false, sentAt: 1551133930594 },
    { id: utilService.makeId(), subject: 'Wassap?', body: 'Kaplan Is Bad Boy!', isRead: false, sentAt: 1551133930594 },
    { id: utilService.makeId(), subject: 'Wassap?', body: 'CoperVaser is King', isRead: false, sentAt: 1551133930594 },
    { id: utilService.makeId(), subject: 'Wassap?', body: 'Basya is Love!!', isRead: false, sentAt: 1551133930594 }
]
export const mailService = {
    mails,
    deleteEmail,
    isEmailRead,
    getMails

}

function getMails() {
    return Promise.resolve(mails)
}

function deleteEmail(emailId) {
    var emailIdx = mails.findIndex(function(mail) {
        return emailId === mail.id
    })
    mails.splice(emailIdx, 1)
    return Promise.resolve()
}

function isEmailRead(emailId) {
    var emailIdx = mails.findIndex(function(mail) {
        return emailId === mail.id
    })
    mails[emailIdx].isRead = true
    return Promise.resolve()
}