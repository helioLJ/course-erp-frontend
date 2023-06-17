'use client'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export interface ClassesType {
  id: string
  name: string
  start_day: string
  end_day: string
  period: string
}

interface BasicSelectProps {
  value: { name: string; id: string }
  onChange: any
  data: ClassesType[]
}

export default function BasicSelect({
  value,
  onChange,
  data,
}: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string
    if (selectedName === 'Todas' || selectedName === '') {
      onChange({ name: selectedName, id: '' })
      return
    }
    const selectedClass = data.find(
      (classObj: ClassesType) => classObj.name === selectedName,
    )

    if (selectedClass) {
      const { id } = selectedClass
      onChange({ name: selectedName, id })
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel className="dark:text-white" id="demo-simple-select-label">
          Turma
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value.name}
          label="Turma"
          onChange={handleChange}
          className="dark:text-white"
        >
          <MenuItem value="Todas">Todas</MenuItem>
          {data &&
            data.map((classObj: ClassesType) => (
              <MenuItem key={classObj.id} value={classObj.name}>
                {classObj.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  )
}
