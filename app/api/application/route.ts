import dbConnect from "@/lib/db/dbConnect";
import { Application } from "@/lib/db/models/application";

export const GET = async (request: Request) => {
  try {
    await dbConnect();
    const query = request.url.split("?")[1];
    const params = new URLSearchParams(query);
    const id = params.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }

    const application = await Application.findById(id);
    if (!application) {
      return new Response(
        JSON.stringify({ message: "Application not found" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ message: "Application found", application }), {
      status: 200,
    });
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
