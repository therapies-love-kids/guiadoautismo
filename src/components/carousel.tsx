import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [transitioning, setTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [moveX, setMoveX] = useState(0);

    const slides = [
        { id: "slide1", content: (
            <div className="w-full h-[100vh]">
                <img draggable="false" src="/carrossel1.jpg" alt="" className="w-full h-full object-cover" />
            </div>
        )},
        { id: "slide2", content: (
            <div className="w-full h-[100vh]">
                <img draggable="false" src="/carrossel2.jpg" alt="" className="w-full h-full object-cover" />
            </div>
        )},
        { id: "slide3", content: (
            <div className="w-full h-[100vh]">
                <img draggable="false" src="/carrossel3.jpg" alt="" className="w-full h-full object-cover" />
            </div>
        )}
    ];
    const totalSlides = slides.length;
    const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]];

    const nextSlide = () => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
    };

    useEffect(() => {
        if (transitioning) {
            setTimeout(() => {
                setTransitioning(false);
                if (currentSlide === 0) {
                    setCurrentSlide(totalSlides);
                } else if (currentSlide === totalSlides + 1) {
                    setCurrentSlide(1);
                }
            }, 500);
        }
    }, [currentSlide, transitioning, totalSlides]);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(e.clientX || e.touches[0].clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX || e.touches[0].clientX;
        setMoveX(currentX - startX);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        if (moveX > 50) {
            prevSlide();
        } else if (moveX < -50) {
            nextSlide();
        }
        setMoveX(0);
    };

    return (
        <div
            className="relative cursor-pointer select-none w-full mx-auto flex justify-center items-center max-w-screen overflow-hidden"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            
        >
            <div className="relative flex flex-col items-center justify-center">
                <div
                    draggable="false"
                    className="flex w-[100%] sm:aw-[80%] md:w-[90%] transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: transitioning ? 'transform 0.5s ease' : 'none',
                    }}
                >
                    {extendedSlides.map((slide, index) => (
                        <div
                            draggable="false"
                            key={index}
                            className={`min-w-[100%] flex justify-center items-center ${
                                index === currentSlide ? 'scale-100 opacity-100' : 'blur-sm scale-75 opacity-50'
                            } transition-transform duration-500 ease-in-out transform`}
                        >
                            {slide.content}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <button onClick={prevSlide} className="btn btn-circle">
                    <FaChevronLeft />
                </button>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button onClick={nextSlide} className="btn btn-circle">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};