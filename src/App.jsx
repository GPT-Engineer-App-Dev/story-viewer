import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import TopStoriesPage from "./components/TopStoriesPage.jsx";
import StoryDetailsPage from "./components/StoryDetailsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/top-stories" element={<TopStoriesPage />} />
        <Route path="/story/:id" element={<StoryDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
