import { promises as fs } from 'fs';
import path from 'path';

function isFsError(err: unknown): err is { code: string } & Error {
  return err instanceof Error && 'code' in err;
}

interface MarkdownFile {
  id: string;
  content: string;
  metadata?: any;
}

export class MarkdownRepository {
  private dirPath: string;

  constructor(dirPath: string) {
    this.dirPath = dirPath;
  }

  private getFilePath(id: string): string {
    return path.join(this.dirPath, `${id}.md`);
  }

  async createMarkdown(id: string, content: string, metadata?: any): Promise<MarkdownFile> {
    const filePath = this.getFilePath(id);
    try {
      await fs.writeFile(filePath, content);
      return { id, content, metadata };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Failed to create markdown: ${err.message}`);
      }
      throw new Error('Failed to create markdown: Unknown error');
    }
  }

  async readMarkdown(id: string): Promise<MarkdownFile | null> {
    const filePath = this.getFilePath(id);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return { id, content };
    } catch (err) {
      if (isFsError(err) && err.code === 'ENOENT') return null;
      if (err instanceof Error) {
        throw new Error(`Failed to read markdown: ${err.message}`);
      }
      throw new Error('Failed to read markdown: Unknown error');
    }
  }

  async deleteMarkdown(id: string): Promise<boolean> {
    const filePath = this.getFilePath(id);
    try {
      await fs.unlink(filePath);
      return true;
    } catch (err) {
      if (isFsError(err) && err.code === 'ENOENT') return false;
      if (err instanceof Error) {
        throw new Error(`Failed to delete markdown: ${err.message}`);
      }
      throw new Error('Failed to delete markdown: Unknown error');
    }
  }

  async updateMarkdown(id: string, newContent: string, metadata?: any): Promise<MarkdownFile | null> {
    const existing = await this.readMarkdown(id);
    if (!existing) return null;

    await this.deleteMarkdown(id);
    return this.createMarkdown(id, newContent, metadata);
  }

  async listMarkdowns(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.dirPath);
      return files.filter(file => file.endsWith('.md'))
        .map(file => file.replace(/\.md$/, ''));
    } catch (err) {
      if (isFsError(err) && err.code === 'ENOENT') return [];
      if (err instanceof Error) {
        throw new Error(`Failed to list markdowns: ${err.message}`);
      }
      throw new Error('Failed to list markdowns: Unknown error');
    }

  }
}