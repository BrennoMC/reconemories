import { motion } from "motion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bg-transparent bg-opacity-20 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-[#0f1a19] p-6 rounded-lg border border-white relative max-w-md w-[90%]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-[#ffc222] text-xl font-bold"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
}; 