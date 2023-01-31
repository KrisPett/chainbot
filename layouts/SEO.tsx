import Head from "next/head";
import {useRouter} from "next/router";

interface ICommonSEO {
  title: string
  description: string
}
const CommonSEO = ({ title, description }: ICommonSEO) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  )
}

export const PageSEO = ({ title, description }: ICommonSEO) => {
  return (
    <CommonSEO
      title={title}
      description={description}
    />
  )
}
