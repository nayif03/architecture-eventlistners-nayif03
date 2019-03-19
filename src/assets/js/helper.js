// Helper
import {noteStorage} from "./Storage"
export const $ = selector => document.querySelector(selector)

export const domElements = {
    addNoteInput: $('#add_note'),
    addNoteButton: $('#add-note-button'),
    noteContainer: $('#notes'),
    noteDiv: $('.note')
}

export const renderNotes = (notes) => {
    
    domElements.noteContainer.innerHTML = notes.map((note,key) =>`
    <div id=${key} class="note col-lg-4" >
        <h2>${note}</h2>
    </div>
    ` ).join("")

    const noteDivElements = document.querySelectorAll(".note")
    if (noteDivElements!==null) {
        noteDivElements.forEach(notDiv=>{
            notDiv.addEventListener("click", () =>{
                let id = notDiv.id
                noteStorage.emit("removeItem", id)
                
            })
        })
    }
}

