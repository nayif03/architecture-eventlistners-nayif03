// LocalStorage Wrapper
// save Array -> transform: string -> localStorage.setItem
// get Array -> localStorage: getItem -> transform: Array

import Events from "./Events"
import { renderNotes } from "./helper"

export default class Storage extends Events {
    constructor(localStorageKey){
        super()
        this.key = localStorageKey
        this.data = this.get()
    }

    addDataSet(data){
        this.data.push(data)
        this.emit("updated", this.data)
        this.save()
    }

    save(){
        // have access to current data
        const data = this.data
        // transform to string
        const stringified = JSON.stringify(data)
        // save to local storage
        localStorage.setItem(this.key, stringified)
    }

    get(){
        const localStorageValue = localStorage.getItem(this.key)
        this.data = JSON.parse(localStorageValue) || []
        this.emit("updated", this.data)
        return this.data 
    }

    initFinished(){
        this.emit("updated", this.data)
    }
}

export const noteStorage = new Storage("myAwesomeNote")

noteStorage.on('addItem', note => {
    noteStorage.addDataSet(note)
})

noteStorage.on("updated", notes =>{
    renderNotes(notes)
})

noteStorage.initFinished()