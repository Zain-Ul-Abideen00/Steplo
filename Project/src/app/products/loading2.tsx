// import { Loading } from "@/components/ui/loading";

// export default function ProductsLoading() {
//   return (
//     <div className="mx-auto px-5 sm:px-10 py-8">
//       {/* Header Skeleton */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="space-y-2">
//           <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
//           <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
//         </div>
//         <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
//       </div>

//       <div className="flex gap-8">
//         {/* Filters Skeleton */}
//         <aside className="w-64 hidden lg:block">
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
//               <div className="space-y-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="h-8 w-full bg-gray-200 rounded animate-pulse" />
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
//               <div className="space-y-2">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="h-8 w-full bg-gray-200 rounded animate-pulse" />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Products Grid Skeleton */}
//         <main className="flex-1">
//           <Loading variant="productGrid" count={9} />
//         </main>
//       </div>
//     </div>
//   );
// }
