import firebase from './index'

const listsCollectionRef = firebase.firestore().collection('lists')

const addList = async (list) => {
    return await listsCollectionRef.add(list)
}

export { addList }