
import { connectToDatabase } from "@/lib/database/connect";
export default async function Home() {
  const connected = await connectToDatabase()

  return (
    <div className="">
      khalid
      </div>
  );
}
