import Toast from "@/components/ui/Toast";
import Divider from "@/components/utils/Divider";
import Title from "@/components/utils/Title";
import Typography from "@/components/utils/Typography";
import { useHooks } from "@/context/Provider";
import toast from "react-hot-toast";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/utils/Button";
import Lottie from "lottie-react";
import { useRef } from "react";
import emailIcon from "@/public/icons/email.json";
import profile from "@/data/profile";
import { AnimateEnter } from "@/components/utils/AnimateEnter";

const ContactPage = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    submitting,
    setSubmitting,
  } = useHooks();

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        message,
      }),
    })
      .then(() => {
        toast.success("Success");

        setName("");
        setEmail("");
        setMessage("");
        setSubmitting(false);
      })
      .catch(() => {
        toast.error("Failed");
      });
  }

  const emailRef = useRef<any>();
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section className="space-y-6">
        <Title variant="title">Contact</Title>
        <Typography className="leading-relaxed">
          Feel free to get in touch and let's have a discussion about how we can
          work together.
        </Typography>
        <div>
          <Title variant="title" size="xl">
            Find me on social media
          </Title>
          <div className="mb-6 mt-4 flex flex-wrap gap-3">
            {profile.socials.map(({ href, icon, name }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer">
                <Button variant="dark" size="social">
                  {icon}
                  <span>{name}</span>
                </Button>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Divider />
      <section className="space-y-4">
        <Title variant="title" size="xl">
          Or send me a message
        </Title>

        <div className="w-full">
          <Form.Root onSubmit={sendEmail}>
            <div className="mx-auto gap-4 grid grid-cols-2">
              <Form.Field name="text">
                <div className="flex items-center justify-between">
                  <Form.Label className="py-2 text-sm font-medium text-neutral-400">
                    Name
                  </Form.Label>
                  <Form.Message
                    className="text-xs font-medium text-red-500/70"
                    match="valueMissing"
                  >
                    Name required
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="w-7xl bg-tertiary w-full appearance-none rounded-lg border border-neutral-700 bg-input p-2 text-sm text-neutral-400 outline-none duration-300 placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-700"
                    type="text"
                    autoComplete="off"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name="question">
                <div className="flex items-center justify-between">
                  <Form.Label className="py-2 text-sm font-medium text-neutral-400">
                    Email
                  </Form.Label>
                  <Form.Message
                    className="text-xs font-medium text-red-500/70"
                    match="valueMissing"
                  >
                    Email required
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="w-7xl bg-tertiary w-full appearance-none rounded-lg border border-neutral-700 bg-input p-2 text-sm text-neutral-400 outline-none duration-300 placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-700"
                    type="email"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name="question" className="col-span-2">
                <div className="flex items-center justify-between">
                  <Form.Label className="py-2 text-sm font-medium text-neutral-400">
                    Message
                  </Form.Label>
                  <Form.Message
                    className="text-xs font-medium text-red-500/70"
                    match="valueMissing"
                  >
                    Message required
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <textarea
                    className="w-7xl bg-tertiary h-36 w-full resize-none appearance-none rounded-lg border border-neutral-700 bg-input p-2 text-sm leading-relaxed text-neutral-400 outline-none duration-300 placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-700"
                    autoComplete="off"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Fahri!"
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="disabled:bg-primary/70 col-span-2"
                >
                  {submitting ? (
                    <Lottie
                      lottieRef={emailRef}
                      animationData={emailIcon}
                      style={{ width: 20, height: 20 }}
                      autoplay={true}
                      loop={true}
                    />
                  ) : (
                    <span>Send Message</span>
                  )}
                </Button>
              </Form.Submit>
            </div>
          </Form.Root>
        </div>
        <Toast />
      </section>
    </AnimateEnter>
  );
};

export default ContactPage;
