import { NextRequest } from "next/server";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to fetch prompts"), {
      status: 500,
    });
  }
};
