import { Button } from "@nextui-org/react";

const ButtonComponent = ({ children, type }) => {
  return (
    <div>
      <Button type={type} color="primary" size="sm" className="bg-primaryColor text-white font-medium" disableAnimation radius="none">{children}</Button>
    </div>
  )
}

export default ButtonComponent