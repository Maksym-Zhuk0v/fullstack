import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserRound } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { signOut, useSession } from "next-auth/react";

interface Props {
  setType: React.Dispatch<
    React.SetStateAction<"login" | "register" | "verification">
  >;
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  status: "authenticated" | "loading" | "unauthenticated";
}

const HeaderNavigation = ({ setType, setOpenAuthModal, status }: Props) => {
  const { data: session } = useSession();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <Link href={"/profile"} className="flex items-center gap-2 w-full">
            <MenubarItem className="w-full">
              <UserRound className="w-4 h-4" />
              Profile
            </MenubarItem>
          </Link>
          <MenubarRadioGroup value="benoit">
            <MenubarSeparator />
          </MenubarRadioGroup>
          <MenubarSub>
            <MenubarSubTrigger>Add profile</MenubarSubTrigger>
            <MenubarSubContent>
              {!session ? (
                <>
                  <MenubarItem className="p-0">
                    <Button
                      onClick={() => {
                        setType("login");
                        setOpenAuthModal(true);
                      }}
                      className={cn("group relative w-full h-8", {
                        "w-[105px]": status === "loading",
                      })}
                      variant={"ghost"}
                    >
                      Log in
                    </Button>
                  </MenubarItem>
                  <MenubarItem className="p-0">
                    <Button
                      loading={status === "loading"}
                      className={cn("group relative w-full text-start h-8", {
                        "w-[105px]": status === "loading",
                      })}
                      onClick={() => {
                        setType("register");
                        setOpenAuthModal(true);
                      }}
                      variant={"ghost"}
                    >
                      Sign up
                    </Button>
                  </MenubarItem>
                </>
              ) : (
                <MenubarItem className="p-0">
                  <Button
                    loading={status === "loading"}
                    className={cn("group relative w-full text-start h-8", {
                      "w-[105px]": status === "loading",
                    })}
                    onClick={() => signOut()}
                    variant={"ghost"}
                  >
                    Log out
                  </Button>
                </MenubarItem>
              )}
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default HeaderNavigation;
