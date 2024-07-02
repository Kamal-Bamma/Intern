// import "./App.css";
// import Container from "./components/Container";
// import Fetch from "./components/Fetch";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import SinglePost from "./components/SinglePost";
// import Post from "./components/Post";

// function App() {
//   return (
//     <>
//       <Router>
//         <Container>
//           <Fetch />
//         </Container>

//         <Routes>
//           <Route path="/fetch/:id " element={<div> {"asdasd"} </div>} />
//           {/* <Route path="/asd" element={<div> {"asdasd"} </div>} /> */}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

import "./App.css";
import Container from "./components/Container";
import Fetch from "./components/Fetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Fetch />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
