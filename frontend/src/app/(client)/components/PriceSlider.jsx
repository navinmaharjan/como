import { Slider } from "@nextui-org/react";


const PriceSlider = () => {
    return (
        <div className="border p-4">
            <Slider
                className="w-full"
                defaultValue={[0, 150]}
                formatOptions={{ style: "currency", currency: "USD" }}
                label="Price Range"
                maxValue={500}
                minValue={0}
                step={50}
                size="sm"
                classNames={{
                    label: "font-medium text-gray-500 text-xs", 
                    value: "font-medium text-gray-500 text-xs", 
                    thumb: "bg-red-400 w-[16px] h-[16px]",
                    filler: "bg-[#F2AB37]"
                }}
            />
        </div>
    )
}

export default PriceSlider