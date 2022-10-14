import { trpc } from "../utils/trpc";
export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'Robin' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}




//   return (
//     <div className="h-screen w-screen flex flex-col justify-center items-center">
//       <div className="text-2xl text-center">Which Pokemon is Rounder</div>
//       <div className="p-2"/>
//       <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
//         <div className="w-16 h-16 bg-red-200" />
//         <div className="p-8">Vs</div>
//         <div className="w-16 h-16 bg-red-200" />
//       </div>
//     </div>
//   );
// }