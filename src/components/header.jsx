import Link from "next/link";



export default function Header() {
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
        <div className=" flex justify-between items-center max-w-6xl mx-auto">
       {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <img 
          className="cursor-pointer"
          src="/ig_logo.webp"
          width={96} height={96}
          alt="logo"
          />
        </Link>         

        <Link href="/" className="lg:hidden ">
          <img 
          className="cursor-pointer"
          src="/ig.webp"
          width={40} height={40}
          alt="logo"
          />
        </Link>  

        {/* search box */}
        <input type="text" placeholder="Search" className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]" />

            {/* menu items*/}
            <button className="text-sm font-semibold text-blue-500">Log in </button>
            </div>
        </div>

  )
}

