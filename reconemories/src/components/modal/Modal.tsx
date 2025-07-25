import { motion } from "motion/react";
import { cn } from "../../utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classNameProps?: string;
}

export const Modal = ({ isOpen, onClose, children, classNameProps }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={cn("fixed bg-transparent bg-opacity-20 flex items-center justify-center", classNameProps)}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col bg-[#0f1a19] p-6 rounded-lg border border-white relative max-w-md w-[90%]"
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="flex text-white hover:text-[#ffc222] text-xl font-bold self-end"
          >
            <span className="text-white">✕</span>
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}; 