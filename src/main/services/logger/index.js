import firebase from '../firebase';

const logsRef = firebase.firestore().collection('logs');

const _prepareAuthResultForLog = authResult => {
  return {
    user: {
      uid: authResult.uid || '',
      displayName: authResult.displayName || '',
      email: authResult.email || '',
      apiKey: authResult.apiKey || '',
      authDomain: authResult.authDomain || '',
      lastLoginAt: authResult.lastLoginAt || '',
    },
    credential: {
      accessToken: authResult.credential
        ? authResult.credential.accessToken || ''
        : '',
    },
    additionalUserInfo: {
      name: authResult.additionalUserInfo
        ? authResult.additionalUserInfo.name || ''
        : '',
      providerId: authResult.additionalUserInfo
        ? authResult.additionalUserInfo.providerId || ''
        : '',
      granted_scopes: authResult.additionalUserInfo
        ? authResult.additionalUserInfo.profile
          ? authResult.additionalUserInfo.profile.granted_scopes || ''
          : ''
        : '',
    },
  };
};

const _getLogsCount = async () => {
  const span = await logsRef.get();
  return span.size;
};

const log = async (msg, userId, authResult) => {
  try {
    const date = new Date();
    const preparedAuthResult = authResult
      ? _prepareAuthResultForLog(authResult)
      : {};
    const logObject = {
      msg,
      loggedAt: {
        date: date.toLocaleString(),
        dateValue: date.valueOf(),
      },
      userId: userId || '',
      appName: window.navigator.appName || '',
      appCodeName: window.navigator.appCodeName || '',
      appVersion: window.navigator.appVersion || '',
      cookieEnabled: window.navigator.cookieEnabled || '',
      hardwareConcurrency: window.navigator.hardwareConcurrency || '',
      platform: window.navigator.platform || '',
      userAgent: window.navigator.userAgent || '',
      vendor: window.navigator.vendor || '',
      authResult: preparedAuthResult,
    };

    const logId = ((await _getLogsCount()) || 0) + 1;
    await logsRef.doc(`${logId}`).set(logObject);
    return logId;
  } catch (err) {
    return Promise.reject(
      new Error(
        `Ocorreu o seguinte erro ao tentar gravar o log: ${err.message}`,
      ),
    );
  }
};

export { log };
