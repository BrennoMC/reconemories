import { createContext, useContext, useEffect, useState } from "react";

interface Mission {
  id: number;
  route: string;
  disabled: boolean;
  dateUnlock: string;
}

interface MissionContextType {
  missions: Mission[];
  unlockMission: (id: number) => void;
  resetMissions: () => void;
}

const initialMissions: Mission[] = [
  { id: 1, route: '/step-one', disabled: false, dateUnlock: '' },
  { id: 2, route: '/step-two', disabled: false, dateUnlock: '' },
  { id: 3, route: '/step-three', disabled: true, dateUnlock: '23/08/2025' },
  { id: 4, route: '/step-four', disabled: true, dateUnlock: '30/08/2025' },
];

const STORAGE_KEY = 'missao_progresso';

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialMissions;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }, [missions]);

  const unlockMission = (id: number) => {
    setMissions(prev =>
      prev.map(mission =>
        mission.id === id ? { ...mission, disabled: false } : mission
      )
    );
  };

  const resetMissions = () => {
    setMissions(initialMissions);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MissionContext.Provider value={{ missions, unlockMission, resetMissions }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = (): MissionContextType => {
  const context = useContext(MissionContext);
  if (!context) throw new Error("useMissions deve ser usado dentro do MissionProvider");
  return context;
};
