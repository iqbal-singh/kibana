import type { NextPage } from "next";
import  Link  from "next/link";
const Home: NextPage = () => {
  return <div>home <Link href="/discover"><a>Discover</a></Link></div>;
};

export default Home;
