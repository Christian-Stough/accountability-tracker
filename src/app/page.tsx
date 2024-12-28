import { Button } from "~/components/ui/button";
import { auth, signIn, signOut } from "~/server/auth";
import DiscordIcon from "./_components/discord-icon";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Body from "./_components/body";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    return <SignInScreen />;
  }

  return <Home session={session} />;
}

function SignInScreen() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
      className="flex h-fit min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-2"
    >
      <h1 className="text-5xl font-semibold">Hand of Accountability</h1>
      <Button type="submit" className="relative w-full max-w-[400px]">
        <DiscordIcon className="top-4.5 absolute left-4 size-6 text-white" />
        Sign In With Discord
      </Button>
    </form>
  );
}

function Home({ session }: { session: Session }) {
  async function signOutOfAccount() {
    "use server";
    await signOut();
  }

  return (
    <main className="flex h-fit min-h-screen w-full flex-col items-center gap-8 px-4 py-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-semibold">Hand of Accountability</h1>
        <div className="flex items-center gap-2 text-xl">
          <h2>for</h2>
          <p className="font-semibold">{session.user.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <button
                  className="w-full"
                  onClick={signOutOfAccount}
                  type="submit"
                >
                  Sign Out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Body session={session} />
    </main>
  );
}
