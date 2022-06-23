import { useState } from "react";

const PlantCard = ({ agente, causal = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(() => {
    if (agente.descripcion.length > 150) {
      setIsOpen(true);
      return agente.descripcion.slice(0, 150);
    }
    return agente.descripcion;
  });
  const [readMore, setReadMore] = useState(false);
  let color = causal ? "text-red-300" : "text-yellow-300";

  return (
    <div className="shadow-lg flex rounded-xl min-h-[270px] max-w-[280px]">
      <div className="flex-1 flex flex-col  rounded-xl justify-between p-[14px] text-justify space-y-4">
        <h1
          className={`text-[22px] truncate text-ellipsis overflow-hidden font-medium ${color} px-[14px]`}
        >
          {agente.nombre}
        </h1>

        <p className="text-[16px] p-[16px]">
          {text}
          {isOpen && !readMore && "..."}
        </p>
        <p
          className="cursor-pointer text-blue-300 text-[14px] p-[16px]"
          onClick={() => {
            if (!readMore) {
              setText(agente.descripcion);
              setReadMore(true);
            } else {
              setText(agente.descripcion.slice(0, 150));
              setReadMore(false);
            }
          }}
        >
          {isOpen && (readMore ? "Mostrar menos" : "Seguir leyendo")}
        </p>
      </div>
    </div>
  );
};

export default PlantCard;
