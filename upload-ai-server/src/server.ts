import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { getAllPromptsRoute } from "./routes/get-all-prompts"
import { uploadVideoRoute } from "./routes/upload-video"
import { createTranscriptionRoute } from "./routes/create-transcription"
import { generateIATranscriptionRoute } from "./routes/generate-ai-completion"
import { deleteVideoRoute } from "./routes/delete-video"

const port = 3333
const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateIATranscriptionRoute)
app.register(deleteVideoRoute)

app.get("/", () => {
  return "Hello World!"
})

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`HTTP server running on port ${port}! 🚀`)
  })
