import { utilService } from '/util-service.js'
import { storageService } from '/storage-service.js'
const _LOCAL_STORAGE_KEY = 'mails'
const time = new Date();

let mails = []

let mails2 = [

    { id: utilService.makeId(), sendBy: 'Itay Rosental', subject: 'Read It Now!', body: 'miss you so much', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Oren Yaniv', subject: 'Primary Messege', body: 'Please call me back ASAP!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Apple Servises', subject: 'IPhone 12', body: 'Iphone 12 Now on Sale! ', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Noa Cohen', subject: 'Working Instruction!', body: 'Please come on time at sunday morning! this is very importatnt for me!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Walla Shops', subject: 'New Products is on the Air!', body: 'Hey! alot of new products now at are web! lets Start!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Ebay', subject: 'Acount Noticed!', body: 'Your acount is gonna run out Please!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Facbook Costumer', subject: 'ShopieFY!', body: 'lets Shop! we waiting for you!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Youtube', subject: 'Youtube Priemiume is Ready!', body: 'Buy now! january discount is now ready for you!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Tel-Aviv-Streets', subject: 'Come Travel The City!', body: 'Tel Aviv City Is Now Waiting For You!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'London Mails', subject: 'Oxford Streets Opened Again!', body: 'December Discount! Come To London Now!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Spotify', subject: 'New Music Are Now On Air', body: 'So many music are now open for you! lets dance!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Lex Traveller', subject: 'Januray SALE!', body: 'January sale! lets Do This!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Xiaomi', subject: 'REDMIE is now ON SALE!', body: 'Xiaoni redmy is on sale!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Samsung', subject: 'GALAXY S21', body: ' OUT OF STOCK!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Bose-Servcise', subject: 'NOSE NC 21', body: '2021 SALES are now !', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Jamaika-Lead', subject: 'Bob Marley Fans Party', body: 'Lets dance at friday Night!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Soda-Steam', subject: '2021 ON SALE!', body: 'Come and buy are new soda stream!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Coca-Cola', subject: 'StrawBerry Cola is now on SALE!', body: 'Try Are New Cola Taste! is amazing!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Wow-mails', subject: 'Are New Mail Box', body: 'New mail box is now on the air! come and try are servise!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false }, { id: utilService.makeId(), sendBy: 'Itay Rosental', subject: 'Read It Now!', body: 'miss you so much', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Oren Yaniv', subject: 'Primary Messege', body: 'Please call me back ASAP!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Apple Servises', subject: 'IPhone 12', body: 'Iphone 12 Now on Sale! ', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Noa Cohen', subject: 'Working Instruction!', body: 'Please come on time at sunday morning! this is very importatnt for me!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Walla Shops', subject: 'New Products is on the Air!', body: 'Hey! alot of new products now at are web! lets Start!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Ebay', subject: 'Acount Noticed!', body: 'Your acount is gonna run out Please!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Facbook Costumer', subject: 'ShopieFY!', body: 'lets Shop! we waiting for you!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Youtube', subject: 'Youtube Priemiume is Ready!', body: 'Buy now! january discount is now ready for you!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Tel-Aviv-Streets', subject: 'Come Travel The City!', body: 'Tel Aviv City Is Now Waiting For You!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'London Mails', subject: 'Oxford Streets Opened Again!', body: 'December Discount! Come To London Now!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Spotify', subject: 'New Music Are Now On Air', body: 'So many music are now open for you! lets dance!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Lex Traveller', subject: 'Januray SALE!', body: 'January sale! lets Do This!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Xiaomi', subject: 'REDMIE is now ON SALE!', body: 'Xiaoni redmy is on sale!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Samsung', subject: 'GALAXY S21', body: ' OUT OF STOCK!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Bose-Servcise', subject: 'NOSE NC 21', body: '2021 SALES are now !', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
    { id: utilService.makeId(), sendBy: 'Jamaika-Lead', subject: 'Bob Marley Fans Party', body: 'Lets dance at friday Night!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Soda-Steam', subject: '2021 ON SALE!', body: 'Come and buy are new soda stream!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Coca-Cola', subject: 'StrawBerry Cola is now on SALE!', body: 'Try Are New Cola Taste! is amazing!', isRead: true, sentAt: time.toLocaleString(), replays: [], isStar: true },
    { id: utilService.makeId(), sendBy: 'Wow-mails', subject: 'Are New Mail Box', body: 'New mail box is now on the air! come and try are servise!', isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false },
]


export const mailService = {
    mails,
    deleteEmail,
    isEmailRead,
    getMails,
    addMail,
    getMailById,
    addComment,
    addStar

}

// Load Mails If LocalSorage Is Clear
if (storageService.loadFromStorage(_LOCAL_STORAGE_KEY) === null) {
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails2)
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

function addStar(emailId, star) {
    var mail = getMailById(emailId)
    mail.isStar = true
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails)

}

function addComment(emailId, replay) {
    var mail = getMailById(emailId)
    mail.replays.push(replay)
    storageService.saveToStorage(_LOCAL_STORAGE_KEY, mails)
    return Promise.resolve()
}



function addMail(sendBy, subject, body) {
    getMails().then(mailsToSave => {
        mailsToSave.push({ id: utilService.makeId(), sendBy, subject, body, isRead: false, sentAt: time.toLocaleString(), replays: [], isStar: false })
        mails = mailsToSave
        storageService.saveToStorage(_LOCAL_STORAGE_KEY, mailsToSave)
    })
    return Promise.resolve()
}