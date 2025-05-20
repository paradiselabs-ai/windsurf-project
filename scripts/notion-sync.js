#!/usr/bin/env node

/**
 * Notion to Astro Sync Script
 * 
 * This script fetches content from a Notion database and converts it to Markdown files
 * for an Astro blog. It handles both blog posts and technical articles.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// Get Database ID from environment variable or use a default for development
const DATABASE_ID = process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID_HERE';

// Check if database ID is set
if (DATABASE_ID === 'YOUR_DATABASE_ID_HERE') {
  console.warn('Warning: NOTION_DATABASE_ID environment variable not set. Please set it before running in production.');
}

// Paths for content
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');

/**
 * Ensures the content directories exist
 */
async function ensureDirectories() {
  try {
    if (!fs.existsSync(POSTS_DIR)) {
      await mkdirAsync(POSTS_DIR, { recursive: true });
      console.log(`Created directory: ${POSTS_DIR}`);
    }
    
    if (!fs.existsSync(ARTICLES_DIR)) {
      await mkdirAsync(ARTICLES_DIR, { recursive: true });
      console.log(`Created directory: ${ARTICLES_DIR}`);
    }
  } catch (error) {
    console.error('Error creating directories:', error);
    throw error;
  }
}

/**
 * Queries the Notion database for content
 */
async function fetchNotionContent() {
  try {
    // Prepare the command based on environment
    let command;
    
    // In GitHub Actions, we need to set the authorization header
    if (process.env.GITHUB_ACTIONS) {
      const notionApiKey = process.env.NOTION_API_KEY;
      if (!notionApiKey) {
        throw new Error('NOTION_API_KEY environment variable is required when running in GitHub Actions');
      }
      
      command = `npx -y @notionhq/notion-mcp-server API-post-database-query --database_id="${DATABASE_ID}" --filter='{"and":[{"property":"Status","select":{"equals":"Ready to Publish"}}]}' --headers='{"Authorization":"Bearer ${notionApiKey}", "Notion-Version":"2022-06-28"}'`;
    } else {
      // Local environment - using the Notion MCP server which already has auth configured
      command = `npx -y @notionhq/notion-mcp-server API-post-database-query --database_id="${DATABASE_ID}" --filter='{"and":[{"property":"Status","select":{"equals":"Ready to Publish"}}]}'`;
    }
    
    const result = execSync(command, { encoding: 'utf-8' });
    return JSON.parse(result);
  } catch (error) {
    console.error('Error fetching content from Notion:', error);
    throw error;
  }
}

/**
 * Helper function to build command with proper authentication
 */
function buildNotionCommand(baseCommand) {
  if (process.env.GITHUB_ACTIONS) {
    const notionApiKey = process.env.NOTION_API_KEY;
    if (!notionApiKey) {
      throw new Error('NOTION_API_KEY environment variable is required when running in GitHub Actions');
    }
    return `${baseCommand} --headers='{"Authorization":"Bearer ${notionApiKey}", "Notion-Version":"2022-06-28"}'`;
  }
  return baseCommand;
}

/**
 * Fetches the content of a Notion page
 */
async function fetchPageContent(pageId) {
  try {
    // Get page properties
    const pageCommand = buildNotionCommand(`npx -y @notionhq/notion-mcp-server API-retrieve-a-page --page_id="${pageId}"`);
    const pageResult = execSync(pageCommand, { encoding: 'utf-8' });
    const page = JSON.parse(pageResult);
    
    // Get page blocks (content)
    const blocksCommand = buildNotionCommand(`npx -y @notionhq/notion-mcp-server API-get-block-children --block_id="${pageId}" --page_size=100`);
    const blocksResult = execSync(blocksCommand, { encoding: 'utf-8' });
    const blocks = JSON.parse(blocksResult);
    
    return { page, blocks };
  } catch (error) {
    console.error(`Error fetching page content for ${pageId}:`, error);
    throw error;
  }
}

/**
 * Converts Notion blocks to Markdown
 */
function convertBlocksToMarkdown(blocks) {
  let markdown = '';
  
  for (const block of blocks.results) {
    switch (block.type) {
      case 'paragraph':
        if (block.paragraph.rich_text.length > 0) {
          const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
          markdown += `${text}\n\n`;
        } else {
          markdown += '\n';
        }
        break;
        
      case 'heading_1':
        if (block.heading_1.rich_text.length > 0) {
          const text = block.heading_1.rich_text.map(t => t.plain_text).join('');
          markdown += `# ${text}\n\n`;
        }
        break;
        
      case 'heading_2':
        if (block.heading_2.rich_text.length > 0) {
          const text = block.heading_2.rich_text.map(t => t.plain_text).join('');
          markdown += `## ${text}\n\n`;
        }
        break;
        
      case 'heading_3':
        if (block.heading_3.rich_text.length > 0) {
          const text = block.heading_3.rich_text.map(t => t.plain_text).join('');
          markdown += `### ${text}\n\n`;
        }
        break;
        
      case 'bulleted_list_item':
        if (block.bulleted_list_item.rich_text.length > 0) {
          const text = block.bulleted_list_item.rich_text.map(t => t.plain_text).join('');
          markdown += `- ${text}\n`;
        }
        break;
        
      case 'numbered_list_item':
        if (block.numbered_list_item.rich_text.length > 0) {
          const text = block.numbered_list_item.rich_text.map(t => t.plain_text).join('');
          markdown += `1. ${text}\n`;
        }
        break;
        
      case 'code':
        if (block.code.rich_text.length > 0) {
          const text = block.code.rich_text.map(t => t.plain_text).join('');
          const language = block.code.language || '';
          markdown += `\`\`\`${language}\n${text}\n\`\`\`\n\n`;
        }
        break;
        
      case 'quote':
        if (block.quote.rich_text.length > 0) {
          const text = block.quote.rich_text.map(t => t.plain_text).join('');
          markdown += `> ${text}\n\n`;
        }
        break;
        
      case 'image':
        if (block.image.type === 'external') {
          markdown += `![Image](${block.image.external.url})\n\n`;
        } else if (block.image.type === 'file') {
          markdown += `![Image](${block.image.file.url})\n\n`;
        }
        break;
        
      // Add more block types as needed
        
      default:
        // For unsupported block types
        markdown += `<!-- Unsupported block type: ${block.type} -->\n\n`;
    }
  }
  
  return markdown;
}

