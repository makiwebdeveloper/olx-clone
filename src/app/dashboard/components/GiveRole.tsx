"use client";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Props {}

export default function GiveRole({}: Props) {
  const { toast } = useToast();

  const [username, setUsername] = useState("");

  const { mutate: giveRole } = useMutation(
    async () => {
      await axios.put(`/api/roles`, {
        username,
      });
    },
    {
      onSuccess: () => {
        setUsername("");
        toast({
          title: "Success",
          description: "Successfully gived role",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to give role",
          description: "Something went wrong. Please try later",
          variant: "destructive",
        });
      },
    }
  );

  return (
    <section className="bg-white sm:shadow-sm p-6 2xl:p-10 sm:rounded-lg space-y-3">
      <h3 className="text-xl 2xl:text-2xl font-semibold">Give role</h3>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label>
            Enter the username of the user you want to give the ADMIN role to
          </Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johnwick"
          />
        </div>
        <Button disabled={!username} onClick={() => giveRole()}>
          Give
        </Button>
      </div>
    </section>
  );
}
