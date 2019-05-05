import firebase from './index'
import Chance from 'chance'
let chance = new Chance()

let drawsRef = null;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        drawsRef = firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('draws')
    }
})

const savePrivateResult = async (drawResults) => {
    if (drawsRef) {
        return await drawsRef.doc(`${chance.android_id()}`).set(drawResults)
    }
    return null
}

const getPrivateResults = async () => {
    if (drawsRef) {
        return await drawsRef.orderBy('date', 'desc').get()
    }
    return null
}

const deletePrivateResult = async (id) => {
    if (drawsRef) {
        return await drawsRef.doc(id).delete()
    }
    return null
}

const deleteAllPrivateResults = async () => {
    if (drawsRef) {
        let results = await getPrivateResults()
        return await Promise.all(results.docs.map(async doc => {
            return await doc.ref.delete()
        }))
    }
    return null
}

export {
    savePrivateResult, getPrivateResults, deletePrivateResult, deleteAllPrivateResults
}