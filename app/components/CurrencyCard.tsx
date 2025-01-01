import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface CurrencyCardProps {
  name: string
  symbol: string
  price: number
  change24h: number
  chartData: { price: number }[]
  marketCap: number
  volume24h: number
}

export default function CurrencyCard({
  name,
  symbol,
  price,
  change24h,
  chartData,
  marketCap,
  volume24h
}: CurrencyCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num)
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  const data = {
    labels: chartData.map((_, i) => i.toString()),
    datasets: [
      {
        data: chartData.map((point) => point.price),
        borderColor: change24h >= 0 ? '#10B981' : '#EF4444',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-gray-400 uppercase">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-white">{formatNumber(price)}</p>
          <p className={`${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change24h.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="h-24 mb-4">
        <Line options={chartOptions} data={data} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Cap. Mercado</p>
          <p className="text-white">{formatNumber(marketCap)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Volume 24h</p>
          <p className="text-white">{formatNumber(volume24h)}</p>
        </div>
      </div>
    </div>
  )
} 