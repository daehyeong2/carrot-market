export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-screen-md shadow-lg p-5 rounded-3xl flex flex-col md:flex-row justify-center md:items-center gap-2">
        <input
          className="w-full  rounded-full h-12 bg-gray-200 pl-5 outline-none ring ring-transparent transition-shadow focus:ring-offset-2 focus:ring-green-500 invalid:focus:ring-red-500 peer"
          type="email"
          placeholder="Email address"
          required
        />
        <span className="min-w-max text-red-500 font-medium hidden peer-invalid:block">
          Email is required.
        </span>
        <button className="min-w-max bg-black text-white py-2 rounded-full active:scale-90 transition-transform font-medium outline-none md:px-5 peer-invalid:cursor-not-allowed">
          Log in
        </button>
      </div>
    </main>
  );
}
