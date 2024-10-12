import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
    label?: string;
    name: string;
    type: string; 
    defaultValue?: string;
    placeholder?: string;
}

function FormInput(props: FormInputProps) {
    const { label, name, type, defaultValue, placeholder } = props;
  return (
    <div className="mb-2">
        <Label htmlFor={name}>{label || name}</Label>
        <Input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder}></Input>
    </div>
  );
}

export default FormInput
