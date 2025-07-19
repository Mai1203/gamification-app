"use client";

import { useEffect, useState } from "react";
import { getActivities } from "@/app/services/activitiesService";

type Activity = {
  id: string;
  description: string;
  content: {
    htmlCode: string;
    answers: string[];
    inputs: string[];
    type: string;
  };
};

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);

  useEffect(() => {
    getActivities().then((acts) => {
      setActivities(acts);
      if (acts.length > 0) {
        setInputs(new Array(acts[0].content.inputs.length).fill("")); // inicializar inputs vacíos
      }
    });
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Actividad: {activities[0]?.description}</h1>

      <div className="bg-gray-100 p-4 rounded-md font-mono whitespace-pre-wrap">
        {
          activities[0]?.content?.htmlCode
            ?.split("_____")
            .map((segment, idx) => (
              <span key={idx}>
                {segment}
                {idx < inputs.length && (
                  <input
                    type="text"
                    className="border px-1 mx-1 w-24"
                    value={inputs[idx]}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                )}
              </span>
            ))
        }
      </div>

      <div className="mt-4 space-x-2">
        <button
          onClick={() => console.log("Respuestas:", inputs)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Verificar
        </button>
        <button
          onClick={() => setInputs(new Array(inputs.length).fill(""))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Omitir
        </button>
      </div>
    </div>
  );
}
