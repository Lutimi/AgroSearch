import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white celular:text-sm md:text-base h-[120px]">
      <div className="flex justify-between items-center w-full px-12 py-9 border-t-2 border-gray-200 h-[120px]">
        <p className="flex text-center text-gray-400">
          © 2022 PotatoOntology, Inc. All rights reserved.
        </p>
        <div className="flex gap-4">
          <FaInstagram size={20} color="gray" className="cursor-pointer" />
          <FaGithub size={20} color="gray" className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
