import Image from "next/image";
import IconSvgShop from "../../components/_Icons/IconSvgShop";
import Container from "../../components/_UI/Container";

export default function StudyPage() {
  return (
    <Container>
      <div className="flex justify-center">
        <div className="gap-16 mx-auto tabs">
          <a className="text-black tab tab-bordered tab-lg">I-Course</a>
          <a className="text-black tab tab-bordered tab-active tab-lg">3D Assets</a>
          <a className="text-black tab tab-bordered tab-lg">My Library</a>
        </div>
      </div>
      <div className="bg-[#F4F5FF] rounded-[10px] p-5 grid lg:grid-cols-2 mt-10">
        <div className="grid lg:grid-cols-3">
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Field</div>
            <select className="w-full max-w-full bg-transparent select select-ghost text-[#FF8C00] -ml-3.5">
              <option selected>Medical</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Section</div>
            <select className="w-full max-w-full bg-transparent select select-ghost text-[#246FFF] -ml-3.5">
              <option selected>Anatomy</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Type</div>
            <select className="w-full max-w-full bg-transparent select select-ghost text-[#000000] -ml-3.5">
              <option selected>K12, University, Proffesional...</option>
            </select>
          </div>
        </div>
        <div className="flex items-end justify-around">
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Type</div>
            <input
              type="text"
              placeholder="Find I-course you want"
              className="w-full max-w-lg bg-transparent input input-bordered"
            />
          </div>
          <button className="btn border-0 outline-none flex items-center justify-center gap-2 rounded-[5px] text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]">
            Apply
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 py-14">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <div
            className="bg-[#F4F5FF] rounded-[20px] p-4 space-y-4 flex flex-col w-full relative"
            key={item}
          >
            <Image
              src={`https://picsum.photos/310/310?random=${index}`}
              width={310}
              height={310}
              alt=""
              quality={100}
              className="aspect-square w-full rounded-[23px]"
            />

            <div className="absolute right-8 top-4">
              <span className="gap-1 text-black bg-gray-200 border-none badge badge-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>{" "}
                200
              </span>
            </div>

            <div className="flex items-center w-full">
              <h2 className="text-black font-semibold text-[18px] truncate w-full">
                Install the farm ventilation...
              </h2>
              <span className="text-white bg-red-500 border-none badge badge-md">PRO</span>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-[50px] h-[50px] aspect-square min-w-0 rounded-[10px]">
                  <Image
                    src={`https://picsum.photos/50/50?random=${index}`}
                    width={50}
                    height={50}
                    alt=""
                    quality={100}
                    className="aspect-square w-full rounded-[10px]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#27272b]/70 text-[14px]">45 mins</span>
                  <span className="text-black">Salvador Dali</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#27272b]/70  text-[14px]">Price</span>
                <span className="text-[16px] font-semibold text-black">4.52 SOL</span>
              </div>
            </div>

            <div className="flex space-x-[10px]">
              <button className="w-[calc(50%-5px)] btn border-0 outline-none flex items-center justify-center gap-2 rounded-full text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]">
                <IconSvgShop />
                Buy Now
              </button>
              <button className="w-[calc(50%-5px)] btn border-[#27272B80] outline-none gap-2 rounded-full bg-[#F4F5FF]">
                More detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
