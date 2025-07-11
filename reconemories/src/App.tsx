import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Intro } from "./scenes/intro";
import { Panel } from "./scenes/panel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
