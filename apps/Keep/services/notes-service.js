import { utilService } from '../...../services/util-service.js'
import { storageService } from '../...../services/storage-service.js'

export const noteService = {
    query,
    deleteNote
}

function query() {
    return Promise.resolve(notes)
}

let notes = storageService.loadFromStorage('notes')
if (!notes || !notes.length) {
    _createNotesLst()
}

function deleteNote(nId) {
    const noteId = notes.findIndex(note => note.id === nId)
    if (noteId !== -1) notes.splice(noteId, 1)
    _saveNotesToStorage()

    return Promise.resolve()
}

function _saveNotesToStorage() {
    storageService.saveToStorage('notes', notes)
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
                color: "red"
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "http://some-img/me",
                title: "Me playing Mi"
            },
            style: {
                color: "#00d"
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
                color: "purple"
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteVideo",
            isPinned: false,
            info: {
                videoUrl: "https://www.youtube.com/watch?v=vafFqQvSe3U",
            },
            style: {
                color: "#00d"
            }
        }
    ]

    _saveNotesToStorage()
}