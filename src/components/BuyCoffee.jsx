import { Button } from "@/components/ui/button"
import { Rocket, Star, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function BuyCoffee() {
 const navigate = useNavigate();
  return (
    <div id="support" className="relative flex flex-col items-center text-center p-8  overflow-hidden mt-10">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className="absolute animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            size={Math.random() * 4 + 1}
          />
        ))}
      </div>
      
      <Button variant="secondary" className="bg-gradient-to-r bg-indigo-500 hover:bg-indigo-600  text-white px-6 py-3 rounded-full text-lg font-semibold  z-10 mb-8">
        <Zap className="mr-2 h-4 w-4" />
        Energize My Mission
      </Button>
      
      <h2 className="text-4xl font-bold mb-4 z-10">Exploring the Solana cosmos?</h2>
      
      <h3 className="text-5xl font-bold text-yellow-400 mb-6 z-10">Fuel my rocket!</h3>
      
      <p className="text-lg  mb-8 max-w-2xl z-10">
        Your cosmic contribution propels me to new heights, creating more stellar content and groundbreaking projects. Thanks for being my co-pilot!
      </p>
      
      <Button onClick={()=>navigate("/launch-fuel")}
        size="lg"
        className="bg-gradient-to-r bg-indigo-600 hover:bg-indigo-700  text-white px-6 py-3 rounded-full text-lg font-semibold animate-pulse z-10"
      >
        <Rocket className="mr-2 h-6 w-6"  />
        Launch Some Fuel
      </Button>
    </div>
  )
}