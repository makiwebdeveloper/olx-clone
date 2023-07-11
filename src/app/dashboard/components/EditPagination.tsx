"use client";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Props {}

export default function EditPagination({}: Props) {
  const { toast } = useToast();

  const [perPage, setPerPage] = useState("");

  const { mutate: changePerPage } = useMutation(
    async () => {
      await axios.put(`/api/pagination`, {
        perPage: Number(perPage),
      });
    },
    {
      onSuccess: () => {
        setPerPage("");
        toast({
          title: "Success",
          description: "Successfully change per page value",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to change per page value",
          description: "Something went wrong. Please try later",
          variant: "destructive",
        });
      },
    }
  );

  return (
    <section className="bg-white sm:shadow-sm p-6 2xl:p-10 sm:rounded-lg space-y-3">
      <h3 className="text-xl 2xl:text-2xl font-semibold">Edit pagination</h3>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label>Change posts per page value</Label>
          <Input
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
            placeholder="2"
            type="number"
          />
        </div>
        <Button onClick={() => changePerPage()} disabled={!perPage}>
          Change
        </Button>
      </div>
    </section>
  );
}
