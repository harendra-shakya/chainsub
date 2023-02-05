import { BiHome, BiCog } from "react-icons/bi";
import { AiFillLayout } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdMail } from "react-icons/md";
import { RiFileLockFill, RiGalleryFill } from "react-icons/ri";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { ImEmbed2 } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import { HomeIcon, DocumentIcon, ProfileIcon } from "../Icons/Icons";

export default function Sidebar(props) {
  const router = useRouter();
  const username = props.username;

  return (
    <div className="m-8 font-CircularMedium mt-16 dark:text-slate-50 tracking-wide">
      <ul className="items-center justify-center space-y-4  ">
        <li className="text-sm flex bg-white rounded-md py-2 px-2 shadow">
          <HomeIcon className="mr-2 text-lg " />
          <Link className="" href="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <AiFillLayout className="mr-2 text-lg" />
          <Link className="hover:text-orange-500 transition-all" href={`/${username}`}>
            View page
          </Link>
          <HiOutlineExternalLink className="ml-2" />
        </li>
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <RiFileLockFill className="mr-2 text-lg" />
          <Link className="hover:text-orange-500 transition-all" href="/membership">
            Membership
          </Link>
        </li>
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <DocumentIcon className="mr-2 text-lg" />
          <Link className="hover:text-orange-500 transition-all" href="/posts">
            Post
          </Link>
        </li>
      </ul>

      <h4 className="mt-10 mb-4 text-gray-400 font-Montserrat text-xs">SETTINGS</h4>
      <ul className="items-center justify-center space-y-4 ">
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <ProfileIcon className="mr-2 text-lg" />
          <Link className="hover:text-orange-500 transition-all" href="/profile">
            Profile
          </Link>
        </li>
      </ul>

      <h4 className="mt-10 mb-4 text-gray-400 font-Montserrat text-xs">COMING SOON</h4>
      <ul className="items-center justify-center space-y-4 ">
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <MdMail className="mr-2 text-lg" />
          Messages
        </li>
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <RiGalleryFill className="mr-2 text-lg" />
          NFT Gallery
        </li>
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <BsFillLightningChargeFill className="mr-2 text-lg" />
          Integrations
        </li>
        <li className="text-sm flex bg-white rounded-md py-2 px-2">
          <ImEmbed2 className="mr-2 text-lg" />
          Buttons & Graphics
        </li>
      </ul>
    </div>
  );
}
