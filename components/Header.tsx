export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg border-b border-blue-500">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Crypto & Currency Dashboard
          </span>
        </h1>
        <p className="mt-2 text-gray-300">Acompanhe o mercado em tempo real</p>
      </div>
    </header>
  )
}

