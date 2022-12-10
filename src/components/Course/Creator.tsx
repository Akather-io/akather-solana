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

      <div className="flex flex-col py-14 flex-1 gap-5 md:flex-row">
        <div
          className="bg-[#F4F5FF] rounded-[20px] p-4 h-full flex min-h-full w-full md:w-auto cursor-pointer relative"
          onClick={selectImage}
        >
          <Image
            src={image?.name ? URL.createObjectURL(image) : "/default.png"}
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
        <div className="flex flex-col flex-1">
          <div className="space-y-2 mb-5">
            <h2 className="text-black font-semibold text-[18px] truncate w-full">
              Field
            </h2>
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#FF8C00] -ml-3.5"
              defaultValue="1"
            >
              <option value="1">Medical 1</option>
              <option value="2">Medical 2</option>
              <option value="3">Medical 3</option>
            </select>
          </div>
          <div className="space-y-2 mb-5">
            <h2 className="text-black font-semibold text-[18px] truncate w-full">
              Section
            </h2>
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#FF8C00] -ml-3.5"
              defaultValue="1"
            >
              <option value="1">Anatomy 1</option>
              <option value="2">Anatomy 2</option>
              <option value="3">Anatomy 3</option>
            </select>
          </div>
          <div className="space-y-0">
            {Array.from(Array(3).keys()).map((i) => (
              <div
                key={i}
                className="mr-2 text-xs inline-flex items-center font-bold leading-sm pl-3 pr-1 py-1 rounded-full bg-white text-gray-700 border"
              >
                Tag {i + 1}
                <div className="bg-slate-300 rounded-full w-4 h-4 flex justify-center items-center ml-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-5">
            <h2 className="text-black font-semibold text-[18px] truncate w-full">
              Type
            </h2>
            <div className="flex flex-row gap-5">
              <input
                type="text"
                placeholder="Type your tag type"
                className="w-full max-w-lg bg-transparent input input-bordered"
                onChange={onNameChange}
                value={name}
              />
              <button
                className="btn border-0 outline-none flex items-center justify-center gap-2 rounded-[5px] text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]"
                onClick={onCreateCourse}
              >
                Create course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
