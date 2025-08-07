import { cn } from "../../../utils/cn";
import { InputWithButton } from "./input-with-button/input-with-button";
import { Modal } from "../../modal/modal";
import ReloadIcon from '/assets/images/reload.png';
import { LIMIT, MARK_HIDE_CIRCLE } from "../../../consts/mission-two/consts";
import Elevator from '/assets/images/elevator.jpg';
import Light from '/assets/images/light.png';
import { useStepTwo } from "./use-step-two";
import { useState } from "react";

export const StepTwo = () => {
  const [showTip, setShowTip] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "1. Esses dois subiram juntos até aqui...",
    "2. Estão parados em um lugar pequeno e fechado.",
    "3. Um ambiente comum em prédios altos.",
    "4. Você pode ver botões numerados nas paredes...",
  ];

  const handleNextTip = () => {
    if (tipIndex < tips.length - 1) {
      setTipIndex(tipIndex + 1);
    }
  };

  const {     
    circlesList,
    positions,
    count,
    hint,
    isModalOpen,
    endLimit,
    isLoss,
    setIsModalOpen,
    setCount,
    setHint,
    handleHideCircle,
    verifyCorrectImage,
    navigate
  } = useStepTwo();


  return (
    <div className="flex flex-col h-screen max-w-[700px] w-full items-center p-4 gap-4 justify-around bg-[#1b1e23] overflow-scroll">
      <h1 className="text-[#ffc222] text-6xl font-bold font-cabin my-4">Missão 2</h1>

      <div className="flex flex-col items-start w-full">
        <span className="text-white">Círculos escondidos: </span>

        <progress 
          value={count} 
          max={LIMIT}  
          className={cn('w-full h-2 mt-2 rounded-lg bg-gray-700', endLimit ? 'text-[#ee2400]' : 'text-white')}
        />
      
      </div>
      <div className="relative w-full min-h-[70%] h-full border border-white rounded-lg flex items-center justify-center">

        <div className="w-40 h-40 bg-[url(/assets/images/elevator.jpg)] bg-cover opacity-10"></div>
        {circlesList.map((circle, index) => (
          <div
            key={index}
            className={cn(
              'absolute w-6 h-6 rounded-full transition-all duration-300 ease-out',
              circle === MARK_HIDE_CIRCLE 
                ? 'opacity-0 scale-0' 
                : 'bg-amber-400 opacity-100 scale-100'
            )}
            style={positions[index]}
            onClick={() => handleHideCircle(index)}
          ></div>
        ))}

        {isLoss && (
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            classNameProps="w-[70%]"
          >
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-white text-center text-xl font-bold font-cabin">Tente novamente!</h2>

              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setCount(0);
                }}
                className="bg-[#ffc222] text-[#0f1a19] px-6 py-2 rounded-lg font-bold hover:bg-[#ffb000] transition-colors"
              >
                <img src={ReloadIcon} alt="Reload" className="w-20 h-20" />
              </button>
            </div>
          </Modal>
        )}

        {circlesList.length === 0 && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-[#ffc222] text-2xl font-bold font-cabin">Parabéns!</h2>
              <p className="text-white text-center">Você conseguiu coletar o segundo ingrediente!</p>
              
              <div className="flex flex-col items-center justify-center gap-2 ">
                <img src={Elevator} alt="cats on elevator" />
                <span className="text-white text-center">Neste elevador aconteceu o primeiro beijo dos gatinhos!</span>
              </div>

              <div className="bg-[#ffc222] text-[#0f1a19] px-6 py-2 rounded-lg font-bold hover:bg-[#ffb000]">
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    navigate('/panel');
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
      {endLimit && (
        <InputWithButton
          hint={hint} 
          setHint={setHint} 
          handleClick={verifyCorrectImage} 
        />
      )}
      {showTip && (
        <div className="flex items-start flex-col gap-2 w-full">
          <div className="flex ">
            <span className="text-sm text-amber-600 pr-2">Dica:</span>
            <span className="text-sm text-white font-cabin">{tips[tipIndex]}</span>
          </div>
          {tipIndex < tips.length - 1 ? (
            <button
              onClick={handleNextTip}
              className="text-xs text-amber-400 underline hover:text-amber-300"
            >
              <span className="text-xs text-amber-500">Mais uma dica</span>
            </button>
          ) : (
            <span className="text-xs text-amber-500">Essas foram todas as dicas!</span>
          )}
        </div>
      )}
      <div className="flex flex-col justify-around gap-4 w-full border border-white rounded-md p-4">
        <div className="flex justify-between w-full">
          <div>
            <h2 className="font-cabin text-white">Objetivo</h2>
            <ul className="list-disc list-inside text-white p-2">
              <li>
                <span className="font-cabin text-sm text-gray-400">Clique nos círculos para revelar partes da imagem. Quando achar que sabe o que está por trás, tente adivinhar!</span>
              </li>
              <li>
                <span className="font-cabin text-sm text-gray-400">Use dicas!</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <button onClick={() => {
              setShowTip(!showTip)
            }}>
              <img src={Light} alt="light" />
            </button>
            <span className="text-gray-400 font-cabin text-sm">dica</span>
          </div>
        </div>

        <div>
          <h2 className="font-cabin text-white">Regras</h2>
          <ul className="list-disc list-inside text-white p-2">
            <li>
              <span className="font-cabin text-sm text-gray-400">Clique nos círculos para escondê-los.</span>
            </li>
            <li>
              <span className="font-cabin text-sm text-gray-400">Você só pode esconder {LIMIT} círculos.</span>
            </li>
            <li>
              <span className="font-cabin text-sm text-gray-400">Ao esconder os {LIMIT} círculos você poderá tentar adivinhar a imagem no fundo.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
