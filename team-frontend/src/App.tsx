import { Layout } from "./layout";
import { a } from "./lib/api/axios";

export default function App(){
  console.log(import.meta.env);
  console.log(a)
  return <>
    <h1 className="font-inter font-semibold">Lumin</h1>
    <Layout/>
  </>
}