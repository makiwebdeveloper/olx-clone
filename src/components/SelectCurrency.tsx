"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { CurrencyEnum } from "@/types/posts";
import { currencies } from "@/utils";
import { Currency } from "@prisma/client";

interface Props {
  value: CurrencyEnum | "";
  onChange: (value: Currency) => void;
}

export default function SelectCurrency({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(value: Currency) => onChange(value)}>
      <SelectTrigger className=" hover:bg-white">
        <SelectValue>
          {value.length > 0 ? (
            value
          ) : (
            <p className="text-gray-400 2xl:text-xl">Select currency</p>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currencies.map((currency) => (
            <SelectItem value={currency} key={currency}>
              {currency}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
