"use client";

import Modal from "@/components/ui/modal";
import useStoreModal from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const StoreModal = () => {
  const StoreModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", data);
      console.log(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    console.log(data);
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to mange your products"
      isOpen={StoreModal.isOpen}
      onclose={StoreModal.onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Juan Ecommerce"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-5 mt-4">
            <Button
              disabled={loading}
              className="cursor-pointer">
              Continue
            </Button>
            <Button
              disabled={loading}
              className="cursor-pointer"
              variant={"secondary"}
              onClick={StoreModal.onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
