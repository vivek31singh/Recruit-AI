"use client";
import { MainContainer } from "@/components/layout/main-container";
import React from "react";


const Page = () => {
  const openRouter_API_Key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

  const dummyResumeText = `Name: Priya Sharma
Email: priya.sharma@email.com
Phone: +91-9876543210
LinkedIn: linkedin.com/in/priyasharma

Summary:
Detail-oriented and passionate Full Stack Developer with 3+ years of experience building scalable web applications. Skilled in JavaScript, React, Node.js, and MongoDB. Enthusiastic about learning new technologies and solving real-world problems.

Skills:
- JavaScript, TypeScript
- React, Redux
- Node.js, Express.js
- MongoDB, PostgreSQL
- HTML, CSS, Tailwind
- Git, Docker, REST APIs

Experience:
Software Developer — TechNova Pvt Ltd
March 2021 – Present
- Developed and maintained a customer dashboard using React and Redux.
- Created backend services with Node.js and MongoDB for order management.
- Improved performance by 30% by optimizing React components.

Web Developer Intern — CodeCrafts
Jan 2020 – Feb 2021
- Built responsive web pages with HTML/CSS and JavaScript.
- Integrated third-party APIs for payment gateway and SMS services.

Education:
B.Tech in Computer Science
Lovely Professional University, Punjab
Graduated: 2019

Certifications:
- MongoDB Developer Associate
- AWS Certified Cloud Practitioner

Projects:
- Portfolio website
- E-commerce backend service (Node + MongoDB)
- Chat app using Socket.io

Languages:
- English (Fluent)
- Hindi (Native)
`;

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

  const prompt = `
You are an intelligent AI recruiter assistant at ocode technologies. You are responsible for screening candidates for a Full Stack Developer role for ocode technologies based in Mohali.

Given the candidate’s resume and the job description, follow the steps below and respond in a professional tone:

1. Score the candidate’s **technical fit** for the role on a scale of 1 to 10.
2. List the candidate’s **key strengths** in bullet points.
3. Point out **potential weaknesses** or missing elements relevant to the job description.
4. State clearly: **Is this candidate a good match? (Yes/No)** — base this on technical fit, experience alignment, and project relevance.
5. Based on the evaluation above, **compose an email** to the candidate. If they are a good match, invite them for the next step (interview or screening call). If they are not a good match, politely reject them and thank them for their interest.

Use the following data:

---

**Candidate Resume:**
${dummyResumeText}

---

**Job Description:**
${dummyJobDescription}
`;

  const [output, setOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAPIcall = async () => {
    if (!openRouter_API_Key)
      return console.log("no api key", openRouter_API_Key);

    setLoading(true);
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
    });

    const data = await res.json();

    if (data.error) {
      console.log(data.error);
      setLoading(false);
      return;
    }

    setOutput(data.choices[0].message.content);
    setLoading(false);
  };
  return (
    <MainContainer className="sm:px-5">
      <div className="flex flex-row items-start justify-center w-full space-x-8 overflow-x-hidden">
        <div className="w-1/2 max-w-7xl mt-24 space-y-4">
          <h2 className="text-lg font-semibold">Resume</h2>
          <pre className="text-sm p-4 rounded-md whitespace-pre-wrap overflow-auto max-h-[500px]">
            {dummyResumeText}
          </pre>
        </div>

        <div className="w-1/2 max-w-7xl space-y-4 mt-24 border-l border-gray-300 pl-6">
          <h2 className="text-lg font-semibold">Response</h2>
          <pre className="text-sm p-4 rounded-md whitespace-pre-wrap overflow-auto max-h-[500px]">
            {loading ? "Loading your response..." : output}
          </pre>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleAPIcall}
          className="rounded px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          Make API Call {output ? "Again" : ""}
        </button>
      </div>
    </MainContainer>
  );
};

export default Page;
