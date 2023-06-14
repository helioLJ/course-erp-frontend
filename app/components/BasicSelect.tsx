'use client'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

export default function BasicSelect() {
  const [classname, setClassname] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setClassname(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Turma</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classname}
          label="Turma"
          onChange={handleChange}
        >
          <MenuItem value={5}>Todas</MenuItem>
          <MenuItem value={10}>Turma 5</MenuItem>
          <MenuItem value={20}>Turma 6</MenuItem>
          <MenuItem value={30}>Turma 7</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
