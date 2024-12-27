import { Button } from "~/components/ui/button";
import { auth, signIn, signOut } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    return <SignInScreen />;
  }

  return <Home />;
}

function SignInScreen() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
      className="flex h-fit min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-2"
    >
      <h1 className="text-4xl font-semibold">Accountability Tracker</h1>
      <Button type="submit" className="w-full max-w-[400px]">
        Sign In
      </Button>
    </form>
  );
}

function Home() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="flex h-fit min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-2"
    >
      <h1 className="text-4xl font-semibold">Accountability Tracker</h1>
      <Button type="submit" className="w-full max-w-[400px]">
        Sign Out
      </Button>
    </form>
  );
}
