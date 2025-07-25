
import { useIntroSteps } from "../hooks/scenes/useIntroSteps";
import Arrow from '/assets/images/seta-para-a-direita.png';

export const Intro = () => {
  const { 
    visibleSteps, 
    handleNextStep, 
    handlePreviousStep,
    canGoBack,
    isLastStep 
  } = useIntroSteps();

  return (
    <div className="flex justify-between max-w-[700px] w-full flex-col h-screen p-4 bg-[#202020]">
      <div
        className="mt-6 flex flex-col gap-8 h-[80%]"
      >
        {visibleSteps.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.type === 'image' && (
              item.content
            )}

            {item.type === 'text' && (
              <h4 className="mt-4 font-cabin text-[1em] text-white text-center ">
                {item.text}
              </h4>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between h-[20%] items-center">
        {canGoBack && (
          <button onClick={handlePreviousStep} className="flex outline-none h-20">
            <img src={Arrow} className="rotate-180" alt="Voltar" />
          </button>
        )}
        <button onClick={handleNextStep} className="flex outline-none h-20 ml-auto">
          <img src={Arrow} alt={isLastStep ? "Finalizar" : "Avançar"} />
        </button>
      </div>
    </div>
  );
};
