import firebase from '../firebase/'

let logsRef = firebase.firestore().collection('logs')

const _getLogsCount = async () => await logsRef.get().size

const log = async (msg, userId, authResult) => {
    try {
        let logObject = {
            userId,
            authResult,
            msg,
            appName: window.navigator.appName,
            appCodeName: window.navigator.appCodeName,
            appVersion: window.navigator.appVersion,
            cookieEnabled: window.navigator.cookieEnabled,
            hardwareConcurrency: window.navigator.hardwareConcurrency,
            platform: window.navigator.platform,
            userAgend: window.navigator.userAgend,
            vendor: window.navigator.vendor
        }

        return await logsRef.doc((_getLogsCount() || 0) + 1).set(logObject)
    } catch (err) {
        return Promise.reject(new Error(`Ocorreu o seguinte erro ao tentar gravar o log: ${err.message}`))
    }
}

export { log }