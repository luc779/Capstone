import { z } from "zod"

export const taskSchema = z.object({
  VIN: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.string(),
  color: z.string(),
})

export type Task = z.infer<typeof taskSchema>
