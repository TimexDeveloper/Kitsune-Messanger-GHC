# Changelog

Все заметные изменения в проекте Fox Messenger будут документированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2024-01-15

### Added

- 🚀 Initial release of Fox Messenger
- 👤 Guest account authentication
- 💬 Personal messaging between users
- 🖼️ Image upload and sharing
- ☎️ Voice/Video call interface (WebRTC foundation)
- 🎨 Dark theme with orange accent color
- 📱 Responsive design (mobile, tablet, desktop)
- 🔐 NextAuth.js integration ready
- ⚡ Vercel deployment ready
- 📚 Comprehensive documentation
- 🐍 API documentation with examples
- 🏗️ Architecture documentation
- 📖 Deployment guide
- 🤝 Contributing guidelines

### Features

- **Authentication**
  - Guest login with custom name
  - [Guest] badge display
  - Session token storage
  - 30-day session expiration

- **Chat**
  - Real-time conversation list
  - Message history
  - Typing indicators (foundation)
  - User online/offline status (foundation)

- **Media**
  - Image upload up to 5MB
  - Image preview in chat
  - Image compression ready

- **UI/UX**
  - Dark theme by default
  - Orange color scheme
  - Responsive sidebar
  - Responsive message list
  - Smooth animations
  - Loading states

- **API**
  - RESTful endpoints
  - Bearer token authentication
  - Input validation
  - Error handling
  - CORS enabled

- **Database** (Optional)
  - Vercel Postgres integration
  - User management
  - Conversation management
  - Message storage
  - Session tracking

- **Deployment**
  - Vercel optimized
  - Serverless functions
  - Environment variables
  - Auto-scaling
  - CDN distribution

## [Unreleased]

### Planned

- [ ] Real-time messaging with WebSocket
- [ ] WebRTC implementation for calls
- [ ] Message reactions and threading
- [ ] Group chats
- [ ] User profiles and avatars
- [ ] Message search
- [ ] Dark/light mode toggle
- [ ] Desktop notifications
- [ ] Message editing and deletion
- [ ] Message pinning
- [ ] User presence indicators
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message forwarding
- [ ] User blocking
- [ ] Conversation muting
- [ ] Two-factor authentication
- [ ] End-to-end encryption
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] API rate limiting
- [ ] Advanced search
- [ ] Analytics dashboard

### Under Consideration

- OAuth providers (GitHub, Google, Discord)
- Third-party integrations
- Bot support
- Custom themes
- Message scheduling
- Auto-reply
- Spam filtering
- AI-powered replies

## Version 0.x (Pre-release)

### 0.1.0

- Project initialization
- Basic folder structure
- Configuration setup
- Documentation scaffolding

---

## How to Read This Changelog

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute improvements.

## Support

For questions or issues:
- 📖 Check [README.md](./README.md)
- 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- 🔌 Check [API.md](./API.md)
- 🚀 Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 Create an issue on GitHub
- 💬 Start a discussion on GitHub
