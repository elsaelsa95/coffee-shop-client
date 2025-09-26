"use server";
 
import { mastra } from "../mastra";
 
// export async function getWeatherInfo(formData: FormData) {
//   const city = formData.get("city")?.toString();
//   const agent = mastra.getAgent("weatherAgent");
 
//   const result = await agent.generate(`What's the weather like in ${city}?`);
 
//   return result.text;
// }

export async function getCafeRecomendation(need: string) {
  const agent = mastra.getAgent("cafeAgent");
 
  const result = await agent.generate(`My current need is ${need}. Please provide menu recommendations from my cafe menu that suit my needs. Please explain the reason`);
 
  return result.text;
}