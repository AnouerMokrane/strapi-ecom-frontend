import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useGetCategories, useGetColors, useGetSizes } from "@/lib/api/api";
import { ICategory, IColor, ISize } from "@/types";
import { useStore } from "@/lib/stores/store";
import { Skeleton } from "../ui/skeleton";
import { MdClose } from "react-icons/md";

type FilterSidebarProps = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterSidebar = ({ openSidebar, setOpenSidebar }: FilterSidebarProps) => {
  const { data: categories, isPending: isCategoriesLoading } =
    useGetCategories();
  const { data: colors, isPending: isColorsLoading } = useGetColors();
  const { data: sizes, isPending: isSizesLoading } = useGetSizes();
  const [sliderValue, setSliderValue] = useState<number>(10);

  const skeletonCount = 4;
  const {
    addCategory,
    addColors,
    selectedColors,
    addSizes,
    selectedSizes,
    setPriceRange,
  } = useStore();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = e.target.dataset.id;
    const isChecked = e.target.checked;
    addCategory(categoryId as string, isChecked);
  };

  return (
    <div
      className={`fixed top-0 flex-grow-0 w-[248px] h-screen bg-white px-4 pt-8 mb-6 border rounded-sm z-[100] overflow-y-auto duration-300 lg:block md:sticky md:top-10 md:h-fit ${
        openSidebar ? "left-0" : "-left-full"
      }`}
    >
      <h3 className="  text-sm font-medium mb-6">Categories</h3>
      <div className=" divide-y-[1px] mb-8">
        {isCategoriesLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <Skeleton key={index} className="h-6 mt-3" />
            ))
          : categories?.data.map((category: ICategory) => (
              <div
                key={category.id}
                className="flex items-center space-x-3 py-3"
              >
                <input
                  type="checkbox"
                  id={`${category.attributes.title}`}
                  data-id={category.id}
                  className=" w-5 h-5 border-2 border-neutral-white-200 data-[state=checked]:border-none"
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={`${category.attributes.title}`}
                  className="text-sm text-neutral-black-500 capitalize select-none"
                >
                  {category.attributes.title}
                </label>
              </div>
            ))}
      </div>
      <div>
        <h3 className="text-sm font-medium">Color</h3>
        <div className="flex flex-wrap gap-3 mt-4">
          {isColorsLoading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <Skeleton key={index} className="w-9 h-9 rounded-full" />
              ))
            : colors?.data.map((color: IColor) => (
                <button
                  key={color.id}
                  onClick={() => addColors(color.id)}
                  className={`w-7 h-7 rounded-full border-[3px] border-white  ${
                    selectedColors.includes(color.id)
                      ? "ring-1 ring-neutral-black-900"
                      : ""
                  }`}
                  style={{
                    backgroundColor: color.attributes.name,
                  }}
                ></button>
              ))}
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium mb-4">Size</h3>
        <div className=" flex flex-wrap gap-3">
          {isSizesLoading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <Skeleton key={index} className="w-10 h-10" />
              ))
            : sizes?.data.map((size: ISize) => (
                <button
                  key={size.id}
                  onClick={() => addSizes(size.id)}
                  className={`w-10 h-10 text-xs text-neutral-black-500 font-medium rounded-sm border ${
                    selectedSizes.includes(size.id) &&
                    "border-neutral-black-700"
                  }`}
                >
                  {size.attributes.name}{" "}
                </button>
              ))}
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium mb-4">Price</h3>
        <Slider
          defaultValue={[1000]}
          min={10}
          max={1500}
          step={1}
          className="mt-6 pb-10"
          onValueChange={(v) => {
            setSliderValue(v[0]);
          }}
          onClick={() => setPriceRange(sliderValue)}
        />
      </div>
      <button
        className=" bg-neutral-white-200 absolute top-0 right-0 p-1 md:hidden"
        onClick={() => setOpenSidebar(false)}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default FilterSidebar;
