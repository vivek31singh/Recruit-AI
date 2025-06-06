import dbConnect from "@/lib/db/dbConnect";
import { Application } from "@/lib/db/models/application";

export const GET = async () => {
  try {
    await dbConnect();
    const applicants = await Application.find().select({
      parsedResume: 0,
      applicationResponse: 0,
    });
    if (!applicants) {
      return new Response(JSON.stringify({ message: "No applicants found" }), {
        status: 400,
      });
    } else {
      return new Response(JSON.stringify(applicants), {
        status: 200,
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    } else {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 400,
      });
    }
  }
};
