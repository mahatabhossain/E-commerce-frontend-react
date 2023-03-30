import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const UserCard = ({user}) => {
    console.log(user)
  return (
    <Card sx={{ maxWidth: 330 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography>
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
  )
}

export default UserCard