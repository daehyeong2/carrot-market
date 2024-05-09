export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-screen-md shadow-lg p-5 rounded-3xl flex flex-col md:flex-row gap-2">
        <input
          className="w-full rounded-full h-12 bg-gray-200 pl-5 outline-none ring ring-transparent transition-shadow focus:ring-offset-2 focus:ring-orange-500"
          type="text"
          placeholder="Search here..."
        />
        <button className="bg-black text-white py-2 rounded-full active:scale-90 transition-transform font-medium outline-none md:px-5">
          Search
        </button>
      </div>
    </main>
  );
}
