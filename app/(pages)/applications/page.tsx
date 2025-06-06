import { Heading } from "@/components/base/Heading";
import { MainContainer } from "@/components/layout/main-container";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Applicants",
};

interface Application {
  _id: string,
  subject: string,
  from: string,
  body: string,
}

const Page = async () => {
  const allApplicants = await fetch("http://localhost:3000/api/applications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const applications = await allApplicants.json();

  return (
    <MainContainer className="sm:px-5 flex items-center">
        <Heading level={1} className="text-2xl md:text-3xl font-bold mb-5">
          Recent Applications
        </Heading>
      <div className="flex gap-[2%] space-y-[2%] flex-wrap content-start items-stretch w-full">
        {applications.map(({_id, subject, from, body}: Application) => (
          <Link href={`/applications/application/${_id}`} key={_id} className="w-[23.5%] h-[150px] border rounded-md p-4 bg-white dark:bg-[#1A202C] cursor-pointer">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Subject: {subject}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">From: {from}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
            Content:  {body.length > 200 ? `${body.slice(0, 200)}...` : body}
            </p>

          </Link>
        ))}
      </div>
    </MainContainer>
  );
};

export default Page;
