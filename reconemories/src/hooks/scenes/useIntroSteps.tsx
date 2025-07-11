import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { story } from "../../consts/steps/story";

export const useIntroSteps = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [substep, setSubstep] = useState(0);

  const currentSteps = story[step]?.step || [];
  const isLastSubstep = substep === currentSteps.length - 1;
  const isLastStep = step === story.length - 1;
  const isFirstStep = step === 0 && substep === 0;

  const handleNextStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLastSubstep) {
      setSubstep((prev) => prev + 1);
    } else if (isLastStep) {
      navigate('/panel');
    } else {
      setStep((prev) => prev + 1);
      setSubstep(0);
    }
  };

  const handlePreviousStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (substep > 0) {
      setSubstep((prev) => prev - 1);
    } else if (step > 0) {
      setStep((prev) => prev - 1);
      setSubstep(story[step - 1]?.step.length - 1 || 0);
    }
  };

  const visibleSteps = currentSteps.slice(0, substep + 1);

  return {
    visibleSteps,
    handleNextStep,
    handlePreviousStep,
    canGoBack: !isFirstStep,
    isLastStep
  };
}; 