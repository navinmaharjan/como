import {Button} from "@nextui-org/react";

const ButtonComponent = ({children}) => {
  return (
    <>
    <Button color="primary" size="sm" className="bg-primaryColor text-white font-medium"  disableAnimation radius="none">{children}</Button>
    </>
  )
}

export default ButtonComponent