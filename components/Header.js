import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const Header = ({ name, profilePic, isFetching }) => {
  return (
    /* sticky top-0 z-40 */
    <header className="bg-[#101010] py-4 sm:py-5 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-[inter] font-bold text-white text-4xl">
          <Link href="/">Edvora</Link>
        </div>
        <div className="flex items-center justify-center gap-x-7">
          <div className="font-[inter] hidden sm:inline-flex text-white text-xl font-bold">
            {isFetching ? <div className="w-44 h-6 rounded-sm bg-[#292929] animate-pulse"></div> : name}
          </div>
          {isFetching ? (
            <div className="w-[52px] h-[52px] rounded-full bg-[#292929] animate-pulse"></div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0.7,
                },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.1},
                },
              }}
            >
              <Image className="rounded-full object-cover" src={profilePic} width={49} height={49} />
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
