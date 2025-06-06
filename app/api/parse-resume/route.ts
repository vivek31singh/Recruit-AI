export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    console.log("Resume Body:", body);

    // You can now extract fields from `body` such as:
    // body.body => email content
    // body.subject => email subject
    // body.from => sender
    // body.attachments => array of files [{ filename, mimeType, content (base64) }]

    return new Response(
      JSON.stringify({ message: "Received resume data", data: body }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error parsing resume:", error);
      return new Response(
        JSON.stringify({ message: "Invalid request", error: error.message }),
        {
          status: 400,
        }
      );
    } else {
      console.error("Unknown error:", error);
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }
  }
};
