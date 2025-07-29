import { useNavigate } from "react-router-dom";
import PadlockIcon from '/assets/images/padlock.png';
import { cn } from "../utils/cn";
import { useMissions } from "../services/context/missionContext";

export const Panel = () => {
  const { missions } = useMissions();

  const navigate = useNavigate();
  
  return (
    
    <div className="flex flex-col h-screen max-w-[700px] w-full items-center p-4 justify-around bg-[#0f1a19]">
      <h1 className="mt-4 text-5xl font-bold font-cabin text-white">
        MISSÕES
      </h1>
      <div className="grid grid-cols-2 gap-2 w-full">
        {missions?.map((mission) => (

          <button
            key={mission.id}
            onClick={() => navigate(mission.route)}
            disabled={mission.disabled}
          >
            <div 
              className={cn('flex justify-center flex-col w-full h-50 p-4 border border-white rounded-lg cursor-pointer',  mission.disabled ? 'opacity-30' : 'bg-[#0b1b1a]')}
            >
              {mission.disabled && (
                <div className="flex justify-between">
                  <span className="font-cabin text-[0.5em] text-gray-300">{mission.dateUnlock}</span>
                  <img src={PadlockIcon} alt='padlock' className="w-8 h-8" />
                </div>
              )}
              <div className="flex justify-center items-center h-full">
                <h2 className="text-white text-6xl font-bold font-cabin">{mission.id}</h2>
              </div>

            </div>
          </button>
          
        ))}
      </div>
    </div>
  );
};