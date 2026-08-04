# RGL Portfolio

Standalone static reconstruction of Raúl García Lemus's Kanz AI portfolio. Open `index.html` directly or serve this directory with any static web server. It has no runtime dependency on the original Kanz application or database.

## Production deployment

Production URL: `https://aiportfolio.beetikmx.com`

Every push to `main` deploys the static files to `/var/www/RGL-Portfolio` on EC2. The repository must contain these GitHub Actions secrets:

- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

They use the same values as the Web-Beetik and Quiniela-Malenka repositories. GitHub does not allow an encrypted repository secret to be read or copied, so add the values to this repository under **Settings → Secrets and variables → Actions**.

### One-time EC2 setup

After the DNS `A` record for `aiportfolio.beetikmx.com` points to the EC2 public IP, copy the `deploy` directory to the server and run:

```bash
chmod +x deploy/setup-ec2.sh
./deploy/setup-ec2.sh
```

The script creates the Caddy site, validates the complete configuration and reloads Caddy. Caddy obtains and renews the HTTPS certificate automatically.
