import {Input} from "@nextui-org/react";

const Search = () => {
  return (
    <div className="hidden lg:flex w-full flex-wrap md:flex-nowrap  gap-4">
        <Input placeholder="Search" type="email" size="sm" radius="none"/>
    </div>
  )
}

export default Search