import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import When from "@/components/When";
import WhatToDo from "@/components/WhatToDo";
import WhatToEat from "@/components/WhatToEat";
import Resume from "@/components/Resume";
import { AnswersProps } from "@/types/AnswersProps";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const options = {
  data: ['Hoje', 'Amanhã', 'Próxima semana'],
  oQueFazer: ['Caminhar', 'Ir ao cinema', 'Ler um livro'],
  oQueComer: ['Pizza', 'Sushi', 'Salada'],
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('contato@ericssongomes.com');
  const subject = 'Ela Aceitou!';
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('')
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    data: new Date(),
    horario: '',
    oQueFazer: '',
    oQueComer: ''
  })

  useEffect(() => {
    if (!answers.data && !answers.horario && !answers.oQueComer && !answers.oQueFazer) {
      alert("Esqueceu de alguma coisa")
      return
    }
    if (step === 3) {
      const messageText = `Ela aceitou! Quando: ${answers.data.toLocaleDateString('pt-br', { timeZone: 'UTC' })}, ${answers.horario}. O que ela quer fazer: ${answers.oQueFazer}. O que ela quer comer: ${answers.oQueComer}. Do your jumps!`;
      setMessage(messageText)
    }
  }, [step])
  function handleChange(question: keyof AnswersProps, value: any) {
    const updatedValue = question === 'data' ? new Date(value) : value
    setAnswers((prev) => ({ ...prev, [question]: updatedValue }))
  }
  function nextStep() { setStep(step + 1) }
  function previousStep() { setStep(step - 1) }

  async function confirmAnswers(e: MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    setStatus('Enviando...')

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, subject, text: message })
      })
      if (res.ok) {
        setStatus('Email enviado!')
        console.log('email enviado')
        router.push('/confirmation')
      } else {
        setStatus('Erro ao enviar email')
        console.log("Erro ao enviar email")
      }
    } catch (err) {
      console.log('Erro: ', err)
      setStatus('Erro ao enviar email')
    }
  }

  return (
    <>
      <Head>
        <title>Date with me!</title>
        <meta name="description" content="Bora marcar um date?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div>
            {step === 0 && (
              <When
                handleChange={handleChange}
                nextStep={nextStep}
                //options={options}
                answers={answers}
              />
            )}
            {step === 1 && (
              <WhatToDo
                handleChange={handleChange}
                nextStep={nextStep}
                previousStep={previousStep}
                options={options}
                answers={answers}
              />
            )}

            {step === 2 && (
              <WhatToEat
                handleChange={handleChange}
                nextStep={nextStep}
                previousStep={previousStep}
                options={options}
                answers={answers}
              />
            )}

            {step === 3 && (
              <Resume
                answers={answers}
                previousStep={previousStep}
                confirmAnswers={confirmAnswers}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
