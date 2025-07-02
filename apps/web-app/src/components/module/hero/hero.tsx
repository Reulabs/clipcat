import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOS } from "../../../../utils/get-os.ts";

const Hero = () => {
  const DEVICE = getOS();
  const [open, setOpen] = useState(false);

  const ICON_MAP: Record<string, JSX.Element> = {
    Windows: <i className="devicon-windows11-original text-4xl" />,
    Mac: <i className="devicon-apple-original text-4xl" />,
    Linux: <i className="devicon-linux-plain text-4xl" />,
  };

  const ALL_DEVICES = ["Windows", "Mac", "Linux"];
  const OTHER_DEVICES = ALL_DEVICES.filter((os) => !DEVICE.includes(os));

  const SHOWDOWNLOAD = (
    <button className="mt-2 bg-gradient-to-r from-red-500 to-orange-500 dark:bg-white text-white dark:text-black text-sm font-semibold px-5 py-3 rounded-full flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition">
      {DEVICE.includes("Windows")
        ? ICON_MAP["Windows"]
        : DEVICE.includes("Mac")
          ? ICON_MAP["Mac"]
          : ICON_MAP["Linux"]}
      <span>Download Now</span>
    </button>
  );

  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 text-center dark:bg-black">
      <h1 className="text-3xl pt-24 sm:text-4xl md:text-5xl font-bold leading-snug max-w-3xl mb-6 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent text-center">
        "Why Are We Still Losing <br className="hidden sm:block" />
        the Stuff We Just Copied?"
      </h1>

      <p className="text-gray-400 dark:text-gray-300 text-base sm:text-lg max-w-2xl mb-6">
        You're drowning in clipboard clutter, copied code, links, and notes.
        What’s{" "}
        <span className="bg-orange-500 text-white px-1 font-medium">
          actually
        </span>{" "}
        worth keeping? Clipdock centralizes everything you copy, and you
        <span className="bg-orange-500 px-1 font-medium text-white">
          {" "}
          arrange{" "}
        </span>
        to your taste.
      </p>

      {SHOWDOWNLOAD}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <p className="text-sm mt-2 text-gray-200 cursor-pointer underline hover:text-white transition">
            Download Others
          </p>
        </DialogTrigger>
        <DialogContent className="w-[90%] bg-black/50 max-w-md rounded-xl border border-white/10 backdrop-blur ">
          <DialogHeader>
            <DialogTitle className="text-center text-lg mb-4">
              Choose Another Platform
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {OTHER_DEVICES.map((platform) => (
              <a
                key={platform}
                href={`#download-${platform.toLowerCase()}`}
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition text-white"
              >
                {ICON_MAP[platform]}
                <span className="text-sm font-medium">
                  Download for {platform}
                </span>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div
        className="mt-12 w-full bg-white/10
         h-[500px] rounded-lg
         max-w-4xl p-4 backdrop-blur-lg"
      >
        <div
          className={"h-full rounded-lg w-full bg-white"}
          style={{
            backgroundImage: "url(public/img/frame.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
