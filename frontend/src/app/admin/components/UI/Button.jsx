import {Button} from "@nextui-org/react";

export default function App({children}) {
  return (
    <Button className="bg-blue-800 text-white p-2">
      {children}
    </Button>
  );
}
