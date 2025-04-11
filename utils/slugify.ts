export default function slugifyFilename(filename: string): string {
  // Check if the filename has an extension, if not, add a default one
  const match = filename.match(/^(.*?)(\.[a-zA-Z0-9]+)?$/) // Match filename and optional extension

  if (!match) {
    console.error('Filename format is invalid:', filename)
    throw new Error('Invalid filename format')
  }

  const [_, name, extension] = match

  // If no extension is found, use a default one like ".mp4"
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const finalExtension = extension || '.mp4'

  // Slugify the name by replacing spaces/underscores with dashes and removing invalid characters
  const slug = name
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with dashes
    .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters (except dashes)
    .replace(/--+/g, '-') // Collapse multiple dashes
    .replace(/^-+|-+$/g, '') // Trim leading/trailing dashes

  const newFilename = `${slug}` // Ensure extension is in lowercase

  return newFilename
}
