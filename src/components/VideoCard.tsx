import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';
import ReactPlayer from 'react-player';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import EditVideoCard from '../components/EditVideoCard';
import { Divider } from '@mui/material';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import avatar from '../assets/boy.png';
import womenAvatar from '../assets/woman.png';
import UserAvatar from '../assets/boy.png';
import screenfull from 'screenfull';
import menAvatar from '../assets/profile.png';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '90vh',
  bgcolor: '#D3D9D4',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'auto',
};

interface VideoCardProps {
  title: string;
  video_url: string;
  description: string;
  id: string;
}

export default function VideoCard({ title, video_url, description, id }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [localComment, setLocalComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user_id } = useContext(UserContext);
  const [volume, setVolume] = useState(0.7);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const playerContainerRef = useRef(null);

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleChangeSpeed = (event: SelectChangeEvent) => {
    setPlaybackSpeed(Number(event.target.value));
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleSubmit = () => {
    uploadComment();
    setLocalComment('');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:1234/videos/comments/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      setError("Error in fetching comments");
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open, id]);

  const uploadComment = async () => {
    try {
      const response = await fetch('http://localhost:1234/videos/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_id: id,
          content: localComment,
          user_id: user_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchComments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const actualCommentLength = comments.length + 1;

  const mockUserComments = [
    {
      video_id: 'kDIZktbOa5x89QBr6p41',
      profile_pic: womenAvatar,
      user_id: 'alyssa_thompson',
      content: 'Super helpful video, I always find myself coming back to this one!',
    },
    {
      video_id: 'ZAH1Z7JcVgxtZtkytVuA',
      profile_pic: womenAvatar,
      user_id: 'emma_johnson',
      content: 'Great explanation! This really cleared things up for me.',
    },
    {
      video_id: 'T5LQfWNUlWsvxjmf1CL9',
      profile_pic: menAvatar,
      user_id: 'john_smith',
      content: 'Awesome content! Learned a lot from this video.',
    },
    {
      video_id: 'QazW6r9zfphUk9VmnR0a',
      profile_pic: menAvatar,
      user_id: 'michael_davis',
      content: 'This video was very informative and well-presented.',
    },
    {
      video_id: 'dJ4RGJygVxlbuc3u3uT3',
      profile_pic: womenAvatar,
      user_id: 'sophia_williams',
      content: 'Loved the video! The tips were really useful.',
    },
    {
      video_id: 'ujKBRChvODNJbZl8OTDf',
      profile_pic: menAvatar,
      user_id: 'daniel_jones',
      content: 'Really appreciated the step-by-step approach in this video.',
    },
  ];

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
        <Box
          sx={style}
          className="w-1/2 md:w-9/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 overflow-hidden"
        >
          <div className="flex flex-col gap-2 p-4 justify-center w-full">
            <div className="relative w-full flex justify-center pt-10">
              <div ref={playerContainerRef} className="
                w-full
                sm:w-[500px]
                md:w-[600px]
                lg:w-[700px]
                xl:w-[800px]
                2xl:w-[1200px]
                h-0
                pb-[56.25%]
                relative
              ">
                <ReactPlayer
                  url={video_url}
                  volume={volume}
                  playbackRate={playbackSpeed}
                  controls
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Typography className="pt-1" variant="h5">
                  {title}
                </Typography>
                <div className="flex items-center space-x-2">
                  <VolumeDown />
                  <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center' }}>
                    <Slider
                      aria-label="Volume"
                      value={volume}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={handleChangeVolume}
                      className="mr-2"
                    />
                  </Box>
                  <VolumeUp />
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-select-small-label">Speed</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={playbackSpeed}
                      label="Speed"
                      onChange={handleChangeSpeed}
                    >
                      <MenuItem value={0.75}>0.75x</MenuItem>
                      <MenuItem value={1}>Normal</MenuItem>
                      <MenuItem value={1.25}>1.25x</MenuItem>
                      <MenuItem value={1.5}>1.5x</MenuItem>
                    </Select>
                  </FormControl>
                  <FullscreenIcon onClick={toggleFullScreen} fontSize="large" className="cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <img src={UserAvatar} alt="User avatar" className="h-8 w-8" onClick={() => console.log(id)} />
                <div className="flex flex-col justify-between pl-3">
                  <Typography variant="caption"> Uploaded by @{user_id}</Typography>
                </div>
              </div>
              <EditVideoCard id={id} video_url={video_url} currTitle={title} currDescription={description} />
            </div>
            <Typography variant="body2">{description}</Typography>
            <Divider />
            <Typography variant="h7" style={{ fontWeight: 'bold' }}>
              {actualCommentLength} {actualCommentLength === 1 ? 'Comment' : 'Comments'}
            </Typography>
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
            {mockUserComments.map((comment) => {
              if (comment.video_id === id) {
                return (
                  <div key={comment.user_id} className="flex pt-4">
                    <img src={comment.profile_pic} alt="User avatar" className="h-10 w-10" />
                    <div className="flex flex-col justify-between pl-3">
                      <Typography variant="caption">@{comment.user_id}</Typography>
                      <Typography variant="body2">{comment.content}</Typography>
                    </div>
                  </div>
                );
              }
              return null;
            })}

            <div>
              {comments.map((comment, index) => (
                <div key={index} className="flex pt-4">
                  <img src={UserAvatar} alt="User avatar" className="h-10 w-10" />
                  <div className="flex flex-col justify-between pl-3">
                    <Typography variant="caption">@{comment.user_id}</Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                  </div>
                </div>
              ))}
            </div>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
