import { AnswersProps } from "@/types/AnswersProps"
import { OptionsProps } from "@/types/OptionsProps"

interface WhatToEatProps {
    handleChange: (question: keyof AnswersProps, value: string) => void
    nextStep: () => void
    previousStep: () => void
    options: OptionsProps
    answers: AnswersProps
}

export default function WhatToEat({ handleChange, nextStep, previousStep, options, answers }: WhatToEatProps) {
    return (
        <div>
            <h2>O que você gostaria de comer?</h2>
            {options.oQueComer.map((option) => (
                <label key={option}>
                    <input
                        type="radio"
                        value={option}
                        checked={answers.oQueComer === option}
                        onChange={() => handleChange('oQueComer', option)}
                    />
                    {option}
                </label>
            ))}
            <button onClick={previousStep}>Voltar</button>
            <button onClick={nextStep} disabled={!answers.oQueComer}>Próximo</button>
        </div>
    )
}