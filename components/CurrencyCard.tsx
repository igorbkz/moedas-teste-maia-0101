import { useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

interface CurrencyCardProps {
  name: string
  symbol: string
  price: number
  change24h: number
  chartData: { price: number }[]
  marketCap: number
  volume24h: number
}

export default function CurrencyCard({ name, symbol, price, change24h, chartData, marketCap, volume24h }: CurrencyCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const changeColor = change24h >= 0 ? 'text-green-400' : 'text-red-400'

  return (
    <div className="bg-gray-800 overflow-hidden shadow-lg rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
              {name} ({symbol.toUpperCase()})
            </h2>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-baseline">
          <div className="text-3xl font-semibold text-white">
            R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`${changeColor} text-lg font-medium`}>
            {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
          </div>
        </div>
        <div className="mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#9ca3af' }}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          {showDetails ? 'Ocultar detalhes' : 'Mostrar detalhes'}
        </button>
        {showDetails && (
          <div className="mt-4 space-y-2 text-gray-300">
            <p>Cap. de Mercado: R$ {marketCap.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
            <p>Volume (24h): R$ {volume24h.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
          </div>
        )}
      </div>
    </div>
  )
}

