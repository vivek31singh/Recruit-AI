import dbConnect from "@/lib/db/dbConnect";
import { Application } from "@/lib/db/models/application";

const dummyJobDescription = `Job Title: Full Stack Developer
Location: Mohali, Punjab
Experience Required: 3+ Years
Job Type: Full-Time | On-site

Job Description:
We are looking for a talented and experienced Full Stack Developer to join our growing development team in Mohali. The ideal candidate will have a strong background in both frontend and backend technologies, with a passion for building scalable, high-performance web applications.

Responsibilities:
Design, develop, and maintain scalable web applications using MERN stack (MongoDB, Express.js, React.js, Node.js).

Collaborate with cross-functional teams to define, design, and ship new features.

Write clean, maintainable, and efficient code following best practices.

Integrate third-party APIs and services as needed.

Optimize applications for speed and scalability.

Participate in code reviews and technical discussions.

Troubleshoot, debug, and upgrade existing systems.

Required Skills:
Strong proficiency in JavaScript, HTML, CSS, and modern frontend frameworks like React.js.

Hands-on experience with Node.js, Express.js, and MongoDB.

Experience working with RESTful APIs and microservices architecture.

Familiarity with version control systems like Git.

Knowledge of cloud platforms like AWS or DigitalOcean is a plus.

Experience with CI/CD pipelines is a plus.

Understanding of Agile/Scrum methodologies.

Qualifications:
Bachelor’s degree in Computer Science, IT, or a related field.

Minimum 3 years of experience as a Full Stack Developer.

Strong problem-solving and communication skills.

Ability to work independently and as part of a team.

Perks & Benefits:
Competitive salary package.

Friendly and collaborative work environment.

Opportunities for professional growth and learning.

Flexible working hours.

Monthly team activities and annual retreats.

How to Apply:
Send your resume and portfolio to careers@example.com with the subject line: “Full Stack Developer - Mohali”.`;

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const { body, subject, from, parsedResume } = await request.json();
    const openRouter_API_Key = process.env.OPENROUTER_API_KEY;

    if (!openRouter_API_Key) {
      return new Response(JSON.stringify({ message: "API key not found" }), {
        status: 400,
      });
    }

    if (!body || !subject || !from || !parsedResume) {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }

    const prompt = `
You are an intelligent AI recruiter assistant at ocode technologies. You are responsible for screening candidates for a Full Stack Developer role in Mohali.

Given the candidate’s details below, analyze their suitability for the job role. Respond only with a valid JSON object with the following structure:

{
  "score": number, // Candidate's technical fit score from 1 to 10
  "keyStrengths": string[], // Array of candidate's key strengths
  "potentialWeaknesses": string[], // Array of candidate's weaknesses or missing skills
  "goodMatch": boolean, // True if candidate is a good match, otherwise false
  "followUpEmail": string // Polite email inviting for interview if goodMatch is true, else a rejection email thanking them
}

Candidate details:

Subject: "${subject}"

From: "${from}"

Email Body:
"""${body}"""

Parsed Resume Text:
"""${parsedResume}"""

Job Description:
${dummyJobDescription}

Analyze the candidate's resume against the job description and fill the JSON fields accordingly.
`;

    const analyzedResume = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouter_API_Key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await analyzedResume.json();

    if (data.error) {
      return new Response(
        JSON.stringify({
          message: "Error analyzing resume",
          error: data.error,
        }),
        {
          status: 400,
        }
      );
    }

    if (!data.choices || data.choices.length === 0) {
      return new Response(
        JSON.stringify({ message: "No response from OpenRouter API" }),
        {
          status: 400,
        }
      );
    }

    const response = data.choices[0].message.content || "";

    const parsedResponse = JSON.parse(response);

const newApplication = await Application.create({
  subject,
  from,
  body,
  parsedResume,
  applicationResponse: {
    score: parsedResponse.score,
    keyStrengths: parsedResponse.keyStrengths,
    potentialWeaknesses: parsedResponse.potentialWeaknesses,
    goodMatch: parsedResponse.goodMatch,
    followUpEmail: parsedResponse.followUpEmail,
  },
})

if (!newApplication) {
  return new Response(
    JSON.stringify({ message: "Error creating application" }),
    {
      status: 400,
    }
  );
}


    return new Response(
      JSON.stringify({ message: "Success", application: newApplication }),
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
