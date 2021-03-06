import firebase from './index';

const feedbacksRef = firebase.firestore().collection('feedbacks');

const likesRef = firebase
  .firestore()
  .collection('positiveFeedbacks')
  .doc('counter');

const getFeedbackssCount = async () => {
  const snap = await feedbacksRef.get();
  return snap.size;
};

const saveFeedback = async drawResults => {
  const currentCount = await getFeedbackssCount();
  await feedbacksRef.doc(`${currentCount + 1}`).set(drawResults);
  return currentCount + 1;
};

const saveFeedbackImage = (id, imgFile) => {
  return new Promise((res, rej) => {
    try {
      const childFeedbacksRef = firebase
        .storage()
        .ref()
        .child(`feedbacks/${id}`);
      childFeedbacksRef
        .put(imgFile)
        .then(snapshot => {
          res(snapshot);
        })
        .catch(error => console.log(error.message));
    } catch (error) {
      rej(error);
    }
  });
};

const getLikesCount = async () => {
  const counter = await likesRef.get();
  return counter.data().likes;
};

const like = async () => {
  const likes = await getLikesCount();
  return likesRef.set({
    likes: likes + 1,
  });
};

export { saveFeedback, saveFeedbackImage, like, getLikesCount };
