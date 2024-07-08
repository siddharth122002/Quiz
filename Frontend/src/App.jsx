import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Take from "./components/Take";
import TakeQuiz from "./components/TakeQuiz";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/take" element={<Take />}/>
        <Route path="/take/:id" element={<TakeQuiz />}/>
      </Routes>
    </Router>
  )
}

export default App
