import { AnswersProps } from "@/types/AnswersProps"
import { MouseEvent } from "react"


interface ResumeProps {
    answers: AnswersProps
    previousStep: () => void
    confirmAnswers: (e: MouseEvent<HTMLButtonElement>) => Promise<void>
}


export default function Resume({ answers, previousStep, confirmAnswers }: ResumeProps) {
    const data = formatarData(answers.data)
    const weekDay = traduzirDiaDaSemana(answers.data)

    function formatarData(data: Date): string {
        const dia = data.toLocaleDateString('pt-br', { timeZone: 'UTC' }).padStart(2, '0');
        return `${dia}`;
    };
    function traduzirDiaDaSemana(data: Date): string {
        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return diasDaSemana[data.getDay()];
    };

    return (
        <div>
            <h2>Resumo das suas escolhas</h2>
            <ul>
                <li><strong>Data:</strong> {weekDay}, {data}</li>
                <li><strong>Horário:</strong> {answers.horario}</li>
                <li><strong>O que fazer:</strong> {answers.oQueFazer}</li>
                <li><strong>O que comer:</strong> {answers.oQueComer}</li>
            </ul>
            <button onClick={previousStep}>Voltar</button>
            <button onClick={confirmAnswers}>Confirmar</button>
        </div>
    )
}