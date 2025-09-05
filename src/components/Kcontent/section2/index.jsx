import { useLayoutEffect, useRef } from 'react';
import { Section2Style } from './style';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 왼쪽 이미지: 위에서 아래로
            gsap.fromTo(
                leftRef.current,
                { y: -100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%', // section2가 80% 지점에서 보일 때 시작
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // 오른쪽 이미지: 아래에서 위로
            gsap.fromTo(
                rightRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section2Style ref={sectionRef}>
            <div className="images">
                <div className="image-wrapper-left" ref={leftRef}>
                    <img src="/images/Kcontent/Kco_2.jpg" alt="left" />
                </div>
                <div className="image-wrapper-right" ref={rightRef}>
                    <img src="/images/Kcontent/Kco_1.jpg" alt="right" />
                </div>
                <div className="image-wrapper-top">
                    <img src="/images/Kcontent/kcontent-logo.png" alt="logo" />
                </div>
                <div className="text">
                    <p>KBO × 케이스티파이 한정판</p>
                    <h2>"팬심을 스타일로 표현하는 법"</h2>
                    <p>
                        응원하는 팀의 상징을 손안에 담을 수 있습니다.
                        <br /> 프로야구 10개 구단의 정체성을 그대로 담은 디자인으로 유니폼과 로고로
                        디자인된 케이스로 팬심을 표현해보세요.
                    </p>
                </div>
            </div>
        </Section2Style>
    );
};

export default Section2;
