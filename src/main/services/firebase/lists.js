import firebase from './index'
import Chance from 'chance'
let chance = new Chance()

let listsRef = null;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        listsRef = firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('lists')
    }
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

const createItemFromText = text => {
    return ({ id: chance.android_id(), text, enabled: true })
}

const deleteItem = async (item, list) => {
    if (listsRef) {
        return await listsRef.doc(list.id).update({
            name: list.name,
            items: list.items ? list.items.filter(i => i.id !== item.id) : []
        })
    }
    return null
}

const editItemText = async (item, list) => {
    if (listsRef) {
        return await listsRef.doc(list.id).update({
            name: list.name,
            items: list.items ? list.items.map(i => {
                if (i.id === item.id)
                    return { ...i, text: item.text }
                return i
            }) : []
        })
    }
    return null
}

const setItemEnabledState = async (item, list) => {
    if (listsRef) {
        return await listsRef.doc(list.id).update({
            name: list.name,
            items: list.items ? list.items.map(i => {
                if (i.id === item.id) {
                    return item
                }
                return i
            }) : []
        })
    }
    return null
}

const setAllItemsEnabledState = async (enabled, list) => {
    if (listsRef) {
        return await listsRef.doc(list.id).update({
            name: list.name,
            items: list.items ? list.items.map(i => ({ ...i, enabled })) : []
        })
    }
    return null
}

// inutilizada
const getAllLists = async () => {
    let lists = []
    if (listsRef) {
        let snapshot = await listsRef.orderBy('date').get()
        snapshot.forEach(doc => {
            lists = [...lists, { id: doc.id, ...doc.data() }]
        })
    }
    return lists
}

const realtimeUpdateLists = (uid, callback) => {
    firebase.firestore()
        .collection('users')
        .doc(uid)
        .collection('lists')
        .onSnapshot(snapshot => {
            let lists = []
            snapshot.forEach(doc => {
                lists = [...lists, { id: doc.id, ...doc.data() }]
            })
            callback(lists)
        })
}

const stopListsRealtimeListener = (uid) => {
    firebase.firestore()
        .collection('users')
        .doc(uid)
        .collection('lists')
        .onSnapshot(() => { })
}

export {
    addList, deleteList, getAllLists,
    realtimeUpdateLists, stopListsRealtimeListener, editListName,
    addItem, deleteItem, editItemText, setItemEnabledState,
    setAllItemsEnabledState, createItemFromText
}