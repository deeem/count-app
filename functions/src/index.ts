const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const firestore = admin.firestore()

exports.onUserStatusChanged = functions.database
  .ref('/status/{ruid}')
  .onUpdate(async (change: any, context: any) => {
    const eventStatus = change.after.val()

    const userStatusFirestoreRef = firestore.doc(
      `status/${context.params.ruid}`
    )

    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    const statusSnapshot = await change.after.ref.once('value')
    const status = statusSnapshot.val()
    functions.logger.log(status, eventStatus)
    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (status.last_changed > eventStatus.last_changed) {
      return null
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed)

    return userStatusFirestoreRef.set(eventStatus)
  })
