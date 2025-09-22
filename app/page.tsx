import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Link href="/login" passHref>
        <Button asChild>
          <span>مشاهده تسک 1</span>
        </Button>
      </Link>

      <Link href="/dashboard" passHref>
        <Button asChild>
          <span>مشاهده تسک 2</span>
        </Button>
      </Link>
    </div>
  );
}
