import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortrAI — AI-фотобудка в Эстонии",
  description:
    "Награждённая AI-фотобудка для свадеб, корпоративов и брендовых мероприятий в Эстонии.",
};

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ru" className="flex min-h-[100dvh] flex-col">
      {children}
    </div>
  );
}
