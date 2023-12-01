import Title from "@/components/utils/Title";
import profile from "@/data/profile";

export default function Home() {
  return (
    <section className="min-h-screen">
      <Title variant="title">{profile.fullName}</Title>
    </section>
  );
}
