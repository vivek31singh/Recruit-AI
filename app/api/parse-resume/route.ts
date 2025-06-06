export const POST = async (request: Request) => {
    const { resume } = await request.json();
    console.log(resume);
    return new Response(resume);
};