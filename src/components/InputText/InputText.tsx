import { Control, useController } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ComponentProps } from "react";

interface ITextInput extends ComponentProps<'input'> {
  name: string;
  control: Control<any>;
  label?: string;
  mask?: string;
}

export default function TextInput({ name, label, mask, control, ...inputProps }: ITextInput) {

  const { formState: { errors } } = useController({ control, name });

  return (
    <>
      <div className="flex flex-col gap-2">
        {label && <Label>{label}</Label>}
        <Input
          {...control.register(name)}
          {...inputProps} 
        />
        {errors[name] && (
          <span className="text-sm text-red-600">{errors[name].message?.toString()}</span>
        )}
      </div>
    </>
  )
}
