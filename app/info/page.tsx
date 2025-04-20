import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen  md:lg:pl-[6rem] bg-[#080e15]  p-6">
      <div className="max-w-screen-lg mx-auto py-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-4 border-b border-slate-700 pb-8">
          <h1 className="text-3xl font-bold text-slate-200 flex items-center gap-2">
            <span className="text-red-400">🎬</span>
            About This Project
          </h1>
          <p className="text-slate-400 text-lg">
            A personal exploration in web development and design
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-slate-300">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">
              👨💻 Development Journey
            </h2>
            <p className="leading-relaxed">
              This platform represents my ongoing journey in mastering web
              development. Built from scratch, it serves as a practical
              laboratory for experimenting with:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 marker:text-red-400">
              <li>Modern React/Next.js architecture</li>
              <li>Tailwind CSS styling techniques</li>
              <li>Responsive design principles</li>
              <li>Third-party API integration</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">
              ⚖️ Important Notes
            </h2>
            <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-red-400">⚠️</span>
                <div>
                  <h3 className="font-medium mb-2">Content Disclaimer</h3>
                  <p className="text-sm text-slate-400">
                    All media displayed is sourced from public APIs. This
                    platform does not host or claim ownership of any content.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400">❤️</span>
                <div>
                  <h3 className="font-medium mb-2">Support Creators</h3>
                  <p className="text-sm text-slate-400">
                    Please enjoy content through official channels to support
                    the artists and creators behind the work.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400 italic">
              "Built with curiosity and maintained with passion. Feel free to
              connect with questions or feedback!"
            </p>
            <div className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              <span>✉️</span>
              <a href="mailto:villanuevaralph2001@gmail.com" className="font-medium">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
