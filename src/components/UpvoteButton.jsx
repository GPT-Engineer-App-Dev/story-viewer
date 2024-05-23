import React from 'react';
import { Button } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const UpvoteButton = ({ id, type, points, onUpvoted }) => {
  const handleUpvote = async () => {
    const table = type === 'story' ? 'stories' : 'comments';
    const { data, error } = await supabase
      .from(table)
      .update({ points: points + 1 })
      .eq('id', id);

    if (error) {
      console.error('Error upvoting:', error);
    } else {
      onUpvoted();
    }
  };

  return (
    <Button onClick={handleUpvote}>
      Upvote ({points})
    </Button>
  );
};

export default UpvoteButton;