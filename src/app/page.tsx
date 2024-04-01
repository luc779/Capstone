import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center p-6">
      <Button variant="link" size="icon">
        <Link href="/Dashboard">Dashboard
        </Link>
      </Button>
    </main>
  );
};
