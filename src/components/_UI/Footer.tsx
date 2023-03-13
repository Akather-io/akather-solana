import Image from "next/image";
import Container from "./Container";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="px-4 md:px-6 2xl:px-0 py-16 footer text-base-content bg-[#F5F5F5] border-t border-solid border-[#27272B80]">
          <div>
            <Image className="-ml-6" src="/logo-akather.png" height={111} width={313} alt="Logo" />
            <p className="max-w-[320px] mt-2">
              Experiential education platform built on metaverse. Learning any proffesional skill
            </p>
            <button className="px-40 rounded-[10px] mt-14 h-[60px] capitalize bg-[linear-gradient(89.96deg,#4383C3_0.03%,#374B8D_103.48%)] text-[20px] text-white font-semibold">
              Explore now
            </button>
          </div>
          <div>
            <span className="text-black footer-title">Social</span>
            <a className="link link-hover">Facebook</a>
            <a className="link link-hover">Pinterest</a>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">Youtube</a>
          </div>
          <div>
            <span className="text-black footer-title">Guide</span>
            <a className="link link-hover">Start</a>
            <a className="link link-hover">Immersive Learning</a>
            <a className="link link-hover">How to purcharse</a>
            <a className="link link-hover">Process for learning</a>
            <a className="link link-hover">Help learning</a>
          </div>
          <div>
            <span className="text-black footer-title">Policy</span>
            <a className="link link-hover">Course Policy</a>
            <a className="link link-hover">Member Term</a>
            <a className="link link-hover">Github</a>
            <a className="link link-hover">Q&A</a>
            <a className="link link-hover">Email</a>
          </div>
          <div>
            <span className="text-black footer-title">Our Forum</span>
            <a className="link link-hover">Disscusion</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
