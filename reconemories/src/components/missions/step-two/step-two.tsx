import { useEffect, useRef, useState } from "react";

export const StepOne = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const speed = 10;
  const containerRef = useRef<HTMLDivElement>(null);

  // Movimento por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      moveBall(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Função compartilhada entre teclado e botões
  const moveBall = (direction: string) => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      if (direction === "ArrowRight" || direction === "right") newX += speed;
      if (direction === "ArrowLeft" || direction === "left") newX -= speed;
      if (direction === "ArrowUp" || direction === "up") newY -= speed;
      if (direction === "ArrowDown" || direction === "down") newY += speed;

      return { x: newX, y: newY };
    });
  };

  return (
    <div className="flex flex-col h-screen w-full items-center p-4 justify-around bg-[#0f1a19]">
      {/* Área do jogo */}
      <div
        ref={containerRef}
        className="relative flex w-[90%] h-[70%] p-6 border border-white rounded-lg overflow-hidden"
      >
        {/* Bolinha */}
        <div
          className="absolute w-4 h-4 bg-amber-400 rounded-full"
          style={{
            left: position.x,
            top: position.y,
            transition: "left 0.05s, top 0.05s",
          }}
        />

        {/* Buraco (exemplo) */}
        <div
          className="absolute w-10 h-10 bg-black rounded-full"
          style={{ left: 250, top: 150 }}
        />
      </div>

      {/* Controles visuais */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          onClick={() => moveBall("up")}
        >
          ↑
        </button>
        <div className="flex gap-2">
          <button
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => moveBall("left")}
          >
            ←
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => moveBall("right")}
          >
           →
          </button>
        </div>
        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          onClick={() => moveBall("down")}
        >
          ↓
        </button>
      </div>
    </div>
  );
};
