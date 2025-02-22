// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// export function LoadingBar() {
//   const [phase, setPhase] = useState<'filling' | 'emptying' | 'complete'>('filling');

//   useEffect(() => {
//     // Phase 1: Filling
//     const fillingTimer = setTimeout(() => {
//       setPhase('emptying');
//       // Phase 2: Emptying
//       const emptyingTimer = setTimeout(() => {
//         setPhase('complete');
//       }, 1500);
//       return () => clearTimeout(emptyingTimer);
//     }, 1500);

//     return () => clearTimeout(fillingTimer);
//   }, []);

//   return (
//     <AnimatePresence>
//       {phase !== 'complete' && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
//         >
//           {phase === 'filling' && (
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: "0%" }}
//               transition={{
//                 duration: 1.5,
//                 ease: "easeInOut",
//               }}
//               className="h-1 w-full bg-gradient-to-r from-[#111111] via-[#666666] to-[#111111]"
//             />
//           )}
//           {phase === 'emptying' && (
//             <motion.div
//               initial={{ x: "0%" }}
//               animate={{ x: "100%" }}
//               transition={{
//                 duration: 1.5,
//                 ease: "easeInOut",
//               }}
//               className="h-1 w-full bg-gradient-to-r from-[#111111] via-[#666666] to-[#111111]"
//             />
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
