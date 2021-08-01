import { Button } from 'components'
import React, { useState } from 'react'

type Props = {
  counter: number
  onChange: (counter: number) => void
}

export const CounterEdit: React.FC<Props> = ({ counter, onChange }) => {
  const [editCounter, setEditCounter] = useState(counter)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return

    setEditCounter(+e.target.value)
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onChange(editCounter)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center space-x-4"
    >
      <input
        value={editCounter}
        onChange={onInputChange}
        className="w-12 px-2 py-1 text-center border border-blue-100"
      />
      <Button variant="filled" color="blue" size="medium" type="submit">
        save
      </Button>
    </form>
  )
}
