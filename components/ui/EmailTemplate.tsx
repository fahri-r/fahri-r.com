import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

type EmailTemplate = {
  name: string;
  message: string;
  email: string;
};

const EmailTemplate = (props: EmailTemplate) => {
  const { name, message, email } = props;

  const previewText = name;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-poppins">
          <Container className="mx-auto my-[40px] w-[465px] rounded-lg border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://res.cloudinary.com/dr1ohfvxn/image/upload/v1703817594/zwuzdvke3qf9aunhqxpp.png"
                width="60"
                height="60"
                alt="Logo Fahri Ramadhan"
                className="my-0 rounded-md"
              />
            </Section>
            <Heading className="m-0 mt-[20px] p-0 text-[24px] font-normal text-black">
              <strong>{name}</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              {message}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Sent by: <span className="text-black">{email}</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { EmailTemplate };
