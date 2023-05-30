import { NextRequest } from "next/server";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to fetch prompt"), {
      status: 500,
    });
  }
};

export const PATCH = async (request: NextRequest, { params }: any) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to update prompt"), {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to delete prompt"), {
      status: 500,
    });
  }
};
