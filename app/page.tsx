'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import CurrencyCard from './components/CurrencyCard'

const CURRENCIES = ['usd', 'eur', 'gbp', 'brl', 'bitcoin', 'ethereum', 'solana', 'worldcoin']

interface CurrencyData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] }
  market_cap: number
  total_volume: number
}

export default function Home() {
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${CURRENCIES.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
        )
        const data = await response.json()
        setCurrencyData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currencyData.map((currency) => (
                <CurrencyCard
                  key={currency.id}
                  name={currency.name}
                  symbol={currency.symbol}
                  price={currency.current_price}
                  change24h={currency.price_change_percentage_24h}
                  chartData={currency.sparkline_in_7d.price.map((price) => ({ price }))}
                  marketCap={currency.market_cap}
                  volume24h={currency.total_volume}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

