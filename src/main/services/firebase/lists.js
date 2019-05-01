import firebase from './index'
import Chance from 'chance'
let chance = new Chance()

let listsRef = null;

firebase.auth().onAuthStateChanged(user => {
    if (user) listsRef = firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('lists')
})

const addList = async (list) => {
    if (listsRef)
        return await listsRef.add(list)
    return null
}

const deleteList = async (id) => {
    if (listsRef)
        try {
            return await listsRef.doc(id).delete()
        } catch (err) {
            return err
        }
    return null
}

const editListName = async (list, name) => {
    if (listsRef)
        return await listsRef.doc(list.id).update({
            name: name,
            items: list.items || []
        })
    return null
}

const addItem = async (list) => {
    if (listsRef) {
        let newItem = { id: chance.android_id(), text: '', enabled: true }
        return await listsRef.doc(list.id).update({
            name: list.name,
            items: list.items ? [...list.items, newItem] : []
        })
    }
    return null
}

// inutilizada
const getAllLists = async () => {
    let lists = []
    if (listsRef) {
        let snapshot = await listsRef.get()
        snapshot.forEach(doc => {
            lists = [...lists, { id: doc.id, ...doc.data() }]
        })
    }
    return lists
}

const realtimeUpdateLists = (callback) => {
    if (listsRef) {
        listsRef.onSnapshot(snapshot => {
            let lists = []
            snapshot.forEach(doc => {
                lists = [...lists, { id: doc.id, ...doc.data() }]
            })
            callback(lists)
        })
    }
}

export {
    addList, deleteList, getAllLists,
    realtimeUpdateLists, editListName, addItem
}