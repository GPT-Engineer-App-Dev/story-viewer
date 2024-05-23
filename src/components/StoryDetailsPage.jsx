import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Link, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Comment from './Comment';
import SubmitCommentForm from './SubmitCommentForm';

const StoryDetailsPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchStory();
    fetchComments();
  }, [id]);

  const fetchStory = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching story:', error);
    } else {
      setStory(data);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('story_id', id)
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  return (
    <Box p={4}>
      {story && (
        <Box mb={4}>
          <Text fontSize="2xl" fontWeight="bold">{story.title}</Text>
          <Text>URL: <Link href={story.url} isExternal>{story.url}</Link></Text>
          <Text>Points: {story.points}</Text>
          <Text>Author: {story.author}</Text>
          <Text>Time: {new Date(story.time).toLocaleString()}</Text>
        </Box>
      )}
      <VStack spacing={4} align="stretch">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </VStack>
      <SubmitCommentForm storyId={id} onCommentSubmitted={fetchComments} />
    </Box>
  );
};

export default StoryDetailsPage;