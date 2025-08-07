import OrangeCatInLove from '/assets/images/orange-cat-in-love.png';
import BlackCatInLove from '/assets/images/black-cat-in-love.png';
import BlackCatOnTree from '/assets/images/cat-on-tree.png';
import BlackCatWithApple from '/assets/images/black-cat-given-apple.png';
import OrangeCatPoisoned from '/assets/images/orange-cat-poisoned.png';
import OrangeCatWithoutMemories from '/assets/images/orange-cat-without-memories.png';
import Crow from '/assets/images/crow.png';
import { AnimatePresence, motion } from "framer-motion";

export const story = [
  {
    id: 0,
    step: [
      {
        type: 'text',
        text: 'Era uma vez um casal que se amava muito e faziam de tudo pelo bem estar um do outro',
      },
      {
        type: 'image',
        content: (

          <div className="flex items-center justify-center w-65 h-65 rounded-full bg-gradient-to-br from-[#d432ba] to-[#e46bd1] ring-2 ring-[#c431ad]">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <img src={OrangeCatInLove} alt="orange cat" className="h-[30%] w-[50%]" />
                <img src={BlackCatInLove} alt="black cat" className="h-[30%] w-[50%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      }
    ]
  },
  {
    id: 1,
    step: [
      {
        type: 'text',
        text: 'Certo dia a rajadinha estava com tanta fome, que o meia-noite subiu em uma árvore gigante pra pegar uma frutinha pra sua amada',
      },
      {
        type: 'image',
        content: (
          <div className="flex items-center justify-center w-85 h-85 rounded-4xl">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <img src={BlackCatOnTree} alt="black cat on tree" className="h-[80%] w-[90%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      }
    ]
  },
  {
    id: 2,
    step: [
      {
        type: 'text',
        text: 'Rajadinha ficou muito feliz e agradeceu seu amado',
      },
      {
        type: 'image',
        content: (
          <div className="flex items-center justify-center w-85 h-85 rounded-4xl">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <img src={BlackCatWithApple} alt="black cat giving apple for orange cat" className="h-[80%] w-[90%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      }
    ]
  },
  {
    id: 3,
    step: [
      {
        type: 'text',
        text: 'Oh não! A maçã estava envenenada...\nMeia-noite está inconsolável com sua amada desacordada',
      },
      {
        type: 'image',
        content: (
          <div className="flex items-center justify-center w-65 h-65 rounded-full bg-gradient-to-br from-[#140d28] to-[#e46bd1] ring-2 ring-[#140d28]">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <img src={OrangeCatPoisoned} alt="orange-cat-poisoned" className="h-[80%] w-[90%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      }
    ]
  },
  {
    id: 4,
    step: [
      {
        type: 'text',
        text: 'Quando rajadinha acordou, ela não lembrava de nada...Nem mesmo de seu amado, ela havia perdido a memória',
      },
      {
        type: 'image',
        content: (
          <div className="flex items-center justify-center w-65 h-65 rounded-full bg-gradient-to-br from-[#140d28] to-[#e46bd1] ring-2 ring-[#140d28]">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <img src={OrangeCatWithoutMemories} alt="without memories" className="h-[80%] w-[90%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      }
    ]
  },
  {
    id: 5,
    step: [
      {
        type: 'text',
        text: 'Um corvo misterioso apareceu e começou a ler um pergaminho com algumas instruções...',
      },
      {
        type: 'image',
        content: (
          <div className="flex items-center justify-center w-65 h-65 rounded-full bg-[#140d28] ring-2 ring-[#140d28]">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <img src={Crow} alt="crow" className="h-[80%] w-[90%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      }
    ]
  },
  {
    id: 6,
    step: [
      {
        type: 'text',
        text: 'Somente meia-noite conseguia enxergar o corvo.',
      },
      {
        type: 'text',
        text: 'Ele explicou que a maçã estava envenenada e que a única forma de salvar sua amada era com uma poção mágica',
      },
      {
        type: 'text',
        text: 'Mas para isso, ele precisava completar 4 missões especiais para coletar os ingredientes',
      },
      {
        type: 'text',
        text: 'Complete as missões a seguir para ajudar o meia-noite',
      },
    ]
  },
];