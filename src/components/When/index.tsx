import { AnswersProps } from "@/types/AnswersProps"
import styles from './styles.module.scss'

interface WhenProps {
    handleChange: (question: keyof AnswersProps, value: string) => void
    nextStep: () => void
    //options: OptionsProps
    answers: AnswersProps
}

export default function When({ handleChange, nextStep, answers }: WhenProps) {

    return (
        <div className={styles.container}>
            <h2>Quando você quer sair?</h2>
            <div className={styles.inputContainer}>
                <div>
                    <input
                        type="date"
                        onChange={(e) => handleChange('data', e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="time"
                        value={answers.horario}
                        onChange={(e) => handleChange('horario', e.target.value)}
                    />
                </div>
            </div>
            <button onClick={nextStep} disabled={!answers.data}>Próximo</button>
        </div>
    )
}