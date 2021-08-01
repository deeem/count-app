import { useState } from 'react'
import { Team } from './Team'
import { Controls } from './Controls'
import { Counter } from './Counter'
import { CounterEdit } from './CounterEdit'

export const CountPage = () => {
  const [counter, setCounter] = useState(0)
  const [editMode, setEditMode] = useState(false)

  const onCounterEdit = (newCounter: number) => {
    setCounter(newCounter)
    setEditMode(false)
  }

  return (
    <>
      {editMode ? (
        <CounterEdit counter={counter} onChange={onCounterEdit} />
      ) : (
        <Counter counter={counter} setCounter={setCounter} />
      )}
      <Team />
      <Controls editMode={editMode} setEditMode={setEditMode} />
    </>
  )
}
