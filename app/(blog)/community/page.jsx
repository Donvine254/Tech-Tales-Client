export const metadata = {
  title: "Community Guidelines- Tech Tales",
};
export default async function CommunityPage() {
  return (
    <section className="font-poppins md:mt-8">
      <div className="p-2 md:p-6 bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1705348745/wlqqvrc1iqcbnfipageb.png')] bg-cover bg-no-repeat  ">
        <h1 className="font-bold md:leading-loose text-center text-xl md:text-3xl tracking-wide my-1">
          Tech Tales Community Guidelines
        </h1>
        <p className="leading-loose text-base text-center md:w-1/2 md:mx-auto xsm:text-sm">
          Tech Tales is a blog for tech students, enthusiasts and professionals
          where we share, learn and grow. This is a community where we always
          treat each other with respect and help each other succeed.
        </p>
      </div>
      <div className="px-2 md:px-8 w-full mx-auto md:my-4 md:w-2/3">
        <div>
          <div className="flex items-center justify-between gap-1">
            <hr className="w-1/3 border border-blue-300" />
            <h2 className="xsm:text-xl text-2xl font-bold inline-flex gap-1 items-center flex-1 whitespace-nowrap">
              <svg
                viewBox="0 0 21 21"
                fill="currentColor"
                height="1em"
                width="1em"
                className="fill-blue-500">
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="#3b82f6"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M17.5 14.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2z" />
                  <path d="M5.305 4.935l-2.004.73a2 2 0 00-1.195 2.563l3.42 9.397A2 2 0 008.09 18.82l5.568-2.198M8.5 7.5h5M8.5 9.5h6M8.5 11.5h3" />
                </g>
              </svg>
              <span>Community Guidelines</span>
            </h2>
            <hr className="w-1/3 border border-blue-300" />
          </div>
          <h2 className="text-xl text-gray-600  font-bold my-1">
            Keep It Relevant{" "}
          </h2>
          <p className="text-blue-500 my-1">
            Only share the most relevant content on technology. Examples include{" "}
            <span className="p-0.5 border border-gray-400 rounded-md whitespace-nowrap my-2">
              web development
            </span>
            , &nbsp;
            <span className="p-0.5 border border-gray-400 rounded-md whitespace-nowrap my-2">
              data analysis
            </span>
            , &nbsp;
            <span className="p-0.5 border border-gray-400 rounded-md  whitespace-nowrap my-2">
              cloud computing
            </span>
            , &nbsp;
            <span className="p-0.5 border border-gray-400 rounded-md whitespace-nowrap my-2">
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
            postings (spam) by the same user are not permitted, as they clutter
            up discussions for other users. We will also remove comments subject
            to legal issues (slander, defamation, contempt of court) and any
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
          <p className="text-green-500 my-1">
            Copy paste{" "}
            <span className="p-0.5 border border-gray-400 rounded-md  whitespace-nowrap text-black">
              CTRL + C
            </span>{" "}
            <span className="p-0.5 border border-gray-400 rounded-md  whitespace-nowrap text-black">
              CTRL + V
            </span>{" "}
            is the greatest discovery for mankind but avoid it at all costs.
          </p>
          <hr className="border-green-400" />
          <p className="my-b leading-loose tracking-wide">
            Impersonating brands or other users, or featuring licensed or
            copyright material, is not allowed. Content containing unverified or
            false claims about products will be removed. We also encourage
            authors and users to avoid posting{" "}
            <span className="text-red-500">AI generated content</span>.
          </p>
          <h2 className="text-xl font-bold my-2">
            Child Safety and Fighting Hate
          </h2>
          <p className="text-pink-500">
            Post content that is tailored to audiences of all ages and avoid
            spreading hate. You never know who is reading!
          </p>
          <hr className="border-pink-400" />
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
          <p className="text-blue-500">
            Helping others will help make you feel like a senior developer!
          </p>
          <hr className="border-blue-500" />
          <p className="my-1 leading-loose tracking-wide">
            Finally, Tech Tales retains the right to remove any content posted
            to Tech Tales or block users from posting for any other reason
            deemed necessary, to create a helpful community.
          </p>
        </div>
        {/* alert div */}
        <div
          className="bg-cyan-100  border border-cyan-500  py-3 rounded relative sm:border-l-8 "
          role="alert">
          <div className="md:flex px-1 gap-2 ">
            <div className="py-1">
              <svg
                viewBox="0 0 64 64"
                fill="currentColor"
                height="48"
                width="48"
                className="xsm:mx-auto text-cyan-500">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit={10}
                  strokeWidth={2}>
                  <path d="M24 30a8 8 0 0016 0M18 20h2M46 20h-2" />
                  <path d="M32 47h31V5H1v42h17v12z" />
                </g>
              </svg>
            </div>
            <div className="xsm:p-2">
              <p className="font-bold text-[18px]">
                Tell us if you see abusive content!
              </p>
              <p className="text-sm leading-loose">
                If you see something you believe may violate our policies,
                whether in profiles, posts, messages, comments, or anywhere
                else, please report it to us. You can report content by emailing
                us at{" "}
                <a
                  target="_blank"
                  className="font-semibold hover:underline p-1 border rounded-md border-blue-500 whitespace-nowrap"
                  href="mailto:donvinemugendi@gmail.com">
                  support@techtales.vercel.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
