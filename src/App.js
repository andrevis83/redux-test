import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import PostAdd from "./pages/PostAdd";
import './app.scss';

function App() {
  return (
    <BrowserRouter>
        <header>
          <Link to="/">Home</Link>
          <Link to="/posts" style={{marginLeft: 16}}>Posts</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />   
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/add" element={<PostAdd />} />    
        </Routes>
    </BrowserRouter>
  );
}

export default App;
