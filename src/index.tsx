import { Elysia, t } from "elysia";
import OpenAI from "openai";
import { AssistantCreateParams } from "openai/resources/beta/assistants/assistants";
import { html } from "@elysiajs/html";
import { BaseHtml } from "./baseHTML";
import { RunCreateParams } from "openai/resources/beta/threads/runs/runs";
import { MessageCreateParams } from "openai/resources/beta/threads/messages/messages";

const client = new OpenAI();
const model = "gpt-3.5-turbo-16k";
const instructions =
  "Ti si AstroNelinda, srpkinja koja priča samo srpskim jezikom, osim informacija o citanju natalnih karata ne odgovaras na ostala pitanja, ukoliko te neko pita nesto drugi ti odgovaras da nisi upoznata sa informacijama koje nisu vezane za citanje natalnih karata." +
  "AstroNelinda je osoba koja se izdvojila kao majstor u čitanju natalnih karata. Sa dugogodišnjim iskustvom i predanošću, AstroNelinda je prošla kroz raznovrsne knjige o astrologiji i natalnim kartama, duboko prodirući u tajne svakog simbola, planeta i kuća." +
  'Počela je svoje putovanje čitanja karata čitajući klasična dela kao što su "Ptolemejeva Tetrabiblos" i "The Only Way to Learn Astrology" od Marion D. March i Joan McEvers.' +
  "Njeno iskustvo se proteže i na savremene izvore, uključujući dela renomiranih astrologa poput Liz Greene i Robert Hand.AstroNelinda nije samo ekspert u interpretaciji natalnih karata, već je i proučavala različite metode, kao što su progresije i tranziti, kako bi dobila sveobuhvatan uvid u životne puteve svojih klijenata. Njeno duboko razumevanje simbolike omogućava joj da ne samo predviđa događaje, već i da pruži dublje razumevanje ličnosti, unutarnjih izazova i potencijala. Njen pristup je pažljiv, empatičan i prilagođen, stvarajući prostor za osvjetljavanje dubokih aspekata ljudskog iskustva.";
const name = "AstroNelinda";

// const astroNelinda = await client.beta.assistants.create(
//   {
//     name,
//     model,
//     instructions,
//   } as AssistantCreateParams,
//   {}
// );
// console.log("Nesto: ", astroNelinda.id);
// const thread = await client.beta.threads.create({
//   messages: [
//     {
//       role: "user",
//       content: "Natalna karta",
//     },
//   ],
// });
// console.log("Thread ad je: ", thread.id);

const astroNelinda = "asst_lFjhTa0hP2OlzsFOflwZAaNR";
const nelindaThread = "thread_hYOQkpRjXqzoLhfvr3kxj2LQ";

// const run = await client.beta.threads.runs.create(nelindaThread, {
//   assistant_id: astroNelinda,
// } as RunCreateParams);
// console.log("Run id je: ", run.id);
const app = new Elysia()
  .use(html())
  .get("/nelinda", async () => {
    // const content: String =
    // console.log("COntent je: ", content);
    return <BaseHtml />;
  })
  .post(
    "/ask",
    async ({ body: { question } }) => {
      const messageProba = await client.beta.threads.messages.create(
        nelindaThread,
        {
          content: question,
          role: "user",
        } as MessageCreateParams
      );
      console.log("Message proba123: ", messageProba);
      var run = await client.beta.threads.runs.create(nelindaThread, {
        assistant_id: astroNelinda,
      } as RunCreateParams);

      var message = null;
      while (true) {
        console.log("Run je: ", run.completed_at);
        run = await client.beta.threads.runs.retrieve(nelindaThread, run.id);
        if (run.completed_at) {
          message = await client.beta.threads.messages.list(nelindaThread);
          break;
        }
      }
      console.log("Message je: ", message);
      console.log("Message je: ");
      return `<div>${message?.data[0].content[0]?.text.value}</div>`;
    },
    {
      body: t.Object({
        question: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
