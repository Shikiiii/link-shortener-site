"use client";

import { useRef } from "react";
import RedirectPill from "./RedirectPill";
import DottedLine from "./DottedLine";

const TrustSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-primary px-4">
      <div className="container mx-auto">
        <div className="relative">
          {/* Left side */}
          <div className="mb-12 md:mb-0 md:w-5/12 md:absolute md:left-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Trust matters.
            </h2>
            <p className="text-1xl mb-4">Let users see where they are going.</p>
            <div className="mt-2" ref={leftRef}>
              <RedirectPill text="Redirecting you to youtube.com..." />
            </div>
          </div>

          {/* Connecting element */}
          <div className="relative hidden md:block relative w-full py-16 h-full">
            {/* Dotted line */}
            <div>
              <DottedLine fromRef={leftRef} toRef={rightRef} />
            </div>

            {/* Text in the middle */}
            <div className="absolute top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-5/6 bg-primary px-6 py-2 text-center">
              <h2 className="text-4xl font-bold pb-3">We care.</h2>
              <p className="text-1xl font-bold">
                Learn more about our process and what makes it trustworthy.
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="md:w-5/12 md:absolute md:right-0">
            <div className="md:text-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Let users decide.
              </h2>
              <p className="text-1xl mb-4">
                Give enough time to cancel the redirect.
              </p>
              <div className="mt-2">
                <div className="flex md:justify-end" ref={rightRef}>
                  <RedirectPill text="Redirecting you in 5 seconds..." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Only add padding in mobile view where we don't have the connecting line */}
        <div className="md:py-16"></div>

        <div className="mt-16 md:mt-4">
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
