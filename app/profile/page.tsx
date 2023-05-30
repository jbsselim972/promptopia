"use client";
import Profile from "@components/Profile";
import { IPrompt } from "@models/prompt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session]);

  const handleEdit = async (prompt: IPrompt) => {
    router.push(`/prompt/${prompt._id}/edit`);
    // const response = await fetch(`/api/prompts/${prompt.id}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify(prompt),
    // })
  };

  const handleDelete = async (prompt: IPrompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPrompts = prompts.filter(
          (p: IPrompt) => p._id.toString() !== prompt._id.toString()
        );

        setPrompts(filteredPrompts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
