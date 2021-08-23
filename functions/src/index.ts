const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const firestore = admin.firestore()

const setStatus = (uid: string, status: string, currentRoom: any) => {
  const room = { ...currentRoom }
  const teammateIndex = room.team.findIndex((item: any) => item.uid === uid)
  const currentStatus = room.team[teammateIndex].status
  const isOwner = room.owner.uid === uid
  const isAcitve = room.active.uid === uid

  console.log({ isAcitve, isOwner, currentStatus })

  const newTeam = [...room.team]

  // if user went offline and isActive, then make channel owner as active user
  if (isAcitve && status === 'offline') {
    room.active = { ...room.owner }
  }

  newTeam[teammateIndex] = { ...newTeam[teammateIndex], status: status }

  return { ...room, team: newTeam }
}

exports.onStatusChanged = functions.database
  .ref('/status/{ruid}')
  .onUpdate(async (change: any, context: any) => {
    const eventStatus = change.after.val()
    const statusSnapshot = await change.after.ref.once('value')
    const status = statusSnapshot.val()

    if (status.last_changed > eventStatus.last_changed) {
      return null
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed)

    const [userId, roomId] = context.params.ruid.split('_')

    const roomRef = firestore.collection('rooms').doc(roomId)
    const roomEntry = await roomRef.get()
    const room = roomEntry.data()

    const newRoom = setStatus(userId, eventStatus.state, room)

    return roomRef.set(newRoom)
  })
