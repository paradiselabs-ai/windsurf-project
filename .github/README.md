# GitHub Actions for Notion to Astro Sync

This directory contains GitHub Actions workflows that automate the process of syncing content from Notion to your Astro blog.

## Notion Sync Workflow

The `notion-sync.yml` workflow automatically fetches content from your Notion database and converts it to Markdown files for your Astro blog. This workflow:

1. Runs automatically every 6 hours
2. Can be triggered manually from the Actions tab in GitHub
3. Fetches content with status "Ready to Publish" from your Notion database
4. Converts it to Markdown with proper frontmatter
5. Commits the changes to your repository, which triggers a Vercel deployment

## Setup Instructions

To set up the GitHub Actions workflow, you need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:

### NOTION_DATABASE_ID

This is the ID of your Notion database. You can find it in the URL of your database:
`https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`

### NOTION_API_KEY

This is your Notion API key. To get one:

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "Create new integration"
3. Give it a name (e.g., "Blog Sync")
4. Select the workspace where your database is located
5. Set the capabilities (at minimum, it needs read content and read/update database access)
6. Click "Submit"
7. Copy the "Internal Integration Token" - this is your NOTION_API_KEY

After creating the integration, you need to share your database with it:

1. Go to your database in Notion
2. Click the "..." menu in the top right
3. Click "Add connections"
4. Find and select your integration

## Manual Trigger

You can manually trigger the sync workflow:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Notion Content Sync" workflow
3. Click "Run workflow"
4. Click the green "Run workflow" button

This is useful when you want to immediately publish content without waiting for the scheduled run.

## Workflow Customization

You can customize the workflow by editing the `.github/workflows/notion-sync.yml` file:

- Change the schedule by modifying the `cron` expression
- Adjust the Node.js version if needed
- Modify the commit message or other git operations

The default schedule runs every 6 hours, which is a good balance between timely updates and not hitting GitHub's rate limits.
