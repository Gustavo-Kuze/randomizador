import firebase from './index';

let drawsRef = firebase.firestore().collection('public_results');

const _getPublicResultsCount = async () => {
  let snap = await drawsRef.get();
  return snap.size;
};

const savePublicResult = async drawResults => {
  let currentCount = await _getPublicResultsCount();
  await drawsRef.doc(`${currentCount + 1}`).set(drawResults);
  return currentCount + 1;
};

const getPublicResult = async resultNumber => {
  let snap = await drawsRef.doc(resultNumber).get();
  return { id: snap.id, ...snap.data() };
};

export { savePublicResult, getPublicResult };
