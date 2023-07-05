import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { ReactNode } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '1px solid #27272A',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 24,
  p: 4,
}

interface FormModalProps {
  isOpen: boolean
  handleClose: () => void
  onSubmit: (data: any) => Promise<void>
  children: ReactNode
}

export function FormModal({
  isOpen,
  handleClose,
  onSubmit,
  children,
}: FormModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style} className="dark:bg-zinc-800">
            <form className="space-y-4" onSubmit={onSubmit}>
              {children}
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
