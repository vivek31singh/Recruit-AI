import { Heading } from "@/components/base/Heading";
import React from "react";
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Application {
  _id: string;
  subject: string;
  from: string;
  body: string;
  parsedResume: string;
  applicationResponse: {
    score: number;
    keyStrengths: string[];
    potentialWeaknesses: string[];
    goodMatch: boolean;
    followUpEmail: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const env = process.env.ENV;
  const siteUrl = env === "production" ? process.env.SITE_URL : "http://localhost:3000";
  const resp = await fetch(`${siteUrl}/api/application?id=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsedResponse = await resp.json();

  const application: Application = parsedResponse.application ?? null;

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 overflow-auto hidescrollbar">
      <Heading level={1} className="text-2xl md:text-3xl font-bold mb-5">
        Detailed View of Application
      </Heading>
      <Heading level={4} className="text-sm md:text-3xl font-bold mb-5">
        Subject- {application?.subject}
      </Heading>
      <Heading level={4} className="text--sm md:text-3xl font-bold mb-10">
        From- {application?.from} -
      </Heading>
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-10 space-y-8 border border-gray-200 dark:border-gray-700">
        {/* Resume Summary */}
        <div>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Parsed Resume
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
            {application?.parsedResume}
          </p>
        </div>

        {/* Score and Match */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Score
            </h2>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {application?.applicationResponse?.score}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Good Match
            </h2>
            <p
              className={`text-xl font-bold ${
                application?.applicationResponse?.goodMatch
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {application?.applicationResponse?.goodMatch ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Key Strengths */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Key Strengths
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
            {application?.applicationResponse?.keyStrengths?.map(
              (strength, index) => (
                <li key={index}>{strength}</li>
              )
            )}
          </ul>
        </div>

        {/* Potential Weaknesses */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Potential Weaknesses
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
            {application?.applicationResponse?.potentialWeaknesses?.map(
              (weakness, index) => (
                <li key={index}>{weakness}</li>
              )
            )}
          </ul>
        </div>

        {/* Follow Up Email */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Follow Up Email
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {application?.applicationResponse?.followUpEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
