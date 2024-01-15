import React from "react";
export const metadata = {
  title: "Community Guidelines- Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};
export default function page() {
  return (
    <section className="font-poppins">
      <div className="p-6 bg-[url('https://images.all-free-download.com/images/graphicwebp/abstract_background_template_elegant_dynamic_3d_waves_6931840.webp')] bg-cover bg-no-repeat text-white ">
        <h1 className="font-bold leading-loose text-center text-xl md:text-3xl tracking-wide my-1">
          Tech Tales Community Guidelines
        </h1>
        <p className="leading-loose text-base md:text-center md:w-1/2 md:mx-auto">
          Tech Tales is a blog for tech students, enthusiasts and professionals
          where we share, learn and grow. This is a community where we always
          treat each other with respect and help each other succeed .
        </p>
      </div>
      <div className="px-8 py-4 w-full mx-auto md:my-4 md:w-2/3">
        <div>
          <h1 className="text-gray-600 font-bold text-xl md:text-2xl">
            Community Engagement Rules
          </h1>
          <h2 className="text-xl text-gray-600  font-bold my-1">
            Keep It Relevant{" "}
          </h2>
          <p className="text-blue-500 my-1">
            Only share the most relevant content on technology. Examples include{" "}
            <span className="p-0.5 border border-gray-400 rounded-md whitespace-nowrap">
              web development
            </span>
            , &nbsp;
            <span className="p-0.5 border border-gray-400 rounded-md whitespace-nowrap">
              data analysis
            </span>
            , &nbsp;
            <span className="p-0.5 border border-gray-400 rounded-md  whitespace-nowrap">
              cloud computing
            </span>
            , &nbsp;
            <span className="p-0.5 border border-gray-400 rounded-md whitespace-nowrap">
              machine learning
            </span>
            , &nbsp; e.t.c
          </p>
          <hr className="border-gray-400" />
          <p className="mb-2 leading-loose tracking-wide">
            We encourage comments on technology subjects, written in an
            intelligent and constructive manner. Certain contents with
            misleading or deceptive information are not allowed in Tech Tales.
            Remember to only post useful information that others can benefit
            from.
          </p>
          <h2 className="text-xl font-bold my-2"> Do not Spam</h2>
          <p className="text-red-500">
            Avoid spamming content and only offer constructive criticism
          </p>
          <hr className="border-red-400" />
          <p className="mb-2 leading-loose tracking-wide">
            Constructive criticisms of Tech Tales upon which we can act or to
            which we can respond are allowed. However repeated duplicate
            postings (spam) by the same user, as they clutter up discussions for
            other users. We will also remove comments subject to legal issues
            (slander, defamation, contempt of court) and any
            publicizing/encouraging/endorsing illegal activity.
          </p>
          <h2 className="text-xl font-bold my-2">
            Be Kind and Respectful Towards Others
          </h2>
          <p className="text-teal-500">
            Treat others how you would like to be treated and be polite even
            when you disagree with their opinion.
          </p>
          <hr className="border-teal-400" />
          <p className="mb-2 leading-loose tracking-wide">
            Tech Tales allows individuals to share information that they have
            found useful to them and could be beneficial to others, without any
            promise for any monetary reward or special treatment. Kindly be
            respectful towards the authors. Treat others as you would like to be
            treated. Be polite, even if you disagree. Abusive language,
            aggression and bullying/trolling are not allowed. Content with overt
            religious or political bias intended to incite others, or aggressive
            lobbying that disrupts the community for other Tech Tales users,
            will be removed.
          </p>
          <h2 className="text-xl font-bold my-2">Keep it Original</h2>
          <p className="my-2 leading-loose tracking-wide">
            Impersonating brands or other users, or featuring licensed or
            copyright material, is not allowed. Content containing unverified or
            false claims about products will be removed. We also encourage
            authors and users to avoid posting{" "}
            <span className="text-red-500">AI generated content</span>.
          </p>
          <h2 className="text-xl font-bold my-2">
            Child Safety and Fighting Hate
          </h2>
          <p className="my-2 leading-loose tracking-wide">
            Content posted to Tech Tales should be age appropriate and gender
            neutral. Content that is unsuitable for younger audiences or
            promotes hate or violence against groups based on protected
            attributes such as age, gender, race, caste, religion, sexual
            orientation, or veteran status will be removed. This policy also
            includes harmful behavior such as deliberately insulting or shaming
            minors, threats, bullying, or encouraging abusive fan behavior.
          </p>
          <h2 className="text-xl font-bold my-2">
            Be Helpful and You will be helped
          </h2>
          <p className="my-2 leading-loose tracking-wide">
            Finally, Tech Tales retains the right to remove any content posted
            to Tech Tales or block users from posting for any other reason
            deemed necessary, to create a helpful community.
          </p>
        </div>
      </div>
    </section>
  );
}
