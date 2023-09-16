import { FastifyInstance } from "fastify"
import { z } from "zod"
import path from "node:path"
import fs from "node:fs"
import { pipeline } from "node:stream"
import { promisify } from "node:util"
import { prisma } from "../lib/prisma"

const pump = promisify(pipeline)

export async function deleteVideoRoute(app: FastifyInstance) {
  app.delete("/videos/:videoId", async (request, reply) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    })

    const { videoId } = paramsSchema.parse(request.params)

    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    })

    if (!video) return reply.status(404).send({ error: "Video not found." })

    fs.unlinkSync(video.path)

    const result = await prisma.video.delete({
      where: {
        id: videoId,
      },
    })

    if (!result)
      return reply
        .status(400)
        .send({ error: "Error when deleting file from database." })

    return { result }
  })
}
