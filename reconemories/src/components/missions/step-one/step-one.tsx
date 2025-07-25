import { Modal } from "../../modal/Modal";
import { useStepOne } from "./use-step-one";
import ReloadIcon from "/assets/images/reload.png";

export const StepOne = () => {
  const { 
    numbers, 
    selectedIndices, 
    isModalOpen, 
    setIsModalOpen, 
    handleSelectNumber, 
    verifyWin, 
    isLoss,
    setNumbers,
    setIsLoss,
    initialNumbers,
  } = useStepOne();

  return (
    <div className="flex flex-col h-screen w-full max-w-[700px] overflow-y-auto items-center p-4 gap-2 justify-around bg-[#0f1a19]">
      
      <h1 className="text-[#ffc222] text-6xl font-bold font-cabin my-4">Missão 1</h1>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[#ffc222] text-2xl font-bold font-cabin">Parabéns!</h2>
          <p className="text-white text-center">Você conseguiu coletar o primeiro ingrediente!</p>
          
          <div className="flex flex-col items-center justify-center gap-2 ">
            <span className="text-white font-bold font-cabin h-10 w-10 border bg-yellow-700 text-xl text-center flex items-center justify-center">8</span>
            <span className="text-white text-center">É a quantidade de anos que os gatinhos estão juntos</span>
          </div>
          
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-[#ffc222] text-[#0f1a19] px-6 py-2 rounded-lg font-bold hover:bg-[#ffb000] transition-colors"
          >
            Continuar
          </button>
        </div>
      </Modal>

      {/* Board com overlay de derrota */}
      <div className="relative w-[90%] max-w-md items-center justify-center">
        {isLoss && (
          <button 
            className="absolute inset-0 flex flex-col items-center justify-center"
            onClick={() => {
              setNumbers(initialNumbers)
              setIsLoss(false)
            }}  
          >
           <img src={ReloadIcon} alt="Reload" className="w-20 h-20" />
           <div className="bg-amber-300 p-1 rounded-lg">
            <span className="text-md font-cabin">Ah não! Você perdeu!</span>
           </div>
          </button>
        )}
        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full border border-white rounded-lg p-2">
          {numbers.map((number, index) => (
            <button
              key={index}
              className={
                `flex items-center justify-center h-20 border text-white font-bold text-xl cursor-pointer 
                ${numbers[index] === '0' 
                  ? "border-gray-700 bg-gray-500" : "border-white"} 
                  ${selectedIndices.includes(index) ? " bg-yellow-700" : ""}`
                }
              onClick={() => handleSelectNumber(index)}
              disabled={verifyWin()}
            >
              <span className={`${numbers[index] === '0'  ? " text-gray-700" : "text-white"} font-bold text-xl`}>{number}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex font-cabin flex-col p-4 gap-4 border w-[90%] border-white rounded-lg">
        <h2 className="text-[#ffc222] text-xl font-bold">Objetivo </h2>
        <span className="text-white text-sm">O último número a restar deve ser o 8.</span>

        <h2 className="text-[#ffc222] text-xl font-bold">Regras </h2>
        <ul className="list-disc list-inside">
          <li className="text-white text-sm">Selecione dois números para subtrair o valor.</li>
          <li className="text-white text-sm">O resultado da subtração será o valor do segundo número selecionado.</li>
        </ul>
        
      </div>

    </div>
  );
};
