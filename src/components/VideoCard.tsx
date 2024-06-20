import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';
import ReactPlayer from 'react-player';
import avatar from '../assets/boy.png'
import womenAvatar from '../assets/woman.png'

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

  const mockUserComment = {
    profile_pic: womenAvatar,
    user_id: 'alyssa_thompson',
    content: 'Super helpful video, I always find myself coming back to this one!'
  }

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
            <div className="flex flex-col gap-2 p-4 justify-center" >
          {/* <a href={video_url} className="relative aspect-video"> */}
            {/* <iframe
              src={video_url}
              title={title}
              // style={{ width: '450px', height: '300px' }}
              className="block w-full h-full object-cover rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            <ReactPlayer url={video_url} controls/> 
          {/* </a> */}
          <div className='text-xl'>{title}</div>
          <div className='text-sm'>{description}</div>
          <div>0 Comments</div>
          <div className='flex items-center '>
              <img src={avatar} className=' h-10 w-10 '>
              </img>
              <Box
      component="form"
      sx={{ 
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Add a Comment..." variant="standard" />
    </Box>
    <UniformButton size='default' className='rounded-full py-1 text-sm'>
      Comment
    </UniformButton>
            
          </div>
          <div className=' flex pt-4'>
          <img src={mockUserComment.profile_pic} className=' h-10 w-10 '>
         
          </img>
          <div className='flex flex-col justify-between pl-3'>
          <p className='text-xs'> @{mockUserComment.user_id }</p>
          <p> {mockUserComment.content}</p>
          </div>
          
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}