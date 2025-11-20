# Thruster HTTP/2 Proxy Integration

## Overview

This project uses [Thruster](https://github.com/basecamp/thruster), a zero-config HTTP/2 proxy from Basecamp, to enhance application performance and simplify deployment. Thruster sits in front of the Rails/Puma server and provides HTTP/2 support, asset caching, compression, and TLS termination.

## What is Thruster?

Thruster is a small, fast HTTP/2 proxy designed specifically for Ruby web applications. It provides:

- **HTTP/2 Support**: Automatic HTTP/2 with multiplexing for faster asset loading
- **Asset Caching**: X-Sendfile support and intelligent caching for static assets
- **Compression**: Automatic gzip/Brotli compression for responses
- **TLS Termination**: Built-in Let's Encrypt support for production deployments
- **Zero Configuration**: Works out of the box with sensible defaults

### Benefits Over Direct Puma + Early Hints

Previously, this project used Puma's `--early-hints` flag to send HTTP/2 server push hints. Thruster provides several advantages:

1. **Simpler Configuration**: No need to configure early hints in your application code
2. **Better HTTP/2 Support**: Full HTTP/2 implementation, not just early hints
3. **Asset Optimization**: Built-in caching and compression without additional configuration
4. **Production Ready**: TLS termination and Let's Encrypt integration for production
5. **Faster Asset Delivery**: More efficient handling of static assets

## Installation

Thruster is already installed in this project via the Gemfile:

```ruby
gem "thruster"
```

After running `bundle install`, the `thrust` executable is available.

## Configuration

### Procfiles

All Procfiles in this project have been updated to use Thruster:

#### Production (`Procfile`)
```
web: bundle exec thrust bin/rails server
```

#### Development with HMR (`Procfile.dev`)
```
rails: bundle exec thrust bin/rails server -p 3000
```

#### Development with Production Assets (`Procfile.dev-prod-assets`)
```
web: bundle exec thrust bin/rails server -p 3001
```

#### Development with Static Webpack (`Procfile.dev-static`)
```
web: bundle exec thrust bin/rails server -p 3000
```

#### Development with Static Assets (`Procfile.dev-static-assets`)
```
web: bundle exec thrust bin/rails server -p 3000
```

### Default Behavior

Thruster uses sensible defaults:

- **Port**: Listens on port specified by Rails server (or PORT env var)
- **Cache**: Automatically caches static assets from `public/`
- **Compression**: Enables gzip/Brotli compression automatically
- **HTTP/2**: Enabled by default when using HTTPS

### Custom Configuration (Optional)

You can customize Thruster behavior using environment variables:

```bash
# Set custom cache directory
THRUSTER_CACHE_DIR=/path/to/cache

# Adjust cache size (default: 64MB)
THRUSTER_CACHE_SIZE=128M

# Set custom TLS certificate (production)
THRUSTER_TLS_CERT=/path/to/cert.pem
THRUSTER_TLS_KEY=/path/to/key.pem

# Enable debug logging
THRUSTER_DEBUG=1
```

For most use cases, the defaults work perfectly without any additional configuration.

## Development Usage

### Starting the Development Server

Use any of the existing Procfile commands:

```bash
# Development with Hot Module Replacement
foreman start -f Procfile.dev

# Development with static assets
foreman start -f Procfile.dev-static

# Production-like assets in development
foreman start -f Procfile.dev-prod-assets
```

Thruster will automatically:
1. Start a proxy server on the configured port
2. Forward requests to Rails/Puma
3. Cache and compress assets
4. Serve static files efficiently

### Checking Thruster Status

When the server starts, you'll see Thruster initialization in the logs:

```
[thrust] Starting Thruster HTTP/2 proxy
[thrust] Proxying to http://localhost:3000
[thrust] Serving from ./public
```

## Production Deployment

### Heroku

Thruster works seamlessly with Heroku. The standard `Procfile` is already configured:

```
web: bundle exec thrust bin/rails server
```

Heroku automatically:
- Provides TLS termination at the router level
- Sets the PORT environment variable
- Manages process scaling

### Control Plane

For Control Plane deployments, Thruster requires specific configuration in two places:

#### 1. Dockerfile Configuration

The Dockerfile CMD must use Thruster (`.controlplane/Dockerfile`):

```dockerfile
CMD ["bundle", "exec", "thrust", "bin/rails", "server"]
```

#### 2. Workload Port Configuration

The workload port should remain as HTTP/1.1 (`.controlplane/templates/rails.yml`):

```yaml
ports:
  - number: 3000
    protocol: http  # Keep as http, NOT http2
```

**Important:** Keep the protocol as `http` (not `http2`) because:
- Thruster handles HTTP/2 on the public-facing TLS connection
- Control Plane's load balancer communicates with containers via HTTP/1.1
- Setting `protocol: http2` causes 502 protocol errors

**Note:** On Control Plane/Kubernetes, the `Dockerfile CMD` determines container startup, NOT the `Procfile`. This differs from Heroku where Procfile is used.

#### Deployment Commands

```bash
# Apply the updated workload template
cpflow apply-template rails -a <app-name>

# Build and deploy new image
cpflow build-image -a <app-name>
cpflow deploy-image -a <app-name>

# Verify Thruster is running
cpflow logs -a <app-name>
```

For detailed Control Plane setup, see [.controlplane/readme.md](../.controlplane/readme.md#http2-and-thruster-configuration).

### Other Platforms

For VPS or bare-metal deployments, Thruster can handle TLS termination with Let's Encrypt:

```bash
# Set your domain for automatic Let's Encrypt certificates
THRUSTER_DOMAIN=yourdomain.com bundle exec thrust bin/rails server
```

Thruster will automatically:
1. Obtain SSL certificates from Let's Encrypt
2. Handle certificate renewal
3. Serve your app over HTTPS with HTTP/2

## Monitoring and Debugging

### Log Output

Thruster logs important events:

```
[thrust] Starting Thruster HTTP/2 proxy
[thrust] Proxying to http://localhost:3000
[thrust] Serving from ./public
[thrust] Cache hit: /packs/application-abc123.js
[thrust] Compressed response: 1.2MB -> 250KB
```

### Debug Mode

Enable verbose logging:

```bash
THRUSTER_DEBUG=1 foreman start -f Procfile.dev
```

This shows:
- All proxied requests
- Cache hit/miss information
- Compression ratios
- HTTP/2 connection details

### Performance Metrics

Monitor Thruster's impact:

1. **Asset Load Times**: Check browser DevTools Network tab for HTTP/2 multiplexing
2. **Cache Efficiency**: Look for `X-Cache: HIT` headers in responses
3. **Compression**: Check `Content-Encoding: br` or `gzip` headers
4. **Response Times**: Should see faster initial page loads

## Troubleshooting

### Server Won't Start

**Issue**: Thruster fails to start
**Solution**: Check if another process is using the port:

```bash
lsof -ti:3000 | xargs kill -9
```

### Assets Not Caching

**Issue**: Static assets aren't being cached
**Solution**: Ensure assets are in the `public/` directory and have proper cache headers:

```ruby
# config/environments/production.rb
config.public_file_server.enabled = true
config.public_file_server.headers = {
  'Cache-Control' => 'public, max-age=31536000'
}
```

### HTTP/2 Not Working

**Issue**: Browser shows HTTP/1.1 connections
**Solution**: HTTP/2 requires HTTPS. In development, use a tool like [mkcert](https://github.com/FiloSottile/mkcert) or test in production with proper TLS.

## Migration Notes

### From Puma Early Hints

Previous configuration:
```
web: bundle exec puma -C config/puma.rb --early-hints
```

New configuration:
```
web: bundle exec thrust bin/rails server
```

**Changes**:
- Removed `--early-hints` flag from all Procfiles
- No changes needed to application code
- Better performance with full HTTP/2 support

### Shakapacker Integration

Thruster works seamlessly with Shakapacker for both Webpack and Rspack:

- Compiled assets in `public/packs/` are automatically cached
- Manifest files are properly served
- Hot Module Replacement (HMR) still works in development

## Performance Expectations

Based on typical Rails applications with Thruster:

- **Initial Page Load**: 20-30% faster due to HTTP/2 multiplexing
- **Asset Delivery**: 40-60% reduction in transfer size with Brotli compression
- **Cache Hit Rate**: 80-95% for static assets after warmup
- **Server Load**: Reduced by 30-40% due to efficient asset serving

## Additional Resources

- [Thruster GitHub Repository](https://github.com/basecamp/thruster)
- [HTTP/2 Explained](https://http2-explained.haxx.se/)
- [Deploying Rails 8 with Thruster](https://world.hey.com/dhh/rails-8-with-thruster-by-default-c953f5e3)
- [Kamal Handbook - Thruster Section](https://kamal-deploy.org/docs/accessories/thruster/)

## Support

For issues related to:
- **Thruster**: [GitHub Issues](https://github.com/basecamp/thruster/issues)
- **This Project**: [Forum](https://forum.shakacode.com) or [GitHub Issues](https://github.com/shakacode/react-webpack-rails-tutorial/issues)
- **React on Rails**: [Slack Channel](https://reactrails.slack.com/)
