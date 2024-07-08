import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState(props.defaultValue || [10]);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
      value={value}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="group block h-5 w-5 rounded-full border-2 border-white y bg-primary  transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
        <span className="hidden absolute top-8 -left-2 bg-primary text-sm text-white p-1 px-3 rounded-sm before:absolute before:-top-4 before:left-2  before:border-[10px] before:border-transparent before:border-b-primary group-hover:block ">
          ${value[0]}.00
        </span>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
