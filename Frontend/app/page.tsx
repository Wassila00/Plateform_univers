import Link from "next/link"
import Image from "next/image"
import DynamicBackground from "@/components/dynamic-background"
import { Button } from "@/components/ui/button"
import { Newspaper } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Navigation */}
      <header className="relative z-10 border-b border-amber-700/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="absolute h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-900"></div>
              <div
                className="absolute h-3 w-3 rounded-full bg-amber-300 animate-pulse"
                style={{ left: "65%", top: "30%" }}
              ></div>
              <div className="absolute h-2 w-2 rounded-full bg-amber-200" style={{ left: "25%", top: "60%" }}></div>
            </div>
            <span className="text-xl font-bold tracking-wider">AstroDive</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white">SYSTÈME SOLAIRE</h1>

          <div className="pt-12">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-14 py-6 text-xl font-bold text-white shadow-lg shadow-amber-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-700/50">
              <span className="relative z-10 flex flex-col items-center">
                <span className="text-2xl tracking-wider">COMMENCER</span>
                <span className="block text-sm font-normal opacity-80">MODÈLE EN LIGNE</span>
              </span>
              <span className="absolute inset-0 -translate-y-full bg-gradient-to-r from-amber-400 to-amber-600 transition-transform duration-300 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-amber-600 to-amber-400 transition-transform duration-300 group-hover:translate-y-0"></span>
              <span className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-50"></span>
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-50"></span>
              <span className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-amber-200 to-transparent opacity-50"></span>
              <span className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-amber-200 to-transparent opacity-50"></span>
            </button>
          </div>

          <div className="pt-12">
            <Link href="/news">
              <Button
                variant="outline"
                className="bg-black/30 border-amber-500 text-white hover:bg-amber-900/30 hover:border-amber-400 px-6 py-6 text-lg"
              >
                <Newspaper className="mr-2 h-5 w-5" />
                DERNIÈRES NOUVELLES
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}