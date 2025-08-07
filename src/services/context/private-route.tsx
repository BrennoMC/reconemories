import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMissions } from "./missionContext";

interface PrivateRouteProps {
  missionId: number;
}

export const PrivateRoute = ({ missionId }: PrivateRouteProps) => {
  const { missions } = useMissions();
  const location = useLocation();

  const mission = missions.find(m => m.id === missionId);

  if (!mission || mission.disabled) {
    return <Navigate to="/panel" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
