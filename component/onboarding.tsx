import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center px-6 py-8">
      {/* Stars */}
      <div className="flex flex-col items-center space-y-8 mb-16">
        <Star className="w-12 h-12 text-white fill-white" />
        <Star className="w-12 h-12 text-white fill-white" />
        <Star className="w-12 h-12 text-white fill-white" />
      </div>

      {/* Content */}
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-white text-4xl font-bold">Olá!</h1>
        <p className="text-[#b3b3b3] text-lg leading-relaxed max-w-sm">
          Explore mais do seu estilo pessoal e descubra nossas recomendações inteligentes
        </p>
      </div>

      {/* Button */}
      <Link href="/style-discovery">
        <Button className="bg-[#b9ff25] hover:bg-[#a8e622] text-black font-semibold text-lg px-8 py-6 rounded-xl w-full max-w-sm h-auto flex items-center justify-between">
          <span>Encontrar meu estilo</span>
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </Link>
    </div>
  )
}
