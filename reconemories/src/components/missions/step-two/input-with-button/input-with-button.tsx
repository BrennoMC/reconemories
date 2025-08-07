interface InputWithButtonProps {
  hint: string;
  setHint: (value: string) => void;
  handleClick: () => void;
}

export const InputWithButton = ({ hint, setHint, handleClick }: InputWithButtonProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="font-cabin text-amber-600">O que você acha que está escondido na imagem?</label>
      <div className="flex gap-2 w-[90%] h-[40%] ">
        <div className="w-[40%] border border-white rounded-md px-4 py-1 text-white">
          <input 
            type='text' 
            value={hint} 
            onChange={(e) => setHint(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-[30%] pointer border border-amber-100 bg-amber-400 rounded-lg p-4">
          <button
            type='submit' 
            onClick={handleClick}
          >
            <span className='text-sm text-[#1b1e23] text-center font-bold font-cabin'>Verificar</span>
          </button>
        </div>
      </div>
    </div>
  )
}