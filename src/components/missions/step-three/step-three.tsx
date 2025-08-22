import BaconImg from '/assets/images/bacon.png';
import SteakImg from '/assets/images/carne.png';
import CheeseImg from '/assets/images/cheese.png';
import BreadImg from '/assets/images/bread.png';
import ShrekTip from '/assets/images/shrek-tip.png';
import ReloadRandom from '/assets/images/reload-random.png';
import UndoIcon from '/assets/images/undo.png';
import ReloadIcon from '/assets/images/reload.png';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { useStepOne } from '../step-one/use-step-one';
import { Modal } from '../../modal/modal';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';


const bacon = <img src={BaconImg} alt="bacon" data-name="bacon" className="w-12 h-12" />
const steak = <img src={SteakImg} alt="steak" data-name="steak" className="w-12 h-12" />
const cheese = <img src={CheeseImg} alt="cheese" data-name="cheese" className="w-12 h-12" />
const bread = <img src={BreadImg} alt="bread" data-name="bread" className="w-12 h-12" />

// const gridGabarito = [
//   [bacon, steak, cheese, bread],
//   [cheese, bread, steak, bacon],
//   [steak, bacon, bread, cheese],
//   [bread, cheese, bacon, steak],
// ];

export const StepThree = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [randomIngredient, setRandomIngredient] = useState<number | null>(null);
  const [showShrekTip, setShowShrekTip] = useState<boolean>(false);
  const [disabledShrekTip, setDisabledShrekTip] = useState<boolean>(false);
  const [totalReload, setTotalReload] = useState<number>(0);
  const [isLoss, setIsLoss] = useState(false);
  const [winner, setWinner] = useState(false);
  const [wrongCells, setWrongCells] = useState<number[]>([]);
  const [gridList, setGridList] = useState([
    [bacon, '', '', bread],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', steak],
  ]);
  const [gridHistory, setGridHistory] = useState([
    [
      [bacon, '', '', bread],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', steak],
    ]
  ]);

  const navigate = useNavigate();

  const { setIsModalOpen, isModalOpen } = useStepOne();

  const lastIngredientIndex = useRef<number>(0);
  const ingredients = [bacon, steak, cheese, bread];

  const getNewRandomIndex = (length: number): number => {
    if (length <= 1) return 0;
  
    let newIndex = lastIngredientIndex.current;
    while (newIndex === lastIngredientIndex.current) {
      newIndex = Math.floor(Math.random() * length);
    }
  
    lastIngredientIndex.current = newIndex;
    return newIndex;
  };

  useEffect(() => {
    const nextIndex = getNewRandomIndex(ingredients.length);
    setRandomIngredient(nextIndex);
  }, []);

  const updateRandomIngredient = useMemo(() => {
    return ingredients[randomIngredient as number] as React.ReactElement;
  }, [randomIngredient]);

  const logicalForIngredientSelected = (
    position: number,
    ingredient: React.ReactElement
  ) => {
    setSelectedIndex(position);

    const gridUpdated = gridList.flatMap((grid) => [...grid]);

    if (gridUpdated[position] === "") {

      gridUpdated[position] = ingredient;
      
      const newGrid2D: any[] = [];
      for (let i = 0; i < 4; i++) {
        newGrid2D.push(gridUpdated.slice(i * 4, (i + 1) * 4));
      }
      
      setGridHistory(prev => [...prev, newGrid2D]);
      setGridList(newGrid2D);
    
      const nextIndex = getNewRandomIndex(ingredients.length);
      setRandomIngredient(nextIndex);
    }
  };

  useEffect(() => {
    const gridUpdated = gridList.flatMap((grid) => [...grid]);
    if (!gridUpdated.includes("")) {
      console.log('entrei')
      verifyWinner();
    }
  }, [gridList]);

  const shrekTip = () => {
    setShowShrekTip(true);
    setIsModalOpen(true);
  }

  const handleReloadRandom = () => {
    const nextIndex = getNewRandomIndex(ingredients.length);
    setRandomIngredient(nextIndex);
    setTotalReload(totalReload + 1);
  }

  const undoAction = () => {
    if (gridHistory.length > 1) {
      const newHistory = [...gridHistory];
      newHistory.pop();
      
      const previousState = newHistory[newHistory.length - 1];
      
      setGridHistory(newHistory);
      setGridList(previousState);
      setSelectedIndex(null);
    }
  }

  const verifyWinner = () => {
    const gridFlat = gridList.flat();
    if (gridFlat.includes("")) return;
  
    const grid2D: string[][] = [];
    for (let i = 0; i < 4; i++) {
      const row = gridFlat.slice(i * 4, (i + 1) * 4).map((cell: any) => {
        return cell?.props?.["data-name"];
      });
      grid2D.push(row);
    }

    let invalidCells: number[] = [];
  
    // 🔹 Verifica linhas
    grid2D.forEach((row, rowIndex) => {
      const seen: Record<string, number[]> = {};
      row.forEach((value, colIndex) => {
        if (!value) return;
        if (!seen[value]) {
          seen[value] = [rowIndex * 4 + colIndex];
        } else {
          seen[value].push(rowIndex * 4 + colIndex);
        }
      });
      Object.values(seen).forEach(indices => {
        if (indices.length > 1) invalidCells.push(...indices);
      });
    });
  
    // 🔹 Verifica colunas
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      const seen: Record<string, number[]> = {};
      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const value = grid2D[rowIndex][colIndex];
        if (!value) continue;
        const pos = rowIndex * 4 + colIndex;
        if (!seen[value]) {
          seen[value] = [pos];
        } else {
          seen[value].push(pos);
        }
      }
      Object.values(seen).forEach(indices => {
        if (indices.length > 1) invalidCells.push(...indices);
      });
    }
  
    if (invalidCells.length === 0) {
      setWinner(true);
      setIsModalOpen(true);
      confetti({
        particleCount: 250,
        spread: 90,
        origin: { y: 0.6 },
      });
      return;
    }
  
    setWrongCells(invalidCells);
    setIsLoss(true);
    setIsModalOpen(true);
  };
  
  
  return (
    <div className="flex flex-col h-auto max-w-[768px] w-full items-center justify-center gap-4 p-2 bg-[#0f1a19] ">
      <h1 className="text-[#ffc222] text-6xl font-bold font-cabin my-4">Missão 3</h1>
      <div className='flex justify-between w-[332px] items-center '>
        <div className='flex gap-2 items-center'>
          <h2 className='text-white font-cabin'>Ingrediente: </h2>
          <span>{ showShrekTip ? (
            <img 
              src='https://media.tenor.com/hx9dBu-vRDoAAAAi/shrek-smirk.gif' 
              alt='gif shrek' 
              className='w-20 h-20' 
            />
          ) : updateRandomIngredient}</span>
        </div>

        <button onClick={() => handleReloadRandom()} disabled={totalReload === 5}>
          <div className='flex flex-col gap-1'>
            <img src={ReloadRandom} alt='reload icon' className='w-8 h-8'/>  
            <span className={cn('font-cabin font-bold text-white', totalReload === 5 ? 'opacity-5' : '')}>{totalReload}/5</span>
          </div>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        closeIcon={false}
      >
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-white text-center">Escolha o ingrediente que precisa</p>
          
          <div className="flex gap-1 rounded-lg p-2">
            {ingredients.map((ingredient, index) => (
              <button onClick={() => {
                setRandomIngredient(index);
                setShowShrekTip(false);
                setIsModalOpen(false);
                setDisabledShrekTip(true);
              }}>
                <div
                  key={Number(ingredient)}
                  className='w-15 h-15 border rounded-lg flex items-center justify-center text-white text-lg font-bold border-white'
                >
                  {ingredient}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {winner && (
        <Modal
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          closeIcon={false}
        >
          <div className="flex flex-col items-center gap-4 ">
          <h2 className="text-[#ffc222] text-2xl font-bold font-cabin">Parabéns!</h2>
            <p className="text-white text-center">Você conseguiu coletar o terceiro ingrediente!</p>
            
            <div className="flex flex-col items-center justify-center gap-2 ">
              <img src='https://media.tenor.com/tckaK8CQmNIAAAAj/shrek-dan%C3%A7ando-shrek-meme.gif' alt="shrek dancing" />
              <p className="text-white text-center">Hamburguer é a comida preferida do casal de gatinhos e eles são fã de shrek</p>
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

      {isLoss && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-white text-center text-xl font-bold font-cabin">Tente novamente!</h2>

            <button
              onClick={() => {
                setIsModalOpen(false)
                setGridList([
                  [bacon, '', '', bread],
                  ['', '', '', ''],
                  ['', '', '', ''],
                  ['', '', '', steak],
                ]);
              }}
              className="bg-[#ffc222] text-[#0f1a19] px-6 py-2 rounded-lg font-bold hover:bg-[#ffb000] transition-colors"
            >
              <img src={ReloadIcon} alt="Reload" className="w-20 h-20" />
            </button>
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-4 grid-rows-4 gap-1 rounded-lg p-2">
        {gridList.flat().map((cell, index) => (
          <button onClick={() => logicalForIngredientSelected(index, updateRandomIngredient)}>
            <div
              key={index}
              className={cn(
                'w-20 h-20 border rounded-lg flex items-center justify-center text-white text-lg font-bold',
                selectedIndex === index ? 'border-amber-400 ring-2 ring-amber-400' : 'border-white',
                winner ? 'border-4 border-green-500' : '',
                wrongCells.includes(index) ? 'border-4 border-red-500' : ''
              )}
            >
              {cell}
            </div>
          </button>
        ))}
      </div>

      <div className='flex justify-between w-[332px]'>
        <button onClick={() => undoAction()}>
          <div className='flex flex-col'>
            <img src={UndoIcon} alt='undo' className='w-8 h-8' />
            <span className='text-amber-500 font-cabin text-[0.7em]'>Desfazer</span>
          </div>
        </button>
        <button onClick={() => shrekTip()} disabled={disabledShrekTip}>
          <div className='flex flex-col items-end'>
            <img src={ShrekTip} alt='shrek tip' className={cn('w-8 h-8', disabledShrekTip ? 'opacity-10' : '')} />
            <span className={cn('text-amber-500 font-cabin text-[0.7em]', disabledShrekTip ? 'opacity-10' : '')}>Pedir ajuda ao shrek</span>
          </div>
        </button>
      </div>


      <div className="mt-4 flex font-cabin flex-col p-4 gap-4 border w-[332px] border-white rounded-lg">
        <h2 className="text-[#ffc222] text-xl font-bold">Objetivo </h2>
        <span className="text-white text-sm">Forme quatro hamburgueres sem repetir ingredientes por linhas e colunas</span>

        <h2 className="text-[#ffc222] text-xl font-bold">Regras </h2>
        <ul className="list-disc list-inside">
          <li className="text-white text-sm">Você não pode repetir ingredientes por linha e coluna</li>
          <li className="text-white text-sm">Você tem direito a 1 dica do Shrek</li>
          <li className="text-white text-sm">Você pode sortear um ingrediente novo por até 5 vezes</li>
        </ul>
        
      </div>
      
    </div>
  );
};
