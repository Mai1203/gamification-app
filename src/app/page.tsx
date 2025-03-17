import { Header } from '@/app/ui/Header';
import { Carts } from '@/app/ui/Carts';
import { Footer } from './ui/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              ¡La forma divertida de aprender desarrollo web!
            </h1>
            <p className="text-xl text-gray-600">
              Aprende HTML, CSS y JavaScript de manera interactiva y efectiva. 
              Construye proyectos reales mientras juegas y ganas puntos.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                className='px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform'
              >
                ¡Empieza Ahora!  
              </button>  
            </div>  
          </div>

        </div>

        <Carts />
      </main>  
        <Footer />
    </div>
  );
}
