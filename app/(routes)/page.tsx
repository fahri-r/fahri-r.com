import Title from "@/app/_components/utils/Title";
import profile from "@/app/_data/profile";

export default function Home() {
  return (
    <section className="min-h-screen">
      <Title variant="title">{profile.fullName}</Title>
    </section>
  );
}
