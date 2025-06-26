import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { MarkdownRepository } from "./common/utils";
import minimist from "minimist";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Parse command line arguments
const args = minimist(process.argv.slice(2));
const markdownDir = args.e || "./markdown";

// Markdown tools
const markdownTools = {
  create: {
    title: "Create Markdown",
    description: "Create a new markdown file",
    inputSchema: {
      id: z.string().describe("File ID"),
      content: z.string().describe("Markdown content")
    }
  },
  list: {
    title: "List Markdowns",
    description: "List all markdown files",
    inputSchema: {}
  },
  read: {
    title: "Read Markdown",
    description: "Read a markdown file",
    inputSchema: {
      id: z.string().describe("File ID")
    }
  },
  update: {
    title: "Update Markdown",
    description: "Update a markdown file",
    inputSchema: {
      id: z.string().describe("File ID"),
      content: z.string().describe("New markdown content")
    }
  },
  delete: {
    title: "Delete Markdown",
    description: "Delete a markdown file",
    inputSchema: {
      id: z.string().describe("File ID")
    }
  }
};

// Register markdown tools
server.registerTool("markdown.create", markdownTools.create,
  async ({ id, content }) => {
    const repo = new MarkdownRepository(markdownDir);
    const result = await repo.createMarkdown(id, content);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

server.registerTool("markdown.read", markdownTools.read,
  async ({ id }) => {
    const repo = new MarkdownRepository(markdownDir);
    const result = await repo.readMarkdown(id);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

server.registerTool("markdown.update", markdownTools.update,
  async ({ id, content }) => {
    const repo = new MarkdownRepository(markdownDir);
    const result = await repo.updateMarkdown(id, content);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

server.registerTool("markdown.delete", markdownTools.delete,
  async ({ id }) => {
    const repo = new MarkdownRepository(markdownDir);
    const result = await repo.deleteMarkdown(id);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

// Register markdown list tool
server.registerTool("markdown.list", markdownTools.list,
  async () => {
    const repo = new MarkdownRepository(markdownDir);
    const result = await repo.listMarkdowns();
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
  console.log('MCP Server start successfully!')
})().catch(console.error);