# local-knowledge-mcp ![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

[中文版 README](README.zh-CN.md)
A local MCP server for storing and managing markdown knowledge files, providing CRUD operations through the Model Context Protocol (MCP) interface.

## Features

- Create, read, update and delete markdown files
- List all available markdown documents
- TypeScript implementation with strong typing
- Manually specify the Markdown knowledge base directory path, supporting different knowledge base directories for different projects

## Prerequisites

- Node.js >= 18
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Johnny-Guuuuu/local-knowledge-mcp.git
cd local-knowledge-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Configuration

Add this configuration to your Roo Code "Global MCP" settings (mcp_settings.json):

```json
{
  "mcpServers": {
    "local-knowledge": {
      "command": "node",
      "args": [
        "/absolute/path/to/your/local-knowledge-mcp/dist/server.js",
        "-e",
        "/absolute/path/to/your/markdown/knowledge-base"
      ]
    }
  }
}
```

## Usage

After configuration, you can add "use local-knowledge" into your prompt. prompt example:

```markdown
How to install local-knowledge-mcp? use local-knowledge
```

## API Reference

The server provides these MCP tools:

### `markdown.create`

Create a new markdown file

**Parameters:**

- `id`: File path/identifier
- `content`: Markdown content

### `markdown.read`

Read a markdown file

**Parameters:**

- `id`: File path/identifier

### `markdown.update`

Update a markdown file

**Parameters:**

- `id`: File path/identifier
- `content`: New markdown content

### `markdown.delete`

Delete a markdown file

**Parameters:**

- `id`: File path/identifier

### `markdown.list`

List all markdown files

## Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
