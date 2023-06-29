"use client";

import "@uploadthing/react/styles.css";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryGroup } from "@/types/categories";
import { PostValidator, PostValidatorType } from "@/lib/validators/post";

import { Input } from "@/components/ui/Input";
import { textareaVariants } from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import UploadImages from "./UploadImages";
import CategoriesSelect from "@/components/SelectCategory";
import CurrencySelect from "@/components/SelectCurrency";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

interface Props {
  categories: CategoryGroup[];
}

export default function CreatePostForm({ categories }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<PostValidatorType>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      description: "",
      currency: "UAH",
      categoryId: "",
      images: ["/"],
    },
  });

  async function onSubmit(data: PostValidatorType) {
    try {
      await axios.post("/api/posts", {
        ...data,
      });

      router.push("/");
    } catch (e) {
      toast({
        title: "Failed to create post",
        description: "Something went wrong. Please try later",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. IPhone 14 Pro Max" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <TextareaAutosize
                  placeholder="e.g. I will sell a completely new iPhone 14 Pro Max Space Black with 128 gigabytes of memory."
                  className={textareaVariants()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  id="price"
                  placeholder="30 000"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-5">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <CurrencySelect
                      value={field.value}
                      onChange={(value: "UAH" | "USD" | "EUR") =>
                        field.onChange(value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoriesSelect
                    categories={categories}
                    onChange={(value: string) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <UploadImages
                  images={field.value}
                  setImages={(v: string[]) => field.onChange(v)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Create</Button>
      </form>
    </Form>
  );
}
