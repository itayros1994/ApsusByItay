import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/storage-service.js'

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
    getNoteTitle,
    getNoteTxtForMail
}

function query(filterTxt, ctg) {
    if (!filterTxt && !ctg) return Promise.resolve(notes)

    filterTxt = filterTxt.toLowerCase()

    let filtered = []
    if (filterTxt) {
        notes.forEach(note => {
            switch (note.type) {
                case 'NoteText':
                    if (note.info.title.toLowerCase().includes(filterTxt)) filtered.push(note)
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

function getNoteTitle(nId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    const note = notes[noteIdx]
    let subject;
    switch (_getNoteType(noteIdx)) {
        case 'NoteText':
            subject = note.info.title
            break;
        case 'NoteTodos':
            subject = note.info.label
            break;
        case 'NoteImg':
            subject = note.info.title
            break;
        case 'NoteVideo':
            subject = note.info.title
            break;
    }

    return subject
}

function getNoteTxtForMail(nId) {
    const noteIdx = _getNoteIdxInNotes(nId)
    const note = notes[noteIdx]
    let copyTxt = ''
    switch (_getNoteType(noteIdx)) {
        case 'NoteText':
            copyTxt = note.info.txt
            break;
        case 'NoteTodos':
            note.info.todos.forEach(todo => copyTxt += `${todo.txt} \n`)
            break;
        case 'NoteImg':
            copyTxt = note.info.url
            break;
        case 'NoteVideo':
            copyTxt = note.info.videoUrl
            break;
    }

    return copyTxt + '\n\Sent from Appsus notes'
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
                title: "Finalize miss note",
                txt: "Finally miss note is up! work has done and everything is set up for delivery"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: true,
            info: {
                title: "My mentor!",
                url: "https://ca.slack-edge.com/T01JRLNVCEA-U01PVGYMT0U-59a698606caa-512"
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
                label: "Don't forget",
                todos: [
                    { id: utilService.makeId(), txt: "Eat lunch", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Take a shower", doneAt: null },
                    { id: utilService.makeId(), txt: "Take a nap", doneAt: null }
                ]
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteVideo",
            isPinned: true,
            info: {
                title: "Dreams",
                videoUrl: "https://www.youtube.com/watch?v=QrsFsO5thEM"
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
                title: "Credit card number",
                txt: "4580-7943-1179-4512"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: true,
            info: {
                title: "Guy Kaplan!",
                url: "https://ca.slack-edge.com/T01JRLNVCEA-U01NDM3SG6T-7257e94591c6-512"
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
                label: "bechamel Ingredients",
                todos: [
                    { id: utilService.makeId(), txt: "2 tablespoons butter", doneAt: null },
                    { id: utilService.makeId(), txt: "2 tablespoons flour", doneAt: null },
                    { id: utilService.makeId(), txt: "1 1/4 cups milk, heated Salt", doneAt: null },
                    { id: utilService.makeId(), txt: "Freshly ground pepper", doneAt: null }
                ]
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteVideo",
            isPinned: true,
            info: {
                title: "Listen to that",
                videoUrl: "https://www.youtube.com/watch?v=jI4lSkoSEXQ"
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
                label: "Bolognese recipe",
                todos: [
                    { id: utilService.makeId(), txt: "2 x 400g tins plum tomatoes", doneAt: null },
                    { id: utilService.makeId(), txt: "small pack basil leaves picked, ¾ finely chopped and the rest left whole for garnish", doneAt: null },
                    { id: utilService.makeId(), txt: "1 tsp dried oregano", doneAt: null },
                    { id: utilService.makeId(), txt: "2 fresh bay leaves", doneAt: null },
                    { id: utilService.makeId(), txt: "2 tbsp tomato purée", doneAt: null },
                    { id: utilService.makeId(), txt: "1 beef stock cube", doneAt: null },
                    { id: utilService.makeId(), txt: "1 red chilli deseeded and finely chopped (optional)", doneAt: null },
                    { id: utilService.makeId(), txt: "125ml red wine", doneAt: null },
                    { id: utilService.makeId(), txt: "6 cherry tomatoes sliced in half", doneAt: null }
                ]
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: true,
            info: {
                title: "The king!",
                url: "https://ca.slack-edge.com/T01JRLNVCEA-U01PTQMHFD4-db4ae79d22a4-512"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteVideo",
            isPinned: true,
            info: {
                title: "Today's evening",
                videoUrl: "https://www.youtube.com/watch?v=caqm1Ihq9LM"
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
                title: "Bank password (secret)",
                txt: utilService.makeId()
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: true,
            info: {
                title: "Sunset",
                url: "https://live-production.wcms.abc-cdn.net.au/b0d688db39ca3c8d460bbe750704565a?impolicy=wcms_crop_resize&cropH=576&cropW=1023&xPos=0&yPos=0&width=862&height=485"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },


        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: false,
            info: {
                title: "A note",
                txt: "A note for remember and never forget: Hopladi Hoplada La la li La la la"
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
                title: "Roommate",
                url: "https://ca.slack-edge.com/T01JRLNVCEA-U01NUEECE10-785db1d51862-512"
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
                title: "COOL!",
                videoUrl: "https://www.youtube.com/watch?v=1W3bcfJG5dk"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: false,
            info: {
                label: "Just checking checks",
                todos: [
                    { id: utilService.makeId(), txt: "Done", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Done", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Done", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Done", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Done", doneAt: 1620162197422 }
                ]
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: false,
            info: {
                title: "Look at me",
                txt: "I'm a note!"
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
                title: "DO NOT listen!",
                videoUrl: "https://www.youtube.com/watch?v=szYVZgd6Ly0"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: false,
            info: {
                label: "Taste foods",
                todos: [
                    { id: utilService.makeId(), txt: "Pasta", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Hamburger", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Pizza", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Salami", doneAt: 1620162197422 },
                    { id: utilService.makeId(), txt: "Chicken", doneAt: 1620162197422 }
                ]
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: false,
            info: {
                title: "WOW!",
                txt: "Time passed by! it's already 2021. Did you know that? really? So late..."
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
                title: "Sunrise",
                url: "https://www.surfertoday.com/images/stories/sunrisesunsettime.jpg"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: false,
            info: {
                title: "Don't forget Jerusalem",
                txt: "If I Forget You Jerusalem\nIf I do not raise you\nAnd if I do not raise you\nJerusalem\nAbove all my joy\nAbove all, above my highest joy"
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
                title: "Classical",
                videoUrl: "https://www.youtube.com/watch?v=JrlZvIaVPBk"
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
                title: "Appsus",
                url: "https://media.gq.com/photos/56e71bd3161e63486d04ce3d/master/w_1600%2Cc_limit/horseinsuit.jpg"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        },

        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: false,
            info: {
                label: "Vegs to buy",
                todos: [
                    { id: utilService.makeId(), txt: "Potato", doneAt: null },
                    { id: utilService.makeId(), txt: "Sweet potato", doneAt: null },
                    { id: utilService.makeId(), txt: "Tomato", doneAt: null },
                    { id: utilService.makeId(), txt: "Onion", doneAt: null },
                    { id: utilService.makeId(), txt: "Cucumber", doneAt: null }
                ]
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
                title: "How do I feel",
                videoUrl: "https://www.youtube.com/watch?v=vafFqQvSe3U"
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        }
    ]

    _saveNotesToStorage()
}