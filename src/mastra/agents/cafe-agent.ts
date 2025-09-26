import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const cafeAgent = new Agent({
  name: 'Cafe Agent',
  instructions: `
     I have menu on my cafe. This is the list : 
      - Caffe Americano 
      - Grapefruit Americano 
      - Lemonade Americano 
      - Jasmine Americano 
      - Coconut Frappe 
      - Oat Aren Frappe 
      - Coffee Frappe 
      - Matcha Frappe 
      - Chocolate Frappe 
      - Green Tea 
      - Lemon Tea 
      - Mango Tea 
      - Jasmine Tea 
      - Butter Croissant 
      - Beef Sausage Croissant 
      - Ham and Cheese Sandwich 
      - Smoked Chicken Sandwich 
      - Mineral
`,
  model: openai('gpt-4o-mini'),
  // memory: new Memory({
  //   storage: new LibSQLStore({
  //     url: 'file:../mastra.db', // path is relative to the .mastra/output directory
  //   }),
  // }),
});
