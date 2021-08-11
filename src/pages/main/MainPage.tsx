import { useHistory } from 'react-router-dom'
import { db } from '../../firebase'
import { Button } from 'components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from '../../firebase'
import { LoginPage } from 'pages/login/LoginPage'

export const MainPage = () => {
  const history = useHistory()
  const [user, loading] = useAuthState(firebase.auth())
  if (loading) return null
  if (!user) return <LoginPage />

  const createRoom = async () => {
    const response = await db.collection('rooms').add({
      counter: 0,
      owner: user,
      active: user,
      team: [{ ...user, status: 'active' }],
      created_at: new Date(),
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
