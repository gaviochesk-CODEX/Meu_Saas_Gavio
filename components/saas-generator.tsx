"use client";

import { useState } from "react";

export function SaaSGenerator() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  function handleGenerate() {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setResponse("Digite algo para gerar uma resposta simulada.");
      return;
    }

    setResponse(
      `Resposta simulada: criamos uma sugestao personalizada para "${trimmedValue}".`
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur">
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
          Demo SaaS
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Meu SaaS
        </h1>
        <p className="text-base leading-7 text-slate-600">
          Insira um texto abaixo e simule a geracao de uma resposta para o seu
          produto.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Digite seu texto aqui"
          className="h-12 flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
        <button
          type="button"
          onClick={handleGenerate}
          className="h-12 rounded-2xl bg-brand-600 px-6 text-base font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100"
        >
          Gerar
        </button>
      </div>

      <div className="mt-6 min-h-24 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-500">Resposta</p>
        <p className="mt-2 text-base leading-7 text-slate-700">
          {response || "A resposta simulada aparecera aqui apos clicar em Gerar."}
        </p>
      </div>
    </div>
  );
}

