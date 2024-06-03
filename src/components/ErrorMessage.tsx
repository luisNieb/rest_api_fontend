import { PropsWithChildren } from "react";

export default function ErrorMessage({children } : PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-600 p-3 text-white rounded-none font-extrabold uppercase ">
        {children} 
    </div>
  )
}
