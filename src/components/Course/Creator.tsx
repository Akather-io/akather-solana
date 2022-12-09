"use client";
import {
  bundlrStorage,
  Metaplex,
  toMetaplexFileFromBrowser,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

export default function CourseCreator() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [nftController, setNftController] = useState<Metaplex>();

  const ref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setNftController(
      Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
          bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000,
          })
        )
    );
  }, [connection, wallet]);

  const selectImage = useCallback(() => {
    ref.current?.click();
  }, []);

  const onImageChange = useCallback(() => {
    const file = ref.current?.files?.[0];
    if (file) {
      setImage(file);
      ref.current.value = "";
    }
  }, []);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setName(e.target.value);
    },
    []
  );

  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      setDescription(e.target.value);
    }, []);

  const onPriceChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setPrice(Number(e.target.value));
    },
    []
  );

  const onCreateCourse = useCallback(async () => {
    console.log(image, name, description, price);

    if (!nftController || !image || !name || !description || price < 0) {
      toast("Please fill all fields!", { type: "error" });
      return;
    }
    const { uri } = await nftController.nfts().uploadMetadata({
      name,
      symbol: "ATH",
      description,
      price,
      image: await toMetaplexFileFromBrowser(image),
    });

    const { nft } = await nftController.nfts().create({
      uri: uri,
      name,
      symbol: "ATH",
      sellerFeeBasisPoints: 100,
    });
    toast("Create NFT success!", { type: "success" });
  }, [image, name, description, price, nftController]);

  return (
    <>
      <span className="text-black font-bold text-lg uppercase">
        Create your new course
      </span>
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
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#246FFF] -ml-3.5"
              value="B"
            >
              <option value="B">Anatomy</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Type</div>
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#000000] -ml-3.5"
              value="A"
            >
              <option value="A">K12, University, Proffesional...</option>
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
          <button
            className="btn border-0 outline-none flex items-center justify-center gap-2 rounded-[5px] text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]"
            onClick={onCreateCourse}
          >
            Create course
          </button>
        </div>
      </div>

      <div className="flex flex-row py-14 flex-1 gap-5">
        <div
          className="bg-[#F4F5FF] rounded-[20px] p-4 h-full min-h-full w-auto cursor-pointer relative"
          onClick={selectImage}
        >
          <Image
            src={image?.name ? URL.createObjectURL(image) : "/logo.png"}
            width={310}
            height={310}
            alt=""
            quality={100}
            className="aspect-square h-full rounded-[23px]"
          />
          <div className="absolute w-full h-full ">
            <input
              ref={ref}
              type="file"
              className="text-transparent hidden"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="space-y-2 mb-5">
            <h2 className="text-black font-semibold text-[18px] truncate w-full">
              Type your course name
            </h2>
            <input
              type="text"
              placeholder="Type your course name here"
              className="w-full max-w-lg bg-transparent input input-bordered"
              onChange={onNameChange}
              value={name}
            />
          </div>
          <div className="space-y-2 mb-5">
            <h2 className="text-black font-semibold text-[18px] truncate w-full">
              Price(SOL)
            </h2>
            <input
              type="number"
              placeholder="Price of course"
              className="w-full max-w-lg bg-transparent input input-bordered"
              onChange={onPriceChange}
              value={price}
            />
          </div>
          <div className="space-y-2 cursor-pointer">
            <h2 className="text-black font-semibold text-[18px] truncate w-full">
              Video upload
            </h2>
            <div className="flex flex-row items-center gap-5">
              <div className="w-[70px] h-[70px] aspect-square min-w-0 rounded-[10px]">
                <Image
                  src={`https://picsum.photos/50/50?random=1`}
                  width={50}
                  height={50}
                  alt=""
                  quality={100}
                  className="aspect-square w-full rounded-[10px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[#27272b]/70 text-[14px]">45 mins</span>
                <span className="text-black">Salvador Dali</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="space-y-2 mb-10 h-full">
            <h2 className="text-black font-semibold text-[18px] truncate">
              Description
            </h2>
            <textarea
              placeholder="Type description of course here"
              className="w-full max-w-lg bg-transparent input input-bordered min-h-full"
              onChange={onDescriptionChange}
              value={description}
            />
          </div>
        </div>
      </div>
    </>
  );
}
