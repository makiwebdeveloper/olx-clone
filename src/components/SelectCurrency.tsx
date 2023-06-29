"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { currencies } from "@/utils";
import { Currency } from "@prisma/client";

interface Props {
  value: Currency;
  onChange: (value: Currency) => void;
}

export default function SelectCurrency({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(value: Currency) => onChange(value)}>
      <SelectTrigger className="bg-white">
        <SelectValue>{value || "UAH"}</SelectValue>
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
