import { utilService } from '../...../services/util-service.js'
import { storageService } from '../...../services/storage-service.js'

export const noteService = {
    query,
    getNote,
    deleteNote,
    deleteTodo,
    addNote,
    addTodo,
    editNoteTitle,
    editNoteTxt,
    editTodo,
    togglePin,
    toggleCheckTodo,
    changeBgcColor,
    getNoteTxtToCopy,
}

function query(filterTxt, ctg) {
    if (!filterTxt && !ctg) return Promise.resolve(notes)

    filterTxt = filterTxt.toLowerCase()

    let filtered = []
    if (filterTxt) {
        notes.forEach(note => {
            switch (note.type) {
                case 'NoteText':
                    if (note.info.txt.toLowerCase().includes(filterTxt)) filtered.push(note)
                    break

                case 'NoteTodos':
                    if (note.info.label.toLowerCase().includes(filterTxt)) filtered.push(note)

                    else {
                        let todosTxt = ''
                        note.info.todos.forEach((todo) => {
                            todosTxt += todo.txt
                        })
                        if (todosTxt.toLowerCase().includes(filterTxt)) filtered.push(note)
                    }
                    break

                case 'NoteImg':
                case 'NoteVideo':
                    if (note.info.title.toLowerCase().includes(filterTxt)) filtered.push(note)
                    break
            }
        })
    }

    if (ctg) {
        if (!filterTxt) filtered = notes
        filtered = filtered.filter((note) => {
            return note.type === ctg
        })
    }

    return Promise.resolve(filtered)
}

let notes = storageService.loadFromStorage('notes')
if (!notes || !notes.length) {
    _createNotesLst()
}

function deleteNote(nId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    if (noteIdx >= 0) notes.splice(noteIdx, 1)
    _saveNotesToStorage()

    return Promise.resolve()
}

function deleteTodo(nId, tId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    const todoIdx = _getTodoIdInNote(noteIdx, tId)
    if (todoIdx >= 0) notes[noteIdx].info.todos.splice(todoIdx, 1)
    _saveNotesToStorage()

    return Promise.resolve()
}

function getNote(nId) {
    const noteIdx = _getNoteIdxInNotes(nId)

    return Promise.resolve(notes[noteIdx])
}

function addNote(type, title, txt) {
    switch (type) {
        case 'NoteText':
            notes.unshift({
                id: utilService.makeId(),
                type: "NoteText",
                isPinned: false,
                info: {
                    title,
                    txt
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break

        case 'NoteTodos':
            const todos = txt.split(',')
            let todosObjs = []
            todos.forEach((todo) => {
                todosObjs.push({ id: utilService.makeId(), txt: todo, doneAt: null })
            })

            notes.unshift({
                id: utilService.makeId(),
                type: "NoteTodos",
                isPinned: false,
                info: {
                    label: title,
                    todos: todosObjs
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break

        case 'NoteImg':
            notes.unshift({
                id: utilService.makeId(),
                type: "NoteImg",
                isPinned: false,
                info: {
                    title,
                    url: txt
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break

        case 'NoteVideo':
            notes.unshift({
                id: utilService.makeId(),
                type: "NoteVideo",
                isPinned: false,
                info: {
                    title,
                    videoUrl: txt
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            })
            break
    }

    _saveNotesToStorage()

    return Promise.resolve()
}

function addTodo(nId, txt) {
    const noteIdx = _getNoteIdxInNotes(nId)

    notes[noteIdx].info.todos.push(
        { id: utilService.makeId(), txt, doneAt: null }
    )
    _saveNotesToStorage()

    return Promise.resolve()
}

function editNoteTitle(nId, title, isTodos) {
    const noteIdx = _getNoteIdxInNotes(nId)

    if (!isTodos) notes[noteIdx].info.title = title
    else notes[noteIdx].info.label = title

    _saveNotesToStorage()

    return Promise.resolve()
}

function editNoteTxt(nId, txt) {
    const noteIdx = _getNoteIdxInNotes(nId)
    notes[noteIdx].info.txt = txt

    _saveNotesToStorage()

    return Promise.resolve()
}

function editTodo(nId, tId, newTodo) {
    const noteIdx = _getNoteIdxInNotes(nId)
    const todoIdx = _getTodoIdInNote(noteIdx, tId)
    notes[noteIdx].info.todos[todoIdx].txt = newTodo

    _saveNotesToStorage()

    return Promise.resolve()
}

function togglePin(nId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    notes[noteIdx].isPinned = !notes[noteIdx].isPinned
    _saveNotesToStorage()

    return Promise.resolve()
}

function toggleCheckTodo(nId, tId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    const todoIdx = _getTodoIdInNote(noteIdx, tId)
    let doneAt = notes[noteIdx].info.todos[todoIdx].doneAt

    if (!doneAt) notes[noteIdx].info.todos[todoIdx].doneAt = Date.now()
    else notes[noteIdx].info.todos[todoIdx].doneAt = null
    _saveNotesToStorage()

    return Promise.resolve()
}

function changeBgcColor(nId, color) {
    const noteIdx = _getNoteIdxInNotes(nId)
    notes[noteIdx].style = { backgroundColor: color }
    _saveNotesToStorage()

    return Promise.resolve()
}

function getNoteTxtToCopy(nId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    const note = notes[noteIdx]
    let copyTxt;
    switch (_getNoteType(noteIdx)) {
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

function _getNoteIdxInNotes(nId) {
    return notes.findIndex(note => note.id === nId)
}

function _getTodoIdInNote(nIdx, tId) {
    return notes[nIdx].info.todos.findIndex(todo => todo.id === tId)
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
                title: "Don't forget",
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
                    { id: utilService.makeId(), txt: "Do that", doneAt: null },
                    { id: utilService.makeId(), txt: "Do this", doneAt: 1620162197422 }
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
                videoUrl: "https://www.youtube.com/watch?v=vafFqQvSe3U"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: true,
            info: {
                title: "Don't forget",
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
                    { id: utilService.makeId(), txt: "Do that", doneAt: null },
                    { id: utilService.makeId(), txt: "Do this", doneAt: 1620162197422 }
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

        // {
        //     id: utilService.makeId(),
        //     type: "NoteVideo",
        //     isPinned: false,
        //     info: {
        //         title: "note title",
        //         videoUrl: "https://www.youtube.com/watch?v=vafFqQvSe3U"
        //     },
        //     style: {
        //         backgroundColor: utilService.getRandomColor()
        //     }
        // },

        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: true,
            info: {
                title: "Don't forget",
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
                    { id: utilService.makeId(), txt: "Do that", doneAt: null },
                    { id: utilService.makeId(), txt: "Do this", doneAt: 1620162197422 }
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
        }
        // ,

        // {
        //     id: utilService.makeId(),
        //     type: "NoteVideo",
        //     isPinned: false,
        //     info: {
        //         title: "note title",
        //         videoUrl: "https://www.youtube.com/watch?v=vafFqQvSe3U"
        //     },
        //     style: {
        //         backgroundColor: utilService.getRandomColor()
        //     }
        // }
    ]

    _saveNotesToStorage()
}