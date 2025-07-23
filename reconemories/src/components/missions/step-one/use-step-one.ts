import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

export const useStepOne = () => {
  const numbersArray = ['16', '8', '20', '12', '33', '25', '18', '10', '1', '6', '14', '7', '3', '9', '17', '11'];
  const initialNumbers = numbersArray.sort(() => Math.random() - 0.5);
  const [numbers, setNumbers] = useState(initialNumbers);

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoss, setIsLoss] = useState(false);
  
  const onWin = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const verifyWin = () => {
    const hasOneEight = numbers.filter(number => number === '8').length === 1;
    const restAreZeros = numbers.filter(number => number !== '' && number !== '8').length === 0;

    return hasOneEight && restAreZeros;
  }

  const verifyLoss = () => {
    const nonEmptyNumbers = numbers.filter(number => number !== '');

    if (nonEmptyNumbers.length === 0) {
      setIsLoss(true);
      return true;
    }

    if (nonEmptyNumbers.length === 1 && nonEmptyNumbers[0] !== '8') {
      setIsLoss(true);
      return true;
    }

    return false;
  }

  useEffect(() => {    
    if (verifyWin()) {
      onWin();
      setIsModalOpen(true);
    } else {
      verifyLoss();
    }
  }, [numbers]);

  const handleSelectNumber = (index: number) => {
    if (selectedIndices.includes(index)) return;

    const newSelection = [...selectedIndices, index];
    setSelectedIndices(newSelection);
  
    if (newSelection.length === 2) {
      const [firstIndex, secondIndex] = newSelection;
      const updatedNumbers = [...numbers];

      const firstSelectedNumber = updatedNumbers[firstIndex]
      const secondSelectedNumber = updatedNumbers[secondIndex]

      updatedNumbers[firstIndex] = ''
      updatedNumbers[secondIndex] = Math.abs(Number(firstSelectedNumber) - Number(secondSelectedNumber)).toString()

      if (secondSelectedNumber === firstSelectedNumber) {
        updatedNumbers[firstIndex] = ''
        updatedNumbers[secondIndex] = ''
      }

      setNumbers(updatedNumbers);
      setSelectedIndices([]);
    }
  };


  return {
    initialNumbers,
    selectedIndices,
    handleSelectNumber,
    onWin,
    isLoss,
    numbers,
    isModalOpen,
    verifyWin,
    setIsModalOpen,
    setNumbers,
    setIsLoss
  }
}