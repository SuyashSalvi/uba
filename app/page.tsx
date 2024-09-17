import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative h-screen bg-gradient-to-r from-[var(--background-start)] to-[var(--background-end)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="UBA Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h1 className="mt-4 text-6xl font-bold text-[var(--primary-foreground)]">
              User Behavioural Analysis
            </h1>
            <p className="mt-4 text-2xl text-[var(--muted-foreground)]">
              Get insights into your users behaviour and optimize your app or website for better user experience.
            </p>
            <button className="mt-12 px-8 py-4 text-2xl font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] rounded-full hover:bg-[var(--secondary)]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
