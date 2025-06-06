export const POST = async (request: Request) => {
    const body = await request.json();
    console.log("resume body", body);
    return new Response(body);
};