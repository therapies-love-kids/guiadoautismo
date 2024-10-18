import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { Inicio } from './pages';
import { QRCodeSVG } from 'qrcode.react';

const releaseDate = new Date(Date.UTC(2024, 9, 18));
releaseDate.setUTCDate(releaseDate.getUTCDate() + 0);

const Countdown = ({ releaseTime, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(releaseTime - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime = releaseTime - new Date().getTime();
            setTimeLeft(remainingTime);
            if (remainingTime <= 0) {
                clearInterval(interval);
                onComplete();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [releaseTime, onComplete]);

    if (timeLeft <= 0) return null;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": days } as React.CSSProperties}></span>
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": hours } as React.CSSProperties}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": minutes } as React.CSSProperties}></span>
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": seconds } as React.CSSProperties}></span>
                </span>
                sec
            </div>
        </div>
    );
};

const SubPage = ({ page }) => {
    const [isReleased, setIsReleased] = useState(false);
    const pageData = [
        {
            title: "O Valor Da Comunicação: Um Relato De Um Pai Atípico",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
            content: [
                { type: 'paragraph', text: 'Um relato inspirador sobre a importância da comunicação no contexto do autismo, focando na experiência de um pai.' }
            ]
        },
        {
            title: "Introdução Ao Autismo",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
            content: [
                { type: 'paragraph', text: 'Uma visão geral do autismo, abordando suas características e desafios.' }
            ]
        },
        {
            title: "Identificando O Autismo",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
            content: [
                { type: 'paragraph', text: 'Dicas para reconhecer os sinais do autismo em crianças e a importância da identificação precoce.' }
            ]
        },
        {
            title: "Aprofundando Nos Sinais Iniciais Do Transtorno Do Espectro Autista",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
            content: [
                { type: 'paragraph', text: 'Exploração detalhada dos sinais iniciais do TEA e como pais e educadores podem identificá-los.' }
            ]
        },
        {
            title: "A Relevância Da Avaliação Neuropsicológica No Diagnóstico De Crianças Com Transtorno Do Espectro Autista (Tea)",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
            content: [
                { type: 'paragraph', text: 'Discussão sobre a importância das avaliações neuropsicológicas no diagnóstico e acompanhamento de crianças com TEA.' }
            ]
        },
        {
            title: "Navegando Sobre O Luto Invisível: Pais E O Diagnóstico De Tea",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_6",
            content: [
                { type: 'paragraph', text: 'Reflexão sobre o processo de luto que muitos pais enfrentam após o diagnóstico de autismo de seus filhos.' }
            ]
        },
        {
            title: "Após O Luto Do Diagnóstico",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_7",
            content: [
                { type: 'paragraph', text: 'Estratégias para pais que estão superando o luto e buscando apoio após o diagnóstico de TEA.' }
            ]
        },
        {
            title: "Como Desenvolver A Comunicação Em Crianças Autistas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_8",
            content: [
                { type: 'paragraph', text: 'Métodos e práticas para estimular a comunicação em crianças no espectro autista.' }
            ]
        },
        {
            title: "A Relação Entre Mastigação E O Desenvolvimento Da Fala",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_9",
            content: [
                { type: 'paragraph', text: 'Como a mastigação influencia o desenvolvimento da fala e a comunicação em crianças autistas.' }
            ]
        },
        {
            title: "Como Identificar E Tratar A Disfonia?",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_10",
            content: [
                { type: 'paragraph', text: 'Sinais de disfonia em crianças autistas e as melhores abordagens de tratamento.' }
            ]
        },
        {
            title: "Habilidades Básicas: Os Primeiros Passos Para O Ensino De Habilidades",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_11",
            content: [
                { type: 'paragraph', text: 'Instruções sobre como ensinar habilidades básicas a crianças autistas.' }
            ]
        },
        {
            title: "A Importância Da Habilidade De Imitação, Formas Práticas De Ensino",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_12",
            content: [
                { type: 'paragraph', text: 'Como a imitação pode ser usada como uma ferramenta eficaz no ensino a crianças autistas.' }
            ]
        },
        {
            title: "Crises Vs Birra, Como Diferenciar?",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_13",
            content: [
                { type: 'paragraph', text: 'Dicas para distinguir crises de birras em crianças autistas e como reagir adequadamente.' }
            ]
        },
        {
            title: "O Que Fazer Durante Uma Birra?",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_14",
            content: [
                { type: 'paragraph', text: 'Estratégias eficazes para lidar com birras e ajudar a criança a se acalmar.' }
            ]
        },
        {
            title: "Comportamento Heteroagressivo E Autoagressivo Em Pessoas Autistas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_15",
            content: [
                { type: 'paragraph', text: 'Compreensão dos comportamentos agressivos em crianças autistas e abordagens para gerenciá-los.' }
            ]
        },
        {
            title: "Uma Palavra Sobre Comportamentos Estereotipados",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_16",
            content: [
                { type: 'paragraph', text: 'Análise dos comportamentos estereotipados em crianças autistas e seu significado.' }
            ]
        },
        {
            title: "Qual A Melhor Forma De Estimular As Habilidades De Socialização?",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_17",
            content: [
                { type: 'paragraph', text: 'Dicas práticas para promover habilidades sociais em crianças autistas.' }
            ]
        },
        {
            title: "Como Estimular As Emoções Em Crianças Autistas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_18",
            content: [
                { type: 'paragraph', text: 'Métodos para ajudar crianças autistas a reconhecer e expressar emoções.' }
            ]
        },
        {
            title: "Ensino De Emoções Para Crianças Autistas Por Meio Dos Operantes Verbais",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_19",
            content: [
                { type: 'paragraph', text: 'Estratégias de ensino de emoções usando a abordagem dos operantes verbais.' }
            ]
        },
        {
            title: "Uma Palavra Sobre Tenção E Concentração",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_20",
            content: [
                { type: 'paragraph', text: 'Discussão sobre a importância da concentração e técnicas para melhorar a atenção em crianças autistas.' }
            ]
        },
        {
            title: "Poda Neural – Crianças Com Tea (Transtorno Do Espectro Autista)",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_21",
            content: [
                { type: 'paragraph', text: 'Explicação sobre a poda neural e seu impacto no desenvolvimento de crianças com TEA.' }
            ]
        },
        {
            title: "A Relação Entre Seletividade Alimentar E Comportamento Adaptativo Em Crianças No Espectro Autista",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_22",
            content: [
                { type: 'paragraph', text: 'Como a seletividade alimentar pode afetar o comportamento e a adaptação social em crianças autistas.' }
            ]
        },
        {
            title: "O Lúdico E A Aceitação De Novos Alimentos",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_23",
            content: [
                { type: 'paragraph', text: 'Estratégias lúdicas para ajudar crianças autistas a aceitarem novos alimentos.' }
            ]
        },
        {
            title: "Como O Desfralde Deve Ser Realizado?",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_24",
            content: [
                { type: 'paragraph', text: 'Orientações sobre como realizar o desfralde de crianças autistas de maneira eficaz.' }
            ]
        },
        {
            title: "Psicomotricidade No Transtorno Do Espectro Autista (Tea)",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_25",
            content: [
                { type: 'paragraph', text: 'A importância da psicomotricidade no desenvolvimento de crianças com TEA.' }
            ]
        },
        {
            title: "A Importância Da Fisioterapia No Transtorno Do Espectro Autista (Tea)",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_26",
            content: [
                { type: 'paragraph', text: 'Como a fisioterapia pode beneficiar crianças com TEA em seu desenvolvimento físico e motor.' }
            ]
        },
        {
            title: "Caminhando Com Força: Superando A Marcha Na Ponta Dos Pés E A Hipotonia Em Crianças Com Tea.",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_27",
            content: [
                { type: 'paragraph', text: 'Estratégias para lidar com a marcha na ponta dos pés e hipotonia em crianças autistas.' }
            ]
        },
        {
            title: "Estimulando A Coordenação Motora Fina",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_28",
            content: [
                { type: 'paragraph', text: 'Atividades práticas para ajudar no desenvolvimento da coordenação motora fina em crianças autistas.' }
            ]
        },
        {
            title: "Uma Palavra Sobre Como A Neuropsicopedagogia Ajuda No Desenvolvimento De Crianças Atípicas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_29",
            content: [
                { type: 'paragraph', text: 'Como a neuropsicopedagogia pode contribuir para o desenvolvimento de crianças com dificuldades de aprendizagem.' }
            ]
        },
        {
            title: "A Importância De Estimular As Habilidades Pré-Acadêmicas Em Crianças Tea",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_30",
            content: [
                { type: 'paragraph', text: 'A necessidade de estimular habilidades pré-acadêmicas para a educação de crianças com TEA.' }
            ]
        },
        {
            title: "Uma Palavras Sobre Os Pilares Da Terapia Neuropsicopedagógica",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_31",
            content: [
                { type: 'paragraph', text: 'Principais fundamentos da terapia neuropsicopedagógica aplicada a crianças autistas.' }
            ]
        },
        {
            title: "Possíveis Quadros Associados Ao Autismo: As Dificuldades De Aprendizagem E Os Transtornos Específicos De Aprendizagem",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_32",
            content: [
                { type: 'paragraph', text: 'Discussão sobre dificuldades de aprendizagem comuns em crianças autistas e como abordá-las.' }
            ]
        },
        {
            title: "É Possível Prender A Ler E Escrever Não Sendo Vocal?",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_33",
            content: [
                { type: 'paragraph', text: 'Exploração de como crianças autistas não verbais podem aprender a ler e escrever.' }
            ]
        },
        {
            title: "Uma Palavra Sobre Os Benefícios Da Musicoterapia Para O Desenvolvimento De Crianças Com Tea",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_34",
            content: [
                { type: 'paragraph', text: 'Como a musicoterapia pode ajudar no desenvolvimento social e emocional de crianças com TEA.' }
            ]
        },
        {
            title: "A Prática Da Musicoterapia Para Pacientes Autistas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_35",
            content: [
                { type: 'paragraph', text: 'Abordagem prática da musicoterapia e suas aplicações com crianças autistas.' }
            ]
        },
        {
            title: "Promovendo O Brincar Em Casa: Estratégias Para Pais De Crianças Com Tea",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_36",
            content: [
                { type: 'paragraph', text: 'Sugestões de brincadeiras e atividades que promovem o desenvolvimento de crianças autistas em casa.' }
            ]
        },
        {
            title: "Estratégias Para Gerenciamento Do Estresse Parental",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_37",
            content: [
                { type: 'paragraph', text: 'Dicas para ajudar pais de crianças autistas a gerenciar o estresse e a ansiedade.' }
            ]
        },
        {
            title: "Uma Palavra Sobre Inclusão Escolar",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_38",
            content: [
                { type: 'paragraph', text: 'Reflexão sobre a importância da inclusão escolar para crianças com autismo e seus benefícios.' }
            ]
        },
        {
            title: "A Importância De Defender Os Direitos Das Pessoas Autistas E Suas Garantias Fundamentais Previstas Em Leis Desconhecidas Pelos Pais Atípicos",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_39",
            content: [
                { type: 'paragraph', text: 'Discussão sobre os direitos das pessoas autistas e a importância da conscientização entre os pais.' }
            ]
        },
        {
            title: "Gestão De Pessoas E A Inclusão De Pessoas Com Transtorno Do Espectro Autista (Tea)",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_40",
            content: [
                { type: 'paragraph', text: 'Como a gestão de pessoas pode favorecer a inclusão de indivíduos com TEA em diferentes contextos.' }
            ]
        },
        {
            title: "As Barreiras Comerciais No Tratamento Do Autismo",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_41",
            content: [
                { type: 'paragraph', text: 'Análise das barreiras enfrentadas por famílias ao buscar tratamento para autismo.' }
            ]
        },
        {
            title: "Gestão Financeira De Uma Família Com Filhos Autistas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_42",
            content: [
                { type: 'paragraph', text: 'Estratégias para gerenciar as finanças de uma família com filhos autistas, incluindo custos de tratamento.' }
            ]
        },
        {
            title: "O Autismo E A Tecnologia",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_43",
            content: [
                { type: 'paragraph', text: 'Como a tecnologia pode ser uma aliada no desenvolvimento e aprendizado de crianças autistas.' }
            ]
        },
        {
            title: "O Marketing Voltado Para Crianças Neuroatípicas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_44",
            content: [
                { type: 'paragraph', text: 'Discussão sobre como as estratégias de marketing podem ser adaptadas para crianças neuroatípicas.' }
            ]
        },
        {
            title: "A Importância De Um Esposo De Uma Fonoaudióloga Terapeuta De Autistas",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_45",
            content: [
                { type: 'paragraph', text: 'Reflexão sobre a dinâmica familiar e a importância do apoio do cônjuge na terapia de crianças autistas.' }
            ]
        },
        {
            title: "Reserva 1",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_RESERVA",
            content: [
                { type: 'paragraph', text: 'RESERVA' }
            ]
        },
        {
            title: "Reserva 2",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_RESERVA",
            content: [
                { type: 'paragraph', text: 'RESERVA' }
            ]
        },
        {
            title: "Reserva 3",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_RESERVA",
            content: [
                { type: 'paragraph', text: 'RESERVA' }
            ]
        },
        {
            title: "Reserva 4",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_RESERVA",
            content: [
                { type: 'paragraph', text: 'RESERVA' }
            ]
        },
        {
            title: "Reserva 5",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_RESERVA",
            content: [
                { type: 'paragraph', text: 'RESERVA' }
            ]
        },
    ];
    const currentPageData = pageData[page - 1];
    return (
        <div className='flex flex-col items-center justify-center p-4 h-screen'>
            {isReleased ? (
                <>
                    <h1 className='text-3xl mt-20 mb-5'>{currentPageData.title}</h1>
                    {currentPageData.videoUrl && (
                        <iframe
                            className='mb-5 w-[80%] h-[80%]'
                            src={currentPageData.videoUrl}
                            title={currentPageData.title}
                            allowFullScreen
                        ></iframe>
                    )}
                    <div className='w-full flex flex-col items-center gap-10'>

                        {currentPageData.content.map((item, index) => (
                            <div key={index}>
                                {item.type === 'paragraph' && <p>{item.text}</p>}
                                {item.type === 'subtitle' && <h2>{item.text}</h2>}
                            </div>
                        ))}
                        <QRCodeSVG value={`https://guiadoautismo.vercel.app/${page}`} size={128} />
                    </div>
                </>
            ) : (
                <Countdown releaseTime={releaseDate.getTime()} onComplete={() => setIsReleased(true)} />
            )}
        </div>
    );
};

const subPages = Array.from({ length: 50 }, (_, i) => i + 1);

export default function App() {
    return (
        <div className='w-screen flex overflow-clip'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Layout>
                            <Inicio />
                        </Layout>
                    }/>
                    {subPages.map((page) => (
                        <Route key={page} path={`/${page}`} element={
                            <Layout>
                                <SubPage page={page} />
                            </Layout>
                        }/>
                    ))}
                </Routes>
            </Router>
        </div>
    );
}
