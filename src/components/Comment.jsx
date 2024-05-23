import React, { useState } from 'react';
import { Box, Text, Button, VStack } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import SubmitCommentForm from './SubmitCommentForm';

const Comment = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('parent_id', comment.id)
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching replies:', error);
    } else {
      setReplies(data);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text>{comment.text}</Text>
      <Text>Points: {comment.points}</Text>
      <Text>Author: {comment.author}</Text>
      <Text>Time: {new Date(comment.time).toLocaleString()}</Text>
      <Button onClick={() => setShowReplyForm(!showReplyForm)} mt={2}>
        {showReplyForm ? 'Cancel' : 'Reply'}
      </Button>
      {showReplyForm && (
        <SubmitCommentForm
          storyId={comment.story_id}
          parentId={comment.id}
          onCommentSubmitted={fetchReplies}
        />
      )}
      <VStack spacing={4} align="stretch" mt={4}>
        {replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      </VStack>
    </Box>
  );
};

export default Comment;