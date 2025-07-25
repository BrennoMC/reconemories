import { useNavigate } from "react-router-dom";

interface Mission {
  id: number;
  route: string;
}

export const Panel = () => {
  const missions: Array<Mission> = [
    { id: 1, route: '/step-one' },
    { id: 2, route: '/step-two' },
    { id: 3, route: '/step-three' },
    { id: 4, route: '/step-four' },
  ]

  const navigate = useNavigate();
  
  return (
    
    <div className="flex flex-col h-screen max-w-[700px] w-full items-center p-4 justify-around bg-[#0f1a19]">
      <h1 className="mt-4 text-5xl font-bold font-cabin text-white">
        MISSÕES
      </h1>
      <div className="grid grid-cols-2 gap-2 w-full">
        {missions?.map((mission) => (
          <button 
            className="flex items-center justify-center bg-[#0b1b1a] h-50 p-4 border border-white rounded-lg cursor-pointer"
            onClick={() => navigate(mission.route)}
          >
            <h2 className="text-white text-6xl font-bold font-cabin">{mission.id}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};