import { useRouter } from "next/router";
import { motion } from "framer-motion";

const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function Intro() {
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
          Welcome to{" "}
          <span className="font-bold tracking-tighter">FinForce</span>
        </motion.h1>
        <motion.p
          className="max-w-md text-gray-200 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          The all in one budgetting app you'll ever need
        </motion.p>

        <motion.div
          className="max-w-md text-gray-200 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          <motion.p
            className="max-w-md text-gray-200 transition-colors sm:text-lg mb-1"
            variants={STAGGER_CHILD_VARIANTS}
          >
            What should we call you?
          </motion.p>
          <div className="pl-3 flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              placeholder="username"
              className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
            />
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
          Let's Go
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
