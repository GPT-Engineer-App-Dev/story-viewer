import React, { useState } from 'react';
import { Box, Button, Textarea, Input } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const SubmitCommentForm = ({ storyId, parentId, onCommentSubmitted }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('comments')
      .insert([{ story_id: storyId, parent_id: parentId, text, author }]);

    if (error) {
      console.error('Error submitting comment:', error);
    } else {
      onCommentSubmitted();
      setText('');
      setAuthor('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="md">
      <Textarea
        placeholder="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        mb={2}
        required
      />
      <Input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        mb={2}
        required
      />
      <Button type="submit">Submit Comment</Button>
    </Box>
  );
};

export default SubmitCommentForm;