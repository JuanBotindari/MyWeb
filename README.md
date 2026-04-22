Perfecto. Aquí tienes el contenido completo y listo para copiar y pegar directamente en tu archivo `README.md`:

---

```markdown
# Mi Web - Next.js con CI/CD

[![Deploy to Hostinger](https://github.com/tu-usuario/tu-repositorio/actions/workflows/deploy.yml/badge.svg)](https://github.com/tu-usuario/tu-repositorio/actions/workflows/deploy.yml)

## 📖 Descripción

Este proyecto es una web estática construida con **Next.js** (modo `output: 'export'`) que se despliega automáticamente en **Hostinger** mediante **GitHub Actions** cada vez que se hace `git push` a la rama `main`.

## 🚀 Demo

🔗 [Ver sitio en vivo](http://deeppink-pony-429859.hostingersite.com)

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| Next.js 14 | Framework React con exportación estática |
| TypeScript | Tipado estático |
| GitHub Actions | CI/CD automatizado |
| Hostinger | Hosting compartido |
| rsync + SSH | Transferencia de archivos |

## 📂 Estructura del proyecto

```
├── .github/workflows/
│   └── deploy.yml      # Workflow de despliegue automático
├── app/                 # Páginas y componentes Next.js
├── public/              # Archivos estáticos (imágenes, fuentes)
├── styles/              # Estilos CSS/SCSS
├── next.config.mjs      # Configuración de Next.js
├── package.json         # Dependencias y scripts
└── README.md            # Este archivo
```

## 🔧 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Generar versión estática
npm run build

# Probar la versión estática localmente
npx serve out
```

## 🚀 Despliegue automático

El despliegue es **totalmente automático**. Solo necesitas:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

GitHub Actions se encargará de:
1. Construir el proyecto (generar carpeta `out/`)
2. Conectarse por SSH a Hostinger
3. Sincronizar los archivos mediante rsync
4. Actualizar la web en menos de 3 minutos

## 🔐 Secretos de GitHub (requeridos)

Para que el despliegue funcione, en **Settings → Secrets and variables → Actions** deben existir:

| Secreto | Valor |
|---------|-------|
| `SSH_KEY` | Clave privada SSH para conectarse a Hostinger |
| `SSH_HOST` | IP del servidor Hostinger (`82.112.247.251`) |
| `SSH_USER` | Usuario SSH (`u480820322`) |
| `SSH_PORT` | Puerto SSH (`65002`) |
| `DEPLOY_PATH` | Ruta completa a `public_html` en Hostinger |

### 📍 Ruta de despliegue utilizada

```
/home/u480820322/domains/deeppink-pony-429859.hostingersite.com/public_html
```

## 📝 Configuración de Next.js

**`next.config.mjs`** (configuración para exportación estática):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Necesario para hosting compartido
  trailingSlash: true,     // Opcional: mejora rutas relativas
  images: {
    unoptimized: true,     // Desactiva optimización de imágenes
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

## ⚙️ Workflow de GitHub Actions

**`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Setup SSH key
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts 2>/dev/null || true

      - name: Deploy via rsync
        run: |
          rsync -avz --delete \
            --exclude='.git' \
            --exclude='.github' \
            -e "ssh -i ~/.ssh/deploy_key -p ${{ secrets.SSH_PORT }}" \
            ./out/ \
            ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}/

      - name: Cleanup
        if: always()
        run: rm -f ~/.ssh/deploy_key
```

## 🐛 Solución de problemas comunes

| Problema | Posible solución |
|----------|------------------|
| Error 403 en la web | Verificar que se está subiendo la carpeta `out/` y no todo el proyecto |
| `Permission denied (publickey)` | Agregar la clave pública SSH en Hostinger (hPanel → SSH Access) |
| No se ve el workflow en Actions | Verificar que `deploy.yml` esté en `.github/workflows/` y se haya hecho push |
| Error `No such file or directory` | Revisar que `DEPLOY_PATH` sea la ruta correcta (ejecutar `pwd` dentro de `public_html` por SSH) |

## 📊 Estado del último despliegue

![Workflow Status](https://github.com/tu-usuario/tu-repositorio/actions/workflows/deploy.yml/badge.svg)

## 📄 Licencia

[Especifica tu licencia aquí, ej: MIT]

## ✨ Créditos

Desarrollado con ❤️ usando Next.js y desplegado automáticamente con GitHub Actions + Hostinger.
```

---

## 📝 Instrucciones para usar este README:

1. **Copia todo el contenido** del bloque de código de arriba
2. **Pégalo en tu archivo `README.md`** (en la raíz de tu proyecto)
3. **Reemplaza** `tu-usuario/tu-repositorio` por tu usuario y nombre de repo (aparece 3 veces: en el badge, en el clone URL y en el badge de estado)
4. **Guarda el archivo**
5. **Súbelo a GitHub**:

```bash
git add README.md
git commit -m "Add comprehensive README with CI/CD documentation"
git push origin main
```

---

**¿Necesitas que ajuste algo del README (como agregar más secciones o cambiar algún detalle)?**