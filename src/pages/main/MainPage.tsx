import { Button } from 'components'

export const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="pb-8 text-3xl font-bold">Team Count App</h1>
      <p className="pb-8">click the button to create new team room</p>
      <Button variant="filled" color="blue" size="large">
        CREATE ROOM
      </Button>
    </div>
  )
}
