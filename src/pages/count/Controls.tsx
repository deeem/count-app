import { Button } from 'components'
import React from 'react'

interface Props {
  editMode: boolean
  setEditMode: (editMode: boolean) => void
}

export const Controls: React.FC<Props> = ({ editMode, setEditMode }) => {
  const switchToEdit = () => {
    setEditMode(true)
  }

  return (
    <div className="flex items-center justify-center pt-8 space-x-4">
      <Button
        variant="outline"
        color="blue"
        onClick={switchToEdit}
        disabled={editMode}
      >
        edit counter
      </Button>
      <Button variant="outline" color="gray">
        set status away
      </Button>
      <Button variant="outline" color="red">
        leave room
      </Button>
    </div>
  )
}
