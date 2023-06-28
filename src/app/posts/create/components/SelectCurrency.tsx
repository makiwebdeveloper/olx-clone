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

interface Props {
  field: any;
}

export default function SelectCurrency({ field }: Props) {
  return (
    <Select
      {...field}
      onValueChange={(value: "UAH" | "USD" | "EUR") => field.onChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="UAH" />
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
