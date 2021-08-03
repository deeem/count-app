import { Button } from 'components'

export const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-12">
      <h1 className="text-3xl font-bold ">Team Count App</h1>
      <p>click the button to create new team room</p>
      <Button variant="filled" color="blue" size="large">
        CREATE ROOM
      </Button>
    </div>
  )
}
