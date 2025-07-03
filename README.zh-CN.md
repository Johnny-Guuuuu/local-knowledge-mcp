# local-knowledge-mcp ![Node 版本](https://img.shields.io/badge/node-%3E%3D18-brightgreen) ![许可证](https://img.shields.io/badge/license-MIT-blue)

一个本地 MCP 服务器，用于存储和管理 Markdown 知识文件，通过 Model Context Protocol (MCP) 接口提供 CRUD 操作。

## 功能特性

- 创建、读取、更新和删除 Markdown 文件
- 列出所有可用的 Markdown 文档
- 使用 TypeScript 实现，具有强类型支持
- 可手动指定 Markdown 知识库目录路径，支持为不同项目使用不同的知识库目录

## 先决条件

- Node.js >= 18
- npm 或 yarn

## 安装

1. 克隆仓库：

```bash
git clone https://github.com/Johnny-Guuuuu/local-knowledge-mcp.git
cd local-knowledge-mcp
```

2. 安装依赖：

```bash
npm install
```

3. 构建项目：

```bash
npm run build
```

## 配置

将以下配置添加到你的 Roo Code "Global MCP" 设置中 (mcp_settings.json):

```json
{
  "mcpServers": {
    "local-knowledge": {
      "command": "node",
      "args": [
        "/local-knowledge-map仓库的绝对路径/local-knowledge-mcp/dist/server.js",
        "-e",
        "/你的 Markdown 知识库目录的绝对路径"
      ]
    }
  }
}
```

## 使用方式

配置完成后，你可以在提示中添加 "use local-knowledge", prompt 示例:

```markdown
如何安装 local-knowledge-mcp? use local-knowledge
```

## API 参考

服务器提供以下 MCP 工具：

### `markdown.create`

创建一个新的 Markdown 文件

**参数:**

- `id`: 文件路径/标识符
- `content`: Markdown 内容

### `markdown.read`

读取一个 Markdown 文件

**参数:**

- `id`: 文件路径/标识符

### `markdown.update`

更新一个 Markdown 文件

**参数:**

- `id`: 文件路径/标识符
- `content`: 新的 Markdown 内容

### `markdown.delete`

删除一个 Markdown 文件

**参数:**

- `id`: 文件路径/标识符

### `markdown.list`

列出所有 Markdown 文件

## 开发

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build
```

## 贡献

欢迎贡献！请提交 issue 或 pull request。

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。
