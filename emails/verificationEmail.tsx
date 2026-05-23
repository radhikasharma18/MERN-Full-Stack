import {Html,Head, Font, Preview,Heading,Row,Section,Text, Button} from "@react-email/components";

interface VerificationEmailProps {
    username:string;
    otp:string;
}

export default function VerificationEmail({username,otp}
    :VerificationEmailProps) {
    return (
        <Html>
            <Head>  
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily={["Arial", "sans-serif"]}
                />
            </Head>
            <Preview>Verify your email address</Preview>
            <Section style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
                <Row>
                    <Heading style={{ fontSize: "24px", color: "#333" }}>
                        Hello {username},
                    </Heading>
                </Row>
                <Row>
                    <Text style={{ fontSize: "16px", color: "#555" }}>
                        Please use the following OTP to verify your email address:
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "20px", color: "#000", fontWeight: "bold" }}>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "14px", color: "#777" }}>
                        If you did not request this verification, please ignore this email.
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}