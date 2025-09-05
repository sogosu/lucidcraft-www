# MCP Server Setup Guide

## Figma MCP Server

### Overview
The Figma MCP (Model Context Protocol) server enables Claude Code to directly access and generate code from Figma designs. This integration streamlines the design-to-code workflow by providing pixel-perfect implementations.

### Prerequisites
- **Figma Desktop App**: Must be installed and running
- **Claude Code**: Latest version with MCP support
- **Active Figma File**: The design file should be open in Figma

### Installation & Setup

#### 1. Add the Figma MCP Server
```bash
claude mcp add figma-dev-mode-mcp-server -s local
```

This command:
- Adds the server to your local project configuration
- Starts a local HTTP server on port 3845
- Creates a connection between Claude Code and Figma

#### 2. Verify Connection
```bash
claude mcp list
```

Expected output:
```
figma-dev-mode-mcp-server: http://127.0.0.1:3845/mcp (HTTP) - ✓ Connected
```

#### 3. Check Server Status
```bash
claude mcp get figma-dev-mode-mcp-server
```

This shows:
- Scope (local/global)
- Connection status
- Server URL
- Removal instructions

### Usage

#### Getting Code from Figma

1. **Using Node IDs from URLs**:
   - Copy a Figma URL: `https://figma.com/design/:fileKey/:fileName?node-id=123-456`
   - The node ID would be `123:456` (note the colon replacement)

2. **Using Selected Nodes**:
   - Select a component/frame in Figma desktop app
   - Claude Code will automatically use the selected node

3. **Available Commands**:
   - `get_code`: Generate UI code from designs
   - `get_variable_defs`: Extract design tokens and variables
   - `get_code_connect_map`: Get component mappings
   - `get_image`: Export images from nodes
   - `get_metadata`: Get structural information

### Troubleshooting

#### Server Not Connected
1. Ensure Figma desktop app is running
2. Restart the MCP server:
   ```bash
   claude mcp remove figma-dev-mode-mcp-server -s local
   claude mcp add figma-dev-mode-mcp-server -s local
   ```

#### Connection Timeout
- Check if port 3845 is available
- Verify no firewall blocking local connections
- Restart Figma and try again

#### No Design Access
- Ensure you have proper permissions for the Figma file
- File must be open in Figma desktop app
- Try selecting a specific node in Figma

### Best Practices

1. **Keep Figma Running**: The desktop app must remain open during development
2. **Use Specific Nodes**: Select specific components rather than entire pages
3. **Update Regularly**: Keep both Figma and Claude Code updated
4. **Local Scope**: Use `-s local` for project-specific configurations

### Project-Specific Setup

For the Lucidcraft website project:
1. Open the "Lucidcraft - Website" file in Figma
2. Ensure the MCP server is connected
3. Select design elements to generate code
4. Use visual regression tests to verify implementation

## Vercel MCP Server (Future)

### Overview
The Vercel MCP server will enable direct deployment and management of the production website.

### Setup (When Ready)
```bash
claude mcp add vercel-mcp-server
```

### Features
- Direct deployment from Claude Code
- Environment variable management
- Preview deployments
- Production deployment control

### Prerequisites
- Vercel account with proper permissions
- Project linked to Vercel
- API tokens configured

## Additional MCP Servers

Other useful MCP servers can be added as needed:
- Database servers for data management
- API servers for backend integration
- Testing servers for automated validation

## Resources

- [Claude Code MCP Documentation](https://docs.anthropic.com/claude-code/mcp)
- [Figma Dev Mode](https://www.figma.com/dev-mode/)
- [Vercel Documentation](https://vercel.com/docs)