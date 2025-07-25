"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import useStoreModal from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronsUpDown,
  PlusSquareIcon,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelected = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <div>
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            role={"combobox"}
            aria-expanded={open}
            aria-label={"Select a store"}
            className={cn("w-[200px] justify-center", className)}>
            <StoreIcon className="mr-2 w-6 h-6" />
            {currentStore?.label}
            <ChevronsUpDown className="ml-auto h-5 w-6 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Store..."></CommandInput>
              <CommandEmpty>No Store Found.</CommandEmpty>
              <CommandGroup heading="Stores">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    value={store.label}
                    onSelect={() => onStoreSelected(store)}
                    className="text-sm">
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto w-4 h-4",
                        currentStore === store ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Separator />
          <Button
            className="w-full flex justify-start"
            variant={"ghost"}
            onClick={() => {
              setOpen(false);
              storeModal.onOpen();
            }}>
            <PlusSquareIcon className="mr-2 h-4 w-4" />
            {"Create Store"}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StoreSwitcher;
