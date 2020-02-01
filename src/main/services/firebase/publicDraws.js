import firebase from './index';

const drawsRef = firebase.firestore().collection('public_results');

const _getPublicResultsCount = async () => {
  const snap = await drawsRef.get();
  return snap.size;
};

const savePublicResult = async drawResults => {
  const currentCount = await _getPublicResultsCount();
  await drawsRef.doc(`${currentCount + 1}`).set(drawResults);
  return currentCount + 1;
};

const getPublicResult = async resultNumber => {
  const snap = await drawsRef.doc(resultNumber).get();
  return { id: snap.id, ...snap.data() };
};

export { savePublicResult, getPublicResult };
