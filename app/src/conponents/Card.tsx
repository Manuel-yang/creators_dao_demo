import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { deletePostApi } from '../utils/utils';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

interface PostData  {
  postNonce: number,
  content: string
}

type DeletePostFunction = (postNonce: number) => void;


export default function BasicCard({post, deletePost}: {post: PostData, deletePost: DeletePostFunction}) {
  const [postData, setPostData] = useState<PostData>({postNonce: 0, content: ""})
  const wallet = useAnchorWallet()
  
  useEffect(() => {
    setPostData(post)
  },[])

  async function handleDeletePost() {
    await deletePost(postData.postNonce)
  }

  return (
    <Card sx={{ width: 575 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.content}  
        </Typography>
      </CardContent>
      <Grid container justifyContent="flex-end">
        <CardActions >
          <Button onClick={handleDeletePost} size="small">Delete</Button>
        </CardActions>
      </Grid>
    </Card>
  );
}