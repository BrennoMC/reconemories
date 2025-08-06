import { motion } from "motion/react";
import { cn } from "../../utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classNameProps?: string;
  closeIcon?: boolean;
}

export const Modal = ({ isOpen, onClose, children, classNameProps, closeIcon=true }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={cn("p-6 rounded-lg border border-white max-w-md w-[90%] bg-[#0f1a19]", classNameProps)}
      >
        {closeIcon && (
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="flex text-white text-xl font-bold self-end"
            >
              <span className="text-white">✕</span>
            </button>
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
};
