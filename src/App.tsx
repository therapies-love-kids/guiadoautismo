import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { Inicio } from './pages';

// Data de liberação (em UTC)
const releaseDate = new Date(Date.UTC(2024, 9, 18)); // 18/10/2024 UTC
releaseDate.setUTCDate(releaseDate.getUTCDate() + 8); // +15 dias

// Componente de Countdown
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
            title: "Título da Página 1",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
            content: [
                { type: 'paragraph', text: 'Este é o conteúdo da página 1.' },
                { type: 'subtitle', text: 'Subtítulo da Página 1' },
                { type: 'paragraph', text: 'Aqui vai mais algum conteúdo descritivo para a página 1.' }
            ]
        },
        {
            title: "Título da Página 2",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
            content: [
                { type: 'paragraph', text: 'Este é o conteúdo da página 2.' },
                { type: 'subtitle', text: 'Subtítulo da Página 2' },
                { type: 'paragraph', text: 'Aqui vai mais algum conteúdo descritivo para a página 2.' }
            ]
        },
        // Adicione mais páginas conforme necessário
    ];

    // Get the current page data based on the page prop
    const currentPageData = pageData[page - 1]; // Assuming page is 1-indexed

    return (
        <div className='flex flex-col items-center justify-center p-4 h-screen'>
            {isReleased ? (
                <>
                    <h1>{currentPageData.title}</h1>
                    {currentPageData.videoUrl && (
                        <iframe
                            width="560"
                            height="315"
                            src={currentPageData.videoUrl}
                            title={currentPageData.title}
                            allowFullScreen
                        ></iframe>
                    )}
                    {currentPageData.content.map((item, index) => (
                        <div key={index}>
                            {item.type === 'paragraph' && <p>{item.text}</p>}
                            {item.type === 'subtitle' && <h2>{item.text}</h2>}
                        </div>
                    ))}
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
