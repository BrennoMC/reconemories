import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Intro } from "./scenes/intro";
import { Panel } from "./scenes/panel";
import { StepOne } from "./components/missions/step-one/step-one";
import { StepTwo } from "./components/missions/step-two/step-two";
import { MissionProvider } from "./services/context/missionContext";
import { PrivateRoute } from "./services/context/private-route";

function App() {
  return (
    <MissionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/step-one" element={<StepOne />} />

          <Route element={<PrivateRoute missionId={2} />}>
            <Route path="/step-two" element={<StepTwo />} />
          </Route>
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </MissionProvider>
  )
}

export default App;
