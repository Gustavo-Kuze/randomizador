import firebase from './index'

let feedbacksRef = firebase.firestore()
    .collection('feedbacks')

let likesRef = firebase.firestore()
.collection('positiveFeedbacks').doc('counter')

const _getFeedbackssCount = async () => {
    let snap = await feedbacksRef.get()
    return snap.size
}

const saveFeedback = async (drawResults) => {
    let currentCount = await _getFeedbackssCount()
    await feedbacksRef.doc(`${currentCount + 1}`).set(drawResults)
    return currentCount + 1
}

const saveFeedbackImage = (id, imgFile) => {
    return new Promise((res, rej) => {
        try {
            let feedbacksRef = firebase.storage().ref().child(`feedbacks/${id}`)
            feedbacksRef.put(imgFile).then(snapshot => {
                res(snapshot)
            })
        } catch (error) {
            rej(error)
        }
    })
}

const getLikesCount = async () => {
    let counter = await likesRef.get()
    return counter.data().likes
}

const like = async () => {
    let likes = await getLikesCount()
    return await likesRef.set({
        likes: likes + 1
    })
}

export {
    saveFeedback, saveFeedbackImage, like, getLikesCount
}
