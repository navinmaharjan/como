'use client'

import { Select, SelectItem } from "@nextui-org/react";

const ShopSelect = () => {
    const customStyle = {
        base: "bg-default-500 border border-gray-300",
    };
    return (
        <div>
            <Select
                aria-label="Select"
                radius="none"
                placeholder="Relevance"
                classNames={{
                    base: customStyle.base,
                }}
                size="sm"
            // value={categoryFilter}
            // onChange={(e) => handleCategoryChange(e.target.value)}
            >
                <SelectItem key="NameA-Z" value="NameA-Z">Name, A-Z</SelectItem>
                <SelectItem key="NameZ-A" value="NameZ-A">Name, Z-A</SelectItem>
                <SelectItem key="PriceLow-High" value="PriceLow-High">Price, Low-High</SelectItem>
                <SelectItem key="PriceHigh-Low" value="PriceHigh-Low">Price, High-Low</SelectItem>

            </Select>
        </div>
    )
}

export default ShopSelect