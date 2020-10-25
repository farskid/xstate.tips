// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllExamples } from "../../examples";

export default (_, res) => {
  res.status(200).json({
    examples: getAllExamples(),
  });
};
