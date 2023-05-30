"use client";

import { FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

interface Params {
  params: {
    id: string;
  };
}

const EditPrompt = ({ params: { id } }: Params) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState({ prompt: "", tag: "" });

  const editPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!id) return alert("Prompt ID not found!");

    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt.prompt,
          userId: session?.user?.id,
          tag: prompt.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${id}`);
      const data = await response.json();

      setPrompt(data);
    };
    if (id) getPromptDetails();
  }, [id]);

  return (
    <Form
      type="Edit"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
