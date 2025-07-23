import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Intro } from "./scenes/intro";
import { Panel } from "./scenes/panel";
import { StepOne } from "./components/missions/step-one/step-one";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/step-one" element={<StepOne />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
