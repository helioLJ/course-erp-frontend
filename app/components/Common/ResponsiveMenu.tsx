'use client'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'

export default function ResponsiveMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="text-green-500"
      >
        <AlignJustify />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="#">
          <MenuItem onClick={handleClose}>Alunos</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem onClick={handleClose}>Pagamentos</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem onClick={handleClose}>Notas</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem onClick={handleClose}>Professores</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem onClick={handleClose}>Turmas</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem onClick={handleClose}>Disciplinas</MenuItem>
        </Link>
      </Menu>
    </div>
  )
}
