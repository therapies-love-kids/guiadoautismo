import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Layout({ children }: any) {
    const scrollbarRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'CustomLight');

    useEffect(() => {
        let scrollbarInstance: Scrollbar | null = null;
        const handleResize = () => {
            if (window.innerWidth >= 1500 && scrollbarRef.current) {
                if (!scrollbarInstance) {
                    scrollbarInstance = Scrollbar.init(scrollbarRef.current, {
                        plugins: {
                            overscroll: {
                                effect: "bounce",
                            },
                        },
                    });

                    scrollbarInstance.addListener((status) => {
                        setScrollY(status.offset.y);
                    });
                }
            } else if (scrollbarInstance) {
                scrollbarInstance.destroy();
                scrollbarInstance = null;
            }
        };

        handleResize(); // Initial setup
        window.addEventListener('resize', handleResize);

        return () => {
            if (scrollbarInstance) {
                scrollbarInstance.destroy();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === 'CustomLight' ? 'CustomDark' : 'CustomLight'));
    };

    return (
        <div>
            <div className='w-full fixed z-20'>
                <div className='p-5'>
                    <div className={`navbar ${scrollY === 0 ? 'bg-transparent border border-transparent' : 'bg-base-300/30 border border-base-300 '} rounded-xl`}>
                        <div className="flex-1">
                            <div className="drawer">
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content flex items-center">
                                    <label htmlFor="my-drawer" className="btn btn-square drawer-button text-xl">
                                        <IoMenu />
                                    </label>
                                    <Link to={"/"} className='btn btn-ghost text-xl'>
                                        <img src="/icon.svg" alt="" className='h-2/3' />
                                        <h1 className='text-xl font-normal hidden md:block'>GUIA DO AUTISMO</h1>
                                    </Link>
                                </div>

                                <div className="drawer-side w-full h-full top-0 left-0">
                                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay z-10"></label>
                                    <ul className="menu bg-base-100 text-base-content md:w-96 h-full p-5 z-10 justify-between">
                                        <div className=''>
                                            <li>
                                                <Link to={"/"} className='text-xl my-5 gap-5 items-center'>
                                                    <img src="/icon.svg" alt="" className='h-10' />
                                                    <h1 className='text-xl'>GUIA DO AUTISMO</h1>
                                                </Link>
                                            </li>
                                            <li><Link to={"/"}>Início</Link></li>
                                        </div>
                                        <div>
                                            <div className="divider"></div>
                                            <label className="swap swap-rotate btn btn-square">
                                                <input 
                                                    type="checkbox" 
                                                    className="theme-controller"
                                                    onChange={handleThemeToggle} 
                                                    checked={theme === 'CustomLight'}
                                                />
                                                <IoSunny className='swap-on h-8 w-8 fill-current' />
                                                <IoMoon className='swap-off h-8 w-8 fill-current' />
                                            </label>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex-none navbar-end hidden md:flex">
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-screen min-h-screen md:h-screen bg-base-100' ref={scrollbarRef}>
                <div>
                    {children}
                    <div className='bg-base-200 flex justify-between px-8 w-full textarea-xs'>
                        <h6>© 2024 Therapies Love Kids. Todos os direitos reservados.</h6>
                        <h6>Desenvolvido por <a href="https://wa.me/+556284483697" target="_blank" rel="noopener noreferrer" className="underline transition-all hover:text-secondary">Pedro Laurenti</a></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
