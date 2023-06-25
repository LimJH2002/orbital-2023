import { useRouter } from "next/router";
import { motion } from "framer-motion";

const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function Intro2() {
  const router = useRouter();

  return (
    <motion.div
      className="z-10 grid place-items-center h-screen"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
      >
        <motion.h1
          className="font-display text-4xl font-bold text-white transition-colors sm:text-5xl"
          variants={STAGGER_CHILD_VARIANTS}
        >
          Hi {"username"}, <br></br> nice to meet you!
        </motion.h1>
        <motion.p
          className="max-w-md text-gray-200 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          Just a few more questions...
        </motion.p>

        <motion.div
          className="max-w-md text-gray-200 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          <motion.p
            className="max-w-md text-gray-200 transition-colors sm:text-lg mb-1"
            variants={STAGGER_CHILD_VARIANTS}
          >
            How much do you plan to spend per month?
          </motion.p>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex rounded-md shadow-sm">
              <div className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 text-white sm:text-sm">
                <select
                  id="currency"
                  name="currency"
                  className="focus:ring-gray-300 focus:border-gray-300 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-white sm:text-sm rounded-md"
                >
                  <option>SGD</option>
                  <option>MYR</option>
                  <option>USD</option>
                </select>
              </div>
              <input
                required
                type="number"
                min="0.01"
                name="amount"
                step=".01"
                placeholder="Monthly Budget"
                id="amount"
                className="flex-1 block w-full focus:ring-gray-300 focus:border-gray-300 min-w-0 rounded-none rounded-r-md sm:text-sm bg-transparent border-gray-300"
              />
            </div>
          </div>
        </motion.div>
        <motion.button
          variants={STAGGER_CHILD_VARIANTS}
          className="rounded  px-10 py-2 font-medium transition-colors text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-500"
          onClick={() =>
            router.push({
              pathname: "/intro2",
            })
          }
        >
          Start My Journey
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
