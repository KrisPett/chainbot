import {NextApiRequest, NextApiResponse} from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sourceUrl = 'https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/img-6NqPdljBP8Xld09w48lcJELw.png';

  try {

    fetch(sourceUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        res.setHeader('Content-Disposition', `attachment; filename=${blob.type}`);
        res.setHeader('Content-Type', blob.type);
        res.setHeader('Content-Length', blob.size.toString());
        res.send(url)
      });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export default handler;