/**
 * Extracts frontmatter from page properties
 */
function extractFrontmatter(page) {
  const properties = page.properties;
  const frontmatter = {};
  
  // Extract title
  if (properties.Title && properties.Title.title.length > 0) {
    frontmatter.title = properties.Title.title[0].plain_text;
  }
  
  // Extract description
  if (properties.Description && properties.Description.rich_text.length > 0) {
    frontmatter.description = properties.Description.rich_text[0].plain_text;
  }
  
  // Extract publication date
  if (properties['Publication Date'] && properties['Publication Date'].date) {
    frontmatter.date = properties['Publication Date'].date.start;
  }
  
  // Extract last updated date
  if (properties['Last Updated'] && properties['Last Updated'].date) {
    frontmatter.updated = properties['Last Updated'].date.start;
  }
  
  // Extract author
  if (properties.Author && properties.Author.rich_text.length > 0) {
    frontmatter.author = properties.Author.rich_text[0].plain_text;
  }
  
  // Extract tags
  if (properties.Tags && properties.Tags.multi_select) {
    frontmatter.tags = properties.Tags.multi_select.map(tag => tag.name);
  }
  
  // Extract featured image
  if (properties['Featured Image'] && properties['Featured Image'].url) {
    frontmatter.image = properties['Featured Image'].url;
  }
  
  // Extract draft status
  if (properties.Draft && properties.Draft.checkbox !== undefined) {
    frontmatter.draft = properties.Draft.checkbox;
  }
  
  // Extract slug
  if (properties.Slug && properties.Slug.rich_text.length > 0) {
    frontmatter.slug = properties.Slug.rich_text[0].plain_text;
  } else if (frontmatter.title) {
    // Generate slug from title if not provided
    frontmatter.slug = frontmatter.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }
  
  return frontmatter;
}

/**
 * Creates a Markdown file with frontmatter
 */
function createMarkdownWithFrontmatter(frontmatter, content) {
  let markdown = '---\n';
  
  // Add each frontmatter property
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      markdown += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
    } else if (typeof value === 'string') {
      markdown += `${key}: "${value}"\n`;
    } else {
      markdown += `${key}: ${value}\n`;
    }
  }
  
  markdown += '---\n\n';
  markdown += content;
  
  return markdown;
}

/**
 * Saves content to the appropriate directory
 */
async function saveContent(contentType, slug, markdown) {
  try {
    const directory = contentType === 'Blog Post' ? POSTS_DIR : ARTICLES_DIR;
    const filePath = path.join(directory, `${slug}.md`);
    
    await writeFileAsync(filePath, markdown, 'utf-8');
    console.log(`Saved: ${filePath}`);
    
    return filePath;
  } catch (error) {
    console.error(`Error saving content for ${slug}:`, error);
    throw error;
  }
}

/**
 * Updates the page status in Notion
 */
async function updatePageStatus(pageId) {
  try {
    const command = buildNotionCommand(`npx -y @notionhq/notion-mcp-server API-patch-page --page_id="${pageId}" --properties='{"Status":{"select":{"name":"Published"}}}'`);
    execSync(command, { encoding: 'utf-8' });
    console.log(`Updated status for page ${pageId} to Published`);
  } catch (error) {
    console.error(`Error updating status for page ${pageId}:`, error);
    throw error;
  }
}

/**
 * Main function to sync content
 */
async function syncContent() {
  try {
    console.log('Starting Notion to Astro sync...');
    
    // Ensure content directories exist
    await ensureDirectories();
    
    // Fetch content from Notion
    const database = await fetchNotionContent();
    console.log(`Found ${database.results.length} items to sync`);
    
    // Process each page
    for (const page of database.results) {
      const pageId = page.id;
      console.log(`Processing page: ${pageId}`);
      
      // Fetch page content
      const { page: pageData, blocks } = await fetchPageContent(pageId);
      
      // Extract content type
      const contentType = pageData.properties['Content Type'].select.name;
      
      // Extract frontmatter
      const frontmatter = extractFrontmatter(pageData);
      
      // Convert blocks to markdown
      const content = convertBlocksToMarkdown(blocks);
      
      // Create markdown with frontmatter
      const markdown = createMarkdownWithFrontmatter(frontmatter, content);
      
      // Save content to file
      await saveContent(contentType, frontmatter.slug, markdown);
      
      // Update page status in Notion
      await updatePageStatus(pageId);
    }
    
    console.log('Sync completed successfully!');
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

// Run the sync
syncContent();
