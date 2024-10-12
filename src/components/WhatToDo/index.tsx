import { AnswersProps } from "@/types/AnswersProps"
import { OptionsProps } from "@/types/OptionsProps"

interface WhatToDoProps {
    handleChange: (question: keyof AnswersProps, value: string) => void
    nextStep: () => void
    previousStep: () => void
    options: OptionsProps
    answers: AnswersProps
}

export default function WhatToDo({ handleChange, nextStep, previousStep, options, answers }: WhatToDoProps) {

    return (
        <div>
            <h2>O que você gostaria de fazer?</h2>
            {options.oQueFazer.map((option) => (
                <label key={option}>
                    <input
                        type="radio"
                        value={option}
                        checked={answers.oQueFazer === option}
                        onChange={() => handleChange('oQueFazer', option)}
                    />
                    {option}
                </label>
            ))}
            <button onClick={previousStep}>Voltar</button>
            <button onClick={nextStep} disabled={!answers.oQueFazer}>Próximo</button>
        </div>
    )
}