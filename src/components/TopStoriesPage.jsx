import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const TopStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('time', { ascending: false })
      .range((page - 1) * 5, page * 5 - 1);

    if (error) {
      console.error('Error fetching stories:', error);
    } else {
      setStories(data);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {stories.map((story) => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
            <Link as={RouterLink} to={`/story/${story.id}`} fontSize="xl" fontWeight="bold">
              {story.title}
            </Link>
            <Text>URL: <Link href={story.url} isExternal>{story.url}</Link></Text>
            <Text>Points: {story.points}</Text>
            <Text>Author: {story.author}</Text>
            <Text>Time: {new Date(story.time).toLocaleString()}</Text>
          </Box>
        ))}
      </VStack>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1} mt={4} mr={2}>
        Previous
      </Button>
      <Button onClick={() => setPage(page + 1)} mt={4}>
        Next
      </Button>
    </Box>
  );
};

export default TopStoriesPage;