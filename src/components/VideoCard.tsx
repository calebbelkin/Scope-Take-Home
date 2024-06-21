import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';
import ReactPlayer from 'react-player';
import avatar from '../assets/boy.png';
import womenAvatar from '../assets/woman.png';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

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
  alignItems: 'center',
};

interface VideoCardProps {
  title: string;
  video_url: string;
  description: string;
  id: string;
}

export default function VideoCard({ title, video_url, description, id }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(false);
  const [localComment, setLocalComment] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { user_id } = useContext(UserContext);

  const handleSubmit = () => {
    console.log('Comment:', localComment);
    uploadComment();
    setLocalComment('');
    console.log('Comment cleared:', localComment);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const url = `http://localhost:1234/videos/comments?${id}`;

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const text = await response.text();
//         const data = text ? JSON.parse(text) : [];
//         setComments(data.videos);
//         console.log(data.videos);
//       } catch (error) {
//         setError(error as Error);
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchComments();
//   }, [url]);

const uploadComment = () => {
    fetch('http://localhost:1234/videos/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id: id,
        content: localComment,
        user_id: user_id,
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  const mockUserComment = {
    profile_pic: womenAvatar,
    user_id: 'alyssa_thompson',
    content: 'Super helpful video, I always find myself coming back to this one!',
  };

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
          <div className="flex flex-col gap-2 p-4 justify-center">
            <ReactPlayer url={video_url} controls />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{description}</Typography>
            <Typography variant="body2">0 Comments</Typography>
            <div className="flex items-center">
              <img src={avatar} alt="User avatar" className="h-10 w-10" />
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Add a Comment..."
                  variant="standard"
                  value={localComment}
                  onChange={(e) => setLocalComment(e.target.value)}
                />
              </Box>
              <UniformButton size="default" className="rounded-full py-1 text-sm" onClick={handleSubmit}>
                Comment
              </UniformButton>
            </div>
            <div className="flex pt-4">
              <img src={mockUserComment.profile_pic} alt="User avatar" className="h-10 w-10" onClick={() => console.log(id)} />
              <div className="flex flex-col justify-between pl-3">
                <Typography variant="caption">@{mockUserComment.user_id}</Typography>
                <Typography variant="body2">{mockUserComment.content}</Typography>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
