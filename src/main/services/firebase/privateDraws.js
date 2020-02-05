/* eslint-disable no-return-await */
import Chance from 'chance';
import firebase from './index';
import constants from '../../components/draw/drawUtils/constants';

const chance = new Chance();

let drawsRef = null;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    drawsRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('draws');
  }
});

const savePrivateResult = async drawResults => {
  if (drawsRef) {
    return await drawsRef.doc(`${chance.android_id()}`).set(drawResults);
  }
  return Promise.reject(
    new Error(
      'Não foi possível obter a instância da collection draws. drawsRef era null',
    ),
  );
};

const getPrivateResults = async () => {
  if (drawsRef) {
    return await drawsRef
      .orderBy('date', 'desc')
      .limit(constants.PRIVATE_RESULTS_GET_LIMIT)
      .get();
  }
  return Promise.reject(
    new Error(
      'Não foi possível obter a instância da collection draws. drawsRef era null',
    ),
  );
};

const getNextPrivateResults = async lastVisible => {
  if (drawsRef) {
    return await drawsRef
      .orderBy('date', 'desc')
      .limit(constants.PRIVATE_RESULTS_GET_LIMIT)
      .startAfter(lastVisible)
      .get();
  }
  return Promise.reject(
    new Error(
      'Não foi possível obter a instância da collection draws. drawsRef era null',
    ),
  );
};

const deletePrivateResult = async id => {
  if (drawsRef) {
    return await drawsRef.doc(id).delete();
  }
  return Promise.reject(
    new Error(
      'Não foi possível obter a instância da collection draws. drawsRef era null',
    ),
  );
};

const deleteAllPrivateResults = async () => {
  if (drawsRef) {
    const results = await getPrivateResults();
    return await Promise.all(
      results.docs.map(async doc => {
        return await doc.ref.delete();
      }),
    );
  }
  return Promise.reject(
    new Error(
      'Não foi possível obter a instância da collection draws. drawsRef era null',
    ),
  );
};

export {
  savePrivateResult,
  getPrivateResults,
  getNextPrivateResults,
  deletePrivateResult,
  deleteAllPrivateResults,
};
