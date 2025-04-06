import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen  md:lg:pl-[3.5rem] bg-[#0F0F0F]">
      <div className=" flex flex-col items-center justify-center mx-auto p-8 w-full h-full">
        <p className="text-gray-200 text-2xl font-semibold mb-8">
          About This Site
        </p>
        <p className="text-gray-200 text-justify">
          Hi there—thanks for stopping by. This website is a personal project I
          built to learn and practice web development. It’s not a commercial
          service, and I don’t own or host any of the movies, shows, or other
          content you see here. Everything is sourced from publicly available
          third-party platforms. I created this purely to test my coding
          skills—figuring out how to organize features, design layouts, and
          solve technical challenges. It’s a work in progress, and I’m
          constantly tweaking things as I learn. A few important notes: No
          ownership: I don’t control or claim rights to any content here. Not
          for public use: This is a personal experiment, not a business or
          public platform. Support creators: If you enjoy something you find
          here, please watch it through official services to support the people
          who made it. If you have questions or feedback, feel free to reach out
          . Thanks for understanding, and happy browsing! — Ralph
        </p>
      </div>
    </div>
  );
};

export default page;
