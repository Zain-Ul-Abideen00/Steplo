// import Image from "next/image";

// interface ProductGalleryProps {
//   images: string[];
// }

// export function ProductGallery({ images }: ProductGalleryProps) {
//   return (
//     <div className="grid gap-4">
//       {images.map((image, index) => (
//         <div 
//           key={index} 
//           className="bg-[#f5f5f5] aspect-square relative rounded-lg overflow-hidden"
//         >
//           <Image
//             src={image}
//             alt={`Product image ${index + 1}`}
//             fill
//             className="object-contain p-8"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 653px"
//             priority={index === 0}
//           />
//         </div>
//       ))}
//     </div>
//   );
// } 