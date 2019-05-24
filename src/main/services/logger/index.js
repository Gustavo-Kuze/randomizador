import firebase from '../firebase/'

let logsRef = firebase.firestore().collection('logs')

const log = msg => {

}

export {

}

/*
Objetos a recolher no log

window.navigator{
    appName,
    appCodeName,
    appVersion,
    cookieEnabled,
    hardwareConcurrency,
    platform,
    userAgend,
    vendor
}

data e hora

let data = new Date()
guardar data e data.valueOf()

*/