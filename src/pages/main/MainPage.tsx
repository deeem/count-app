import { Button } from 'components'
import { nanoid } from 'nanoid'
import { useHistory } from 'react-router-dom'

export const MainPage = () => {
  const history = useHistory()

  const createRoom = () => {
    history.push(`/${nanoid(5)}`)
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
