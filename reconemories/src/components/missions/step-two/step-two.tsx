import { cn } from "../../../utils/cn";
import { InputWithButton } from "./input-with-button/input-with-button";
import { Modal } from "../../modal/Modal";
import ReloadIcon from '/assets/images/reload.png';
import { LIMIT, MARK_HIDE_CIRCLE } from "../../../consts/mission-two/consts";
import Elevator from '/assets/images/elevator.jpg';
import Light from '/assets/images/light.png';
import { useStepTwo } from "./use-step-two";

export const StepTwo = () => {
  const {     
    circlesList,
    positions,
    count,
    hint,
    isModalOpen,
    showTip,
    endLimit,
    isLoss,
    setIsModalOpen,
    setCount,
    setShowTip,
    setHint,
    handleHideCircle,
    verifyCorrectImage,
    navigate
  } = useStepTwo();


  return (
    <div className="flex flex-col h-screen max-w-[700px] w-full items-center p-4 gap-4 justify-around bg-[#1b1e23] overflow-scroll">
      <h1 className="text-[#ffc222] text-6xl font-bold font-cabin my-4">Missão 2</h1>

      <div className="flex items-start w-full">
        <h2 className='text-white font-cabin pr-2'>Tentativas: </h2>
        <h2 className={cn(endLimit ? 'text-[#ee2400]' : 'text-white')}>{count}</h2>
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
        <div className="flex">
          <span className="text-sm text-amber-600 pr-2">Dica:</span>
          <span className="text-sm text-white font-cabin">É um local importante para os gatinhos...</span>
        </div>
      )}
      <div className="flex flex-col justify-around gap-4 w-full border border-white rounded-md p-4">
        <div className="flex justify-between w-full">
          <div>
            <h2 className="font-cabin text-white">Objetivo</h2>
            <span className="font-cabin text-sm text-gray-400">Descubra a imagem ao fundo</span>
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
