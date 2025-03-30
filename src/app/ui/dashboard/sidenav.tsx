import { motion } from "framer-motion";
// import { currentUser } from "@clerk/nextjs/server";
import NavLinks from './nav-links'; 
import Progres from "./progres";

export default function Sidenav() {
  // const user = currentUser();

  return (
    <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Módulos</h2>
              <nav className="space-y-2">
                <NavLinks />
              </nav>
              <Progres />
            </div>
          </motion.div>
  );
}