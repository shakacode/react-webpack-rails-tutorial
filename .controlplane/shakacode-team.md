# Internal Notes to the Shakacode Team

## Deployment

Deployments are handled by Control Plane configuration in this repo and GitHub Actions.

### Review Apps
- Add a comment `/deploy-review-app` to any PR to deploy a review app

### Staging Environment
- **Automatic**: Any merge to the `master` branch automatically deploys to staging
- **URLs**:
  - [Control Plane Console - Staging](https://console.cpln.io/console/org/shakacode-open-source-examples-staging/gvc/react-webpack-rails-tutorial-staging/workload/rails/-info)
  - [Staging App](https://staging.reactrails.com/)

### Production Environment
- **Manual**: Run the [promote-staging-to-production workflow](https://github.com/shakacode/react-webpack-rails-tutorial/actions/workflows/promote-staging-to-production.yml) on GitHub
- **URLs**:
  - [Control Plane Console - Production](https://console.cpln.io/console/org/shakacode-open-source-examples-production/gvc/react-webpack-rails-tutorial-production/workload/rails/-info)
  - [Production App](https://reactrails.com/)

See [./README.md](./README.md) for more details.

## Links

- [Control Plane Org for Staging and Review Apps](https://console.cpln.io/console/org/shakacode-open-source-examples-staging/-info)
- [Control Plane Org for Deployed App](https://console.cpln.io/console/org/shakacode-open-source-examples/-info)
