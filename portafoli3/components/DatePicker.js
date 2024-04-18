import React, { useState } from 'react'
import { Button } from './Button'
import DatePicker from 'react-native-date-picker'

export default function DatePick ({mode}) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button label="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        mode={mode}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}