import {useEffect} from "react";

const PercentageCircle: React.FC<{percent: number}> = ({ percent }) => {

    useEffect(() => {
        if (percent > 100) {
            percent = 100;
        }
        const degrees: string = `${(percent / 100) * 180}deg`;
        const element: HTMLDivElement = document.querySelector('.percentage-circle__wrap');
        element.style.setProperty('--deg', degrees);
    }, [percent]);

    return (
        <div className="percentage-circle__wrap">
            <div className="circle">
                <div className="mask full"><div className="fill" /></div>
                <div className="mask half"><div className="fill" /></div>
                <div className="inside-circle">{percent}</div>
            </div>
        </div>
    );
}

export default PercentageCircle;