"use client";

import { useState } from "react";

export function SaaSGenerator() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError("Digite algo para gerar uma resposta.");
      setResponse("");
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const apiResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: trimmedValue })
      });

      const data = (await apiResponse.json()) as {
        error?: string;
        text?: string;
      };

      if (!apiResponse.ok) {
        setError(data.error ?? "Nao foi possivel gerar a resposta.");
        return;
      }

      setResponse(data.text ?? "");
    } catch {
      setError("Erro de conexao ao chamar o backend.");
    } finally {
      setIsLoading(false);
    }
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
          Insira um texto abaixo e gere uma resposta usando a API da OpenAI com
          seguranca no backend.
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
          disabled={isLoading}
          className="h-12 rounded-2xl bg-brand-600 px-6 text-base font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-brand-500"
        >
          {isLoading ? "Gerando..." : "Gerar"}
        </button>
      </div>

      <div className="mt-6 min-h-24 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-500">Resposta</p>
        {error ? (
          <p className="mt-2 text-base leading-7 text-red-600">{error}</p>
        ) : (
          <p className="mt-2 text-base leading-7 text-slate-700">
            {response || "A resposta gerada aparecera aqui apos clicar em Gerar."}
          </p>
        )}
      </div>
    </div>
  );
}
