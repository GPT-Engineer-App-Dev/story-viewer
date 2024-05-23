import React, { useState } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const SubmitStoryForm = ({ onStorySubmitted }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('stories')
      .insert([{ title, url, author }]);

    if (error) {
      console.error('Error submitting story:', error);
    } else {
      onStorySubmitted();
      setTitle('');
      setUrl('');
      setAuthor('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="md">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={2}
        required
      />
      <Input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        mb={2}
        required
      />
      <Button type="submit">Submit Story</Button>
    </Box>
  );
};

export default SubmitStoryForm;