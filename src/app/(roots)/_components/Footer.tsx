'use client'

import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full py-4 text-center text-gray-600 text-sm font-mono">
      Made with ❤️ by <Link href={"https://www.linkedin.com/in/nayan-das2004/"} className="text-black">NAYAN</Link>
    </footer>
  );
}

export default Footer;
