import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: '#DEF2F1',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default function VideoCard({ title, video_url, description }: VideoCardProps) {
//   const [title, setTitle] = React.useState('');
//   const [description, setDescription] = React.useState('');
//   const [url, setUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
     <div onClick={handleOpen} className="cursor-pointer">
        {title}
     </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Post
          </Typography> */}
            <div className="flex flex-col gap-2 p-4 w-[750px] h-[550px]">
          <a href={video_url} className="relative aspect-video">
            <iframe
              src={video_url}
              title={title}
              // style={{ width: '450px', height: '300px' }}
              className="block w-full h-full object-cover rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </a>
          <div className='text-xl'>{title}</div>
          <div className='text-sm'>{description}</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}