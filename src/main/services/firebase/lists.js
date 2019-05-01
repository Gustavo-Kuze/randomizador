import firebase from './index'

let listsCollectionRef = null;

firebase.auth().onAuthStateChanged(user => {
    if (user) listsCollectionRef = firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('lists')
})

const addList = async (list) => {
    if (listsCollectionRef)
        return await listsCollectionRef.add(list)
    return null
}

export { addList }