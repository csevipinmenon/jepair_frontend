import React from "react";

const projects = [
  { title: "Jepair Bazaar", link: "https://www.jepairbazaar.shop/" },
  { title: "Ozila (comming soon)", link: "#" },
  {
    title: "My PortFolio ",
    link: "https://vipinkumar.vercel.app/",
  },
  {
    title: "Amazon Clone",
    link: "https://csevipinmenon.github.io/amazone-clone/",
  },
  {
    title: "YouTube Backend  (View Code)",
    link: "https://github.com/csevipinmenon/chai_backend_vipin",
  },
  {
    title: "Weather App",
    link: "https://csevipinmenon.github.io/weather_app/",
  },
  { title: "To-Do List", link: "https://csevipinmenon.github.io/To_do_List/" },
  { title: "AND More (Github)", link: "https://github.com/csevipinmenon" },
];

const projectsau = [
  { title: "Jepair Bazaar", link: "https://www.jepairbazaar.shop/" },
  { title: "Ozila (comming soon)", link: "#" },
  { title: "PortFolio", link: "https://csesaurabhpaswan.github.io/Portfolio/" },
  {
    title: "Stop Watch  ",
    link: "https://csesaurabhpaswan.github.io/stop-watch/",
  },
  { title: "AND More (Github)", link: "https://github.com/csesaurabhpaswan" },
];

const projectVish = [
  { title: "Jepair Bazaar", link: "https://www.jepairbazaar.shop/" },
  { title: "Ozila (comming soon)", link: "#" },
  { title: "AND More (Github)", link: "https://github.com/VishalAarya89" },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 items-start">
        {/* Main Section */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 py-10 px-16 rounded-lg shadow-md">
          <img
            src="vipin.jpg"
            alt="vipin"
            className="rounded-2xl w-full items-center object-fill  hover:-translate-y-2 shadow-lg shadow-blue-500 h-72 md:h-80"
          />
          <div className="mt-10">
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full uppercase font-bold tracking-wider">
              Founder of JB
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-3 text-gray-900 dark:text-white">
              Development Skill
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              MERN Stack Developer DSA Enthusiast in C++ Backend Developer with
              Node.js & Express Python Programmer with MySQL Expertise Full
              Authentication & Authorization using Auth0 and JWT
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="animate-bounce text-green-600">➤</span> Latest
            Projects
          </h3>
          <ul className="space-y-6">
            {projects.map((project, index) => (
              <li key={index} className="border-b pb-2">
                <a
                  href={project.link}
                  target="_blank"
                  className="text-blue-600 hover:underline font-semibold flex justify-between"
                >
                  {project.title}
                  <p>
                    <span className="animate-pulse text-orange-500 text-2xl  ">
                      ➤
                    </span>
                  </p>
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Updated recently
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 py-10 px-16 rounded-lg shadow-md">
          <img
            src="saurabh.jpg"
            alt="saurabh"
            className="rounded-2xl w-full items-center object-fill  hover:-translate-y-2 shadow-lg shadow-blue-500 h-72 md:h-80"
          />
          <div className="mt-10">
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full uppercase font-bold tracking-wider">
              CEO of JB
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-3 text-gray-900 dark:text-white">
              Development Skill
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              I'm Saurabh Paswan, a dedicated Computer Science student and web
              developer. I enjoy building responsive and clean websites using
              HTML, CSS, and JavaScript.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="animate-bounce text-green-600">➤</span> Latest
            Projects
          </h3>
          <ul className="space-y-6">
            {projectsau.map((project, index) => (
              <li key={index} className="border-b pb-2">
                <a
                  href={project.link}
                  className="text-blue-600 hover:underline font-semibold flex justify-between"
                >
                  {project.title}
                  <p>
                    <span className="animate-pulse text-orange-500 text-2xl  ">
                      ➤
                    </span>
                  </p>
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Updated recently
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 py-10 px-16 rounded-lg shadow-md">
          <img
            src="vishal.jpg"
            alt="vishal"
            className="rounded-2xl w-full items-center object-fill   hover:-translate-y-2 shadow-lg shadow-blue-500 h-72 md:h-80"
          />
          <div className="mt-10">
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full  uppercase font-bold tracking-wider">
              CFO of JB
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-3 text-gray-900 dark:text-white">
              Development Skill
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              I’m learning new skills to grow as a developer and build projects
              that solve real problems.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="animate-bounce text-green-600">➤</span> Latest
            Projects
          </h3>
          <ul className="space-y-6">
            {projectVish.map((project, index) => (
              <li key={index} className="border-b pb-2">
                <a
                  href={project.link}
                  className="text-blue-600 hover:underline font-semibold flex justify-between"
                >
                  {project.title}
                  <p>
                    <span className="animate-pulse text-orange-500 text-2xl  ">
                      ➤
                    </span>
                  </p>
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Updated recently
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Team;
