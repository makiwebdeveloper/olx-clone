"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import Icons from "./Icons";

interface Props {
  items: string[];
}

export default function Carousel({ items }: Props) {
  const [step, setStep] = useState(0);

  function prevStep(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  function nextStep(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (step < items.length - 1) {
      setStep((prev) => prev + 1);
    }
  }

  return (
    <div>
      <div className="relative">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative">
              <div className="relative w-full lg:w-2/3 mx-auto h-[250px] md:h-[300px] xl:h-[350px] 2xl:h-[400px]">
                {items.map((item, index) => (
                  <Image
                    key={index}
                    src={item}
                    alt="image"
                    fill
                    className={cn(
                      "object-cover rounded-lg transition-opacity duration-500 cursor-pointer",
                      index === step ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
              </div>
              {items.length > 1 && (
                <>
                  <button
                    onClick={prevStep}
                    className="absolute left-5 lg:left-10 top-[50%] lg:text-white translate-y-[-50%] bg-white/80 lg:bg-slate-700 transition hover:bg-white lg:hover:bg-slate-800 p-1 rounded-full"
                  >
                    <Icons.arrowLeft className="lg:w-8 lg:h-8" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="absolute right-5 lg:right-10 top-[50%] lg:text-white translate-y-[-50%] bg-white/80 lg:bg-slate-700 transition hover:bg-white lg:hover:bg-slate-800 p-1 rounded-full"
                  >
                    <Icons.arrowRight className="lg:w-8 lg:h-8" />
                  </button>
                </>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="bg-transparent border-none w-[240px] h-[200px] sm:w-[480px] sm:h-[400px]">
            <Image
              src={items[step]}
              alt="image"
              fill
              className={cn("rounded-lg object-cover")}
            />
          </DialogContent>
        </Dialog>
      </div>
      {items.length > 1 && (
        <div className="flex gap-1 center py-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 border-2 rounded-full border-slate-800 cursor-pointer",
                index === step && "bg-slate-800 cursor-default"
              )}
              onClick={() => setStep(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
