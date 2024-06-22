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



const Comment = () => {
    return (
        <div className="flex pt-4">
              <img src={mockUserComment.profile_pic} alt="User avatar" className="h-10 w-10" onClick={() => console.log(id)} />
              <div className="flex flex-col justify-between pl-3">
                <Typography variant="caption">@{mockUserComment.user_id}</Typography>
                <Typography variant="body2">{mockUserComment.content}</Typography>
              </div>
            </div>
    )
}

export default Comment