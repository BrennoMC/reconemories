import confetti from "canvas-confetti";
import { CORRECT_IMAGE_TEXT, LIMIT, MARK_HIDE_CIRCLE, TOTAL_CIRCLES } from "../../../consts/mission-two/consts";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStepOne } from "../step-one/use-step-one";

export const useStepTwo = () => {
  const list: number[] = Array.from({ length: TOTAL_CIRCLES }, (_, i) => i);
  const [circlesList, setCircleList] = useState<number[]>(list);
  const [count, setCount] = useState<number>(0);
  const [hint, setHint] = useState<string>('');
  const [showTip, setShowTip] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const { isLoss, setIsLoss, isModalOpen, setIsModalOpen } = useStepOne();

  useEffect(() => {
    setShowTip(false);
    setIsLoss(false);
    setCircleList(list);
    setIsModalOpen(false);
    setCount(0);
  }, [])

  const positions = useMemo(() => {
    setCount(0);

    return Array.from({ length: TOTAL_CIRCLES }, () => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
    }));
  }, [isLoss]);

  const endLimit = useMemo(() => {
    return count === LIMIT;
  }, [count]);

  const handleHideCircle = (index: number) => {
    console.log(index)
    if (circlesList[index] !== MARK_HIDE_CIRCLE && !endLimit) {
      const updated = [...circlesList];
      updated[index] = MARK_HIDE_CIRCLE;
      setCircleList(updated);
      
      setCount((prev) => prev + 1);
    }
  };
  
  const verifyCorrectImage = () => {
    if (hint.toUpperCase() === CORRECT_IMAGE_TEXT) {
      confetti({
        particleCount: 250,
        spread: 90,
        origin: { y: 0.6 },
      });

      setCircleList([]);
      setIsModalOpen(true);
    } else {
      setIsLoss(true);
      setIsModalOpen(true);
    }
  }

  return {
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
  }
}