import { utilService } from '/util-service.js'
import { storageService } from '/storage-service.js'
const _LOCAL_STORAGE_KEY = 'mails'

let mails = [
    // { id: utilService.makeId(), sendBy: 'Chup', subject: 'facebook on up', body: 'Oren Is King!!', isRead: false, sentAt: 1551133930594 },
    // { id: utilService.makeId(), sendBy: 'Chup', subject: 'hey boy mate!', body: 'Itay is The Queen!', isRead: false, sentAt: 1551133930594 },
    // { id: utilService.makeId(), sendBy: 'Itay', subject: 'wheater updating', body: 'Kaplan Is Bad Boy!', isRead: false, sentAt: 1551133930594 },
    // { id: utilService.makeId(), sendBy: 'oren', subject: 'Send Me The Now!', body: 'CoperVaser is King', isRead: false, sentAt: 1551133930594 },
    // { id: utilService.makeId(), sendBy: 'shiri', subject: 'Give Me More Money!', body: 'Basya is Love!!', isRead: false, sentAt: 1551133930594 }
]
export const mailService = {
    mails,
    deleteEmail,
    isEmailRead,
    getMails,
    addMail,
    getMailById,
    addComment

}


function getMails(filterBy) {
    if (filterBy) {
        var { text, readStatus } = filterBy

        const filteredMails = mails.filter(mail => {
            if (readStatus) {
                if (readStatus === 'read') {
                    return mail.isRead && mail.body.includes(text)
                } else if (readStatus === 'unread') {
                    return !mail.isRead && mail.body.includes(text)
                } else {
                    return mail && mail.body.includes(text)
                }
            }
        })
        return Promise.resolve(filteredMails)
    } else {
        mails = storageService.loadFromStorage(_LOCAL_STORAGE_KEY) || []
        return Promise.resolve(mails)
    }
}


function deleteEmail(emailId) {
    var emailIdx = mails.findIndex(function(mail) {
        return emailId === mail.id
    })
    mails.splice(emailIdx, 1)
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails)
    return Promise.resolve()
}

function getMailById(emailId) {
    return mails.find(mail => mail.id === emailId)
}

function isEmailRead(emailId) {
    var emailIdx = mails.findIndex(function(mail) {
        return emailId === mail.id
    })
    mails[emailIdx].isRead = true
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails)
    return Promise.resolve()
}

function addComment(emailId, replay) {
    var mail = getMailById(emailId)
    mail.replays.push(replay)
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails)
}

function addMail(sendBy, subject, body) {
    mails.push({ id: utilService.makeId(), sendBy, subject, body, isRead: false, sentAt: new Date(), replays: [] })
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails)
}