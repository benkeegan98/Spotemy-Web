import Container from "./Container";
import Text from "./Text";

const LogoHeader = () => (
    <Container
        centerX
        width={100}
        padding={{
            bottom: 20
        }}
    >
        <Text size={52}>Spotemy</Text>
    </Container>
)

export default LogoHeader;