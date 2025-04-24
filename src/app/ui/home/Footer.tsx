import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-7">
      <div className="container mx-auto px-4 text-center">
        
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-6">
          <Link href="/" className="hover:text-white transition">
            Inicio
          </Link>
          <Link href="/about" className="hover:text-white transition">
            Nosotros
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contacto
          </Link>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 hover:text-blue-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 hover:text-pink-400 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6 hover:text-blue-600 transition" />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} EdoCode. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}