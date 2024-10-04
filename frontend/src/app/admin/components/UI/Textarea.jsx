import {Textarea} from "@nextui-org/react";

const UITextarea = () => {
  return (
    <Textarea
      isRequired
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
      className="max-w-xs"
    />
  )
}

export default UITextarea