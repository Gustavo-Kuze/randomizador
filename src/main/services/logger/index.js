import firebase from '../firebase/'

let logsRef = firebase.firestore().collection('logs')

const _getLogsCount = async () => {
    let span = await logsRef.get()
    return span.size
} 

const log = async (msg, userId, authResult) => {
    try {
        let date = new Date()
        let logObject = {
            msg,
            loggedAt: {
                date: date.toLocaleString(),
                dateValue: date.valueOf()
            },
            userId: userId || '',
            appName: window.navigator.appName || '',
            appCodeName: window.navigator.appCodeName || '',
            appVersion: window.navigator.appVersion || '',
            cookieEnabled: window.navigator.cookieEnabled || '',
            hardwareConcurrency: window.navigator.hardwareConcurrency || '',
            platform: window.navigator.platform || '',
            userAgend: window.navigator.userAgend || '',
            vendor: window.navigator.vendor || '',
            authResult: authResult || {},
        }

        let logId = ((await _getLogsCount()) || 0) + 1
        return await logsRef.doc(`${logId}`).set(logObject)
    } catch (err) {
        return Promise.reject(new Error(`Ocorreu o seguinte erro ao tentar gravar o log: ${err.message}`))
    }
}

export { log }