import React, { useEffect, useRef } from 'react';
import mojs from '@mojs/core';
import './CheckButton.css';

const AnimatedCheckButton = ({ text = 'SUBMIT', backgroundColor = '#CBDC41' }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (!buttonRef.current) return; // Checks if the buttonRef is null before proceeding

        const RADIUS = 28;
        const timeline = new mojs.Timeline({ speed: 1.5 });

        const circle = new mojs.Shape({
            parent: buttonRef.current,
            stroke: '#ffffff',
            strokeWidth: { [2 * RADIUS]: 0 },
            fill: 'none',
            scale: { 0: 1, easing: 'quad.out' },
            radius: RADIUS,
            duration: 450,
        });

        const burst = new mojs.Burst({
            parent: buttonRef.current,
            radius: { 6: RADIUS - 7 },
            angle: 45,
            children: {
                shape: 'line',
                radius: RADIUS / 7.3,
                scale: 1,
                stroke: '#ffffff',
                strokeDasharray: '100%',
                strokeDashoffset: { '-100%': '100%' },
                degreeShift: 'stagger(0, -5)',
                duration: 700,
                delay: 200,
                easing: 'quad.out',
            },
        });

        class Check extends mojs.CustomShape {
            getShape() {
                return '<path transform-origin: 50% 50% 0px; stroke-linecap="square" d="M3.699 9.699l4.193 4.193M19.995 3.652L8.677 14.342"/>';
            }
        }
        mojs.addShape('check', Check);

        const check = new mojs.Shape({
            parent: buttonRef.current,
            shape: 'check',
            stroke: '#ffffff',
            scale: { 0: 1 },
            easing: 'elastic.out',
            duration: 1600,
            delay: 300,
        });

        timeline.add(burst, circle, check);

        // Define the handleClick function inside useEffect to have access to timeline
        const handleClick = () => {
            timeline.replay();
        };

        buttonRef.current.addEventListener('click', handleClick);

        // Cleanup function: removes the 'click' event and its handler
        return () => {
            if (buttonRef.current) {
                buttonRef.current.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <div ref={buttonRef} className="animated-check-btn" style={{ backgroundColor }}>
            <span className="btn-text">{text}</span>
            <div className="checkmark"></div>
        </div>
    );
};

export default AnimatedCheckButton;
