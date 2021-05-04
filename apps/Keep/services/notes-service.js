import { utilService } from '../...../services/util-service.js'
import { storageService } from '../...../services/storage-service.js'

export const noteService = {
    query,
    getNote,
    deleteNote,
    addNote,
    togglePin,
    changeBgcColor,
    getNoteTxtToCopy
}

function query() {
    return Promise.resolve(notes)
}

let notes = storageService.loadFromStorage('notes')
if (!notes || !notes.length) {
    _createNotesLst()
}

function deleteNote(nId) {
    const noteId = _getNoteIdInNotes(nId)
    if (noteId !== -1) notes.splice(noteId, 1)
    _saveNotesToStorage()

    return Promise.resolve()
}

function getNote(nId) {
    const noteId = _getNoteIdInNotes(nId)

    return Promise.resolve(notes[noteId])
}

function addNote(type, value) {
    switch (type) {
        case 'NoteText':
            notes.push({
                id: utilService.makeId(),
                type: "NoteText",
                isPinned: false,
                info: {
                    txt: value
                },
                stle: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break;

        case 'NoteTodos':
            break;

        case 'NoteImg':
            notes.push({
                id: utilService.makeId(),
                type: "NoteImg",
                isPinned: false,
                info: {
                    url: value,
                    title: "Me playing Mi"
                },
                stle: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break;

        case 'NoteVideo':
            notes.push({
                id: utilService.makeId(),
                type: "NoteVideo",
                isPinned: false,
                info: {
                    videoUrl: value,
                },
                stle: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break;
    }

    _saveNotesToStorage()

    return Promise.resolve()
}

function togglePin(nId) {
    const noteId = _getNoteIdInNotes(nId)
    notes[noteId].isPinned = !notes[noteId].isPinned
    _saveNotesToStorage()

    return Promise.resolve()
}

function changeBgcColor(nId, color) {
    const noteId = _getNoteIdInNotes(nId)
    notes[noteId].style = { backgroundColor: color }
    _saveNotesToStorage()

    return Promise.resolve()
}

function getNoteTxtToCopy(nId) {
    const noteId = _getNoteIdInNotes(nId)
    const note = notes[noteId]
    let copyTxt;
    switch (_getNoteType(noteId)) {
        case 'NoteText':
            copyTxt = ['Note: ', note.info.txt]
            break;
        case 'NoteTodos':
            copyTxt = note.info.todos
            break;
        case 'NoteImg':
            copyTxt = [note.info.title, note.info.url]
            break;
        case 'NoteVideo':
            copyTxt = [note.info.title, note.info.videoUrl]
            break;
    }

    return navigator.clipboard.writeText(copyTxt.join('\n') + '\n\nCopied from Appsus MissKeep')
}


function _saveNotesToStorage() {
    storageService.saveToStorage('notes', notes)
}

function _getNoteIdInNotes(id) {
    return notes.findIndex(note => note.id === id)
}

function _getNoteType(idx) {
    return notes[idx].type
}


/* Create basic notes list - each note type has one note example */
function _createNotesLst() {
    notes = [
        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: true,
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://ca.slack-edge.com/T01JRLNVCEA-U01PTQMHFD4-db4ae79d22a4-512",
                title: "Itay Rosental"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteVideo",
            isPinned: false,
            info: {
                title: "note title",
                videoUrl: "https://www.youtube.com/watch?v=vafFqQvSe3U",
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        }
    ]

    _saveNotesToStorage()
}