import { Category } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { priceRanges, genderFilters, categories as defaultCategories } from "./constants";

interface FilterSectionsProps {
  categories?: Category[];
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedGenders: string[];
  handleCategoryChange: (category: string) => void;
  handlePriceRangeChange: (priceRange: string) => void;
  handleGenderChange: (gender: string) => void;
}

export function FilterSections({
  categories = defaultCategories,
  selectedCategories,
  selectedPriceRanges,
  selectedGenders,
  handleCategoryChange,
  handlePriceRangeChange,
  handleGenderChange,
}: FilterSectionsProps) {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="categories">
        {/* Categories Section */}
        <AccordionItem value="categories" className="border-b">
          <AccordionTrigger className="text-sm font-medium pe-4">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={() => handleCategoryChange(category.value)}
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Gender Section */}
        <AccordionItem value="gender" className="border-b">
          <AccordionTrigger className="text-sm font-medium pe-4">
            Gender
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              {genderFilters.map((filter) => (
                <div key={filter.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter.id}
                    checked={selectedGenders.includes(filter.id)}
                    onCheckedChange={() => handleGenderChange(filter.id)}
                  />
                  <label
                    htmlFor={filter.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Section */}
        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="text-sm font-medium pe-4">
            Shop By Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={range.id}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => handlePriceRangeChange(range.id)}
                  />
                  <label
                    htmlFor={range.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 