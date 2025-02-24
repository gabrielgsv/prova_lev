import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React from "react";

interface Proposta {
    id: number;
    nome: string;
    login: string;
    status: "Criado" | "Andamento" | "Finalizada";
    cpf: string;
    data: string;
    valor: number;
}

export default function App() {
    const [propostas, setPropostas] = useState<Proposta[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data: any[] = XLSX.utils.sheet_to_json(sheet);

            const formattedData = data.map((row, index) => ({
                id: index + 1,
                nome: row["Nome"] || "",
                login: row["Login"] || "",
                status: row["Status"] || "Criado",
                cpf: row["CPF"] || "",
                data: row["Data"] || new Date().toISOString(),
                valor: parseFloat(row["Valor"] || "0"),
            }));

            setPropostas(formattedData);
        };
    };

    const handleDownloadJson = () => {
        const blob = new Blob([JSON.stringify({ propostas }, null, 2)], {
            type: "application/json",
        });
        saveAs(blob, "db.json");
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold mb-4">Upload de Planilha</h1>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} className="mb-4" />

            {propostas.length > 0 && (
                <>
                    <table className="border-collapse border border-gray-400 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 p-2">ID</th>
                                <th className="border border-gray-400 p-2">Nome</th>
                                <th className="border border-gray-400 p-2">Login</th>
                                <th className="border border-gray-400 p-2">Status</th>
                                <th className="border border-gray-400 p-2">CPF</th>
                                <th className="border border-gray-400 p-2">Data</th>
                                <th className="border border-gray-400 p-2">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propostas.map((p) => (
                                <tr key={p.id}>
                                    <td className="border border-gray-400 p-2">{p.id}</td>
                                    <td className="border border-gray-400 p-2">{p.nome}</td>
                                    <td className="border border-gray-400 p-2">{p.login}</td>
                                    <td className="border border-gray-400 p-2">{p.status}</td>
                                    <td className="border border-gray-400 p-2">{p.cpf}</td>
                                    <td className="border border-gray-400 p-2">{p.data}</td>
                                    <td className="border border-gray-400 p-2">{p.valor.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                        onClick={handleDownloadJson}
                    >
                        Baixar JSON
                    </button>
                </>
            )}
        </div>
    );
}
