"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import {
  ProfileValidator,
  ProfileValidatorType,
} from "@/lib/validators/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import { useToast } from "@/hooks/useToast";
import axios from "axios";
import { useRouter } from "next/navigation";
import UploadProfileImage from "./UploadProfileImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditProfileForm() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProfileValidatorType>({
    resolver: zodResolver(ProfileValidator),
  });

  const { mutate: saveChanges, isLoading } = useMutation(
    async (data: ProfileValidatorType) => {
      await axios.put("/api/users", {
        ...data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentUser"]);
        router.push("/");
      },
      onError: () => {
        toast({
          title: "Failed to edit profile",
          description: "Something went wrong. Please try later",
        });
      },
    }
  );

  async function onSubmit(data: ProfileValidatorType) {
    saveChanges(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email{" "}
                <span className="text-xs text-slate-400">
                  (Confirm your email for change profile data)
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g. johnwick@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-xs text-slate-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. John Wick"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.length === 0 ? undefined : e.target.value
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username{" "}
                <span className="text-xs text-slate-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. johnwick123"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.length === 0 ? undefined : e.target.value
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone <span className="text-xs text-slate-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 123 456 7890"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.length === 0 ? undefined : e.target.value
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                Image <span className="text-xs text-slate-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <UploadProfileImage
                  image={field.value}
                  setImage={(v: string | undefined) => field.onChange(v)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Save</Button>
      </form>
    </Form>
  );
}
