import { useState } from "react";

const PlantCard = ({ agente, causal = false }) => {
  const [text, setText] = useState(agente.descripcion.slice(0, 150));
  const [readMore, setReadMore] = useState(false);
  let color = causal ? "text-red-300" : "text-yellow-300";

  return (
    <div className="shadow-lg rounded p-[15px] min-h-[270px] max-w-[280px]">
      <div className="flex flex-col">
        <h1
          className={`text-3xl truncate text-ellipsis overflow-hidden font-medium ${color}`}
        >
          {agente.nombre}
        </h1>
        <div className="p-[20px]">
          <p>
            {text}
            {!readMore && "..."}
          </p>
          <p
            className="cursor-pointer text-blue-300"
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
            {readMore ? "Mostrar menos" : "Seguir leyendo"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
