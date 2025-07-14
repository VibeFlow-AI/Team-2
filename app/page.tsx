import SampleView from "@/components/sample-view";
import { prisma } from "@/lib/prisma";

async function Home() {
  const samples = await prisma.sample.findMany();

  return <SampleView initialSamples={samples} />;
}

export default Home;
