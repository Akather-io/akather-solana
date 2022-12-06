import Image from "next/image";
import IconSvgShop from "../../components/_Icons/IconSvgShop";
import Container from "../../components/_UI/Container";

export default function StudyPage() {
  return (
    <Container>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 py-14">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <div
            className="bg-[#F4F5FF] rounded-[20px] p-4 space-y-4 flex flex-col w-full"
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
            <h2 className="text-black font-semibold text-[18px]">
              Install the farm ventilation...
            </h2>
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
                <span className="text-[16px] font-semibold text-black">4.52 USDT</span>
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
