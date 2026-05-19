import simpleGit from 'simple-git'
import { join } from 'path'
import { app } from 'electron'

export interface GitEntry {
  hash: string
  date: string
  message: string
  author: string
  body: string
}

export async function getGitLog(): Promise<GitEntry[]> {
  try {
    const repoPath = join(app.getAppPath(), '..')
    const git = simpleGit(repoPath)
    const log = await git.log({ maxCount: 30 })
    return log.all.map((entry) => ({
      hash: entry.hash.slice(0, 7),
      date: entry.date.slice(0, 10),
      message: entry.message,
      author: entry.author_name,
      body: entry.body?.trim() ?? ''
    }))
  } catch {
    return []
  }
}
