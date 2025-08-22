import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import Movies from "./components/Movie/Movie";
import MovieForm from "./components/Movie/MovieForm";
import Background from "./components/Background/Background";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  return (
    <Router>
      <Background />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<RequireAuth />}>
            <Route path="/movies" element={<Movies />} />        
            <Route path="/movies/manage" element={<MovieForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
