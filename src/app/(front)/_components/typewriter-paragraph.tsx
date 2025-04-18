"use client";
import { ReactTyped } from "react-typed";

export function TypewriterParagraph() {
  return (
    <>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
        <ReactTyped
          strings={[
            "An open-source writing platform where ideas find their voice. Create your personal space and let your words resonate. With AI stuff too.",
          ]}
          startDelay={1000}
          typeSpeed={30}
          loop={false}
        />{" "}
      </p>
    </>
  );
}
