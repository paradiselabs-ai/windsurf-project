# Notion to Astro Sync

This directory contains scripts to sync content from Notion to your Astro blog. The sync mechanism pulls content from your Notion database and converts it to Markdown files for your blog.

## Setup

1. **Set Environment Variables**: Create or update your `.env` file with your Notion database ID:

   ```env
   NOTION_DATABASE_ID=your_database_id_here
   ```

   You can find your database ID in the URL of your Notion database:
   `https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`

   The Notion API token is already configured in your Notion MCP server.

2. **Verify Content Directories**: The script assumes your content is organized in the following directories:

   - Blog posts: `src/content/posts`
   - Articles: `src/content/articles`

   If your content structure is different, update the paths in `notion-sync.js`.

## Usage

### Manual Sync

Run the sync script manually whenever you want to publish new content:

```bash
./scripts/sync-notion.sh
```

This will:
1. Fetch all pages with status "Ready to Publish" from your Notion database
2. Convert them to Markdown with proper frontmatter
3. Save them to the appropriate content directory
4. Update their status to "Published" in Notion

### Automated Sync

You can set up a cron job to run the sync script automatically:

```bash
# Run sync every day at midnight
0 0 * * * cd /path/to/your/project && ./scripts/sync-notion.sh >> /path/to/logfile.log 2>&1
```


## Workflow

1. **Draft in Notion**: Create new content in your Notion database
2. **Refine with Notion AI**: Use Notion AI to polish your content
3. **Mark as Ready**: Change the status to "Ready to Publish"
4. **Sync**: Run the sync script
5. **Deploy**: Build and deploy your site

## Troubleshooting

- **Authentication Issues**: Make sure your Notion API key is set up correctly in your environment
- **Missing Content**: Check that your page has all required properties and the status is set to "Ready to Publish"
- **Formatting Issues**: The script handles basic Notion blocks, but complex formatting might need manual adjustments

## Extending

The script currently handles the following Notion block types:

- Paragraphs
- Headings (H1, H2, H3)
- Bulleted lists
- Numbered lists
- Code blocks
- Quotes
- Images

To add support for more block types, modify the `convertBlocksToMarkdown` function in `notion-sync.js`.
