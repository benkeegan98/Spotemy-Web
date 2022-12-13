import { Container, Text } from '.';
import { WHITE, GREEN_LIGHT_20, GREEN_LIGHT_40, GREEN_LIGHT_60 } from '../styles/colors';
import { AiFillFire } from 'react-icons/ai';


type PopularityFlameProps = {
    score: number,
    size?: 'large' | 'small',
}

const PopularityFlame = ({
    score,
    size = 'small'
}: PopularityFlameProps) => {

    const getColor = (score: number) => {
        if (score >= 90) {
            return 'red';
        }

        if (score >= 70) {
            return 'orange';
        }

        if (score >= 45) {
            return 'red';
        }

        if (score >= 30) {
            return GREEN_LIGHT_20;
        }

        if (score >= 20) {
            return GREEN_LIGHT_40;
        }

        if (score >= 10) {
            return GREEN_LIGHT_60;
        }
    }

    const color = getColor(score);
    const iconSize = size === 'large' ? 100 : 60;
    const textSize = size === 'large' ? 38 : 20;
    const textPosition = size === 'large' ? -58 : -33;

    return (
        <Container width={'fit-content'} height={'fit-content'} centerX centerY>
            <AiFillFire color={color} size={iconSize} />
            <Container
                relative={{ top: `${textPosition}px` }}
                margin={{ bottom: textPosition}}
            >
                <Text size={textSize} color={WHITE}>{score}</Text>
            </Container>
        </Container>
    )
}

export default PopularityFlame;