import { Button } from 'components'
import { db } from '../../firebase'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import React from 'react'

type Props = {
  user: ReturnType<typeof useAuth> | undefined
}

export const MainPage: React.FC<Props> = ({ user }) => {
  const history = useHistory()

  const createRoom = async () => {
    const response = await db.collection('rooms').add({
      counter: 0,
      owner: db.collection('users').doc(user?.uid),
      active: db.collection('users').doc(user?.uid),
      createdAt: new Date(),
    })

    history.push(`/${response.id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-12">
      <h1 className="text-3xl font-bold ">Team Count App</h1>
      <p>click the button to create new team room</p>
      <Button variant="filled" color="blue" size="large" onClick={createRoom}>
        CREATE ROOM
      </Button>
    </div>
  )
}
