import { Button } from 'components'

export const RoomControls = () => {
  return (
    <div className="flex items-center justify-center pt-8 space-x-4">
      <Button variant="outline" color="gray">
        set status away
      </Button>
      <Button variant="outline" color="red">
        leave room
      </Button>
    </div>
  )
}
