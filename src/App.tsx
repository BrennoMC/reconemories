import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Intro } from "./scenes/intro";
import { Panel } from "./scenes/panel";
import { StepOne } from "./components/missions/step-one/step-one";
import { StepTwo } from "./components/missions/step-two/step-two";
import { MissionProvider } from "./services/context/missionContext";
import { PrivateRoute } from "./services/context/private-route";
import { StepThree } from "./components/missions/step-three/step-three";

function App() {
  return (
    <MissionProvider>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/step-one" element={<StepOne />} />
        <Route path="/step-two" element={<StepTwo />} />
        <Route path="/step-three" element={<StepThree />} />

        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </MissionProvider>
  )
}

export default App;
