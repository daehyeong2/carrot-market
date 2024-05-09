export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-screen-md shadow-lg p-5 rounded-3xl flex flex-col md:flex-row justify-center gap-3">
        {["Nico", "Me", "You", "Yourself", ""].map((person, index) => (
          <div key={index} className="flex items-center gap-5">
            <div className="size-9 bg-blue-400 rounded-full" />
            <span className="text-lg font-medium empty:w-24 empty:h-3 empty:bg-gray-300 empty:rounded-full empty:animate-pulse">
              {person}
            </span>
            <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
              <span className="z-10">{index + 1}</span>
              <div className="animate-ping size-6 bg-red-500 rounded-full absolute" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
