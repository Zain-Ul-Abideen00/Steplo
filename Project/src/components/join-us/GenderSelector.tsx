"use client";

import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";

const genderOptions = [
  { value: "male", label: "Male", icon: "👨" },
  { value: "female", label: "Female", icon: "👩" },
];

export default function GenderSelector() {
  const { control, watch } = useFormContext();
  const selectedGender = watch("gender");

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-5"
            >
              {genderOptions.map((option) => (
                <motion.div
                  key={option.value}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 min-w-[100px]"
                >
                  <div
                    className={`
                      relative flex items-center justify-center p-1 rounded-xl cursor-pointer
                      border-2 transition-all duration-200
                      ${selectedGender === option.value
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="absolute top-3 left-3 h-4 w-4"
                    />
                    <label
                      htmlFor={option.value}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <span className="text-2xl" role="img" aria-label={option.label}>
                        {option.icon}
                      </span>
                      <span className={`text-sm font-medium ${
                        selectedGender === option.value ? 'text-black' : 'text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                    </label>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
