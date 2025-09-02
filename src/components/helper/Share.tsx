"use client";
import { FaWhatsapp, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "lucide-react";
import { toast } from "sonner";

const Share = ({ url, name }: { url: string; name: string }) => {
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const waShare = `https://wa.me/?text=${encodeURIComponent(name + " " + url)}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(name)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link Copied");
  };

  return (
    <div>
      <p className="text-lg font-bold mb-1 mt-5">Share to:</p>
      <div className="flex items-center gap-3">
        <a
          href={fbShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-blue-600"
          title="Share on Facebook"
        >
          <FaFacebookF className="size-5" />
        </a>
        <a
          href={waShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-green-600"
          title="Share on WhatsApp"
        >
          <FaWhatsapp className="size-6" />
        </a>
        <a
          href={twitterShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-black"
          title="Share on X"
        >
          <FaXTwitter className="size-5" />
        </a>
        <a
          href={linkedinShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-blue-700"
          title="Share on Linkedin"
        >
          <FaLinkedin className="size-5" />
        </a>
        <button
          onClick={handleCopyLink}
          title="Copy Link"
          className="text-black cursor-pointer"
        >
          <Link size={18} />
        </button>
      </div>
    </div>
  );
};

export default Share;
