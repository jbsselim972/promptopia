"use client";
import Image from "next/image";
import { useState } from "react";

import { IPrompt } from "@models/prompt";
import { IUser } from "@models/user";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  prompt: IPrompt;
  handleTagClick?: (tag: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const creator = prompt.creator as IUser;
  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={creator.image || ""}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">{creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? "assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi  text-sm text-gray-700">
        {prompt.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>

      {session?.user.id === creator._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
