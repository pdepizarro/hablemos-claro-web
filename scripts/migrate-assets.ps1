# migrate-assets.ps1
# Copia los recursos estáticos necesarios a public/ para que Next.js los sirva.
# Ejecutar desde la raíz del proyecto una sola vez antes de npm run dev:
#   .\scripts\migrate-assets.ps1

$root = Split-Path -Parent $PSScriptRoot

Write-Host "Migrando assets..."

# Carpetas de imagen
$folders = @(
    @{ src = "img\components"; dst = "public\img\components" },
    @{ src = "img\help"; dst = "public\img\help" },
    @{ src = "img\volenteer"; dst = "public\img\volenteer" },
    @{ src = "img\news"; dst = "public\img\news" },
    @{ src = "img\about"; dst = "public\img\about" },
    @{ src = "img\banner"; dst = "public\img\banner" }
)

foreach ($pair in $folders) {
    $srcPath = Join-Path $root $pair.src
    $dstPath = Join-Path $root $pair.dst
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Recurse -Force
        Write-Host "OK $($pair.src) -> $($pair.dst)"
    }
}

# Archivos sueltos
$files = @(
    @{ src = "img\footer_logo.png"; dst = "public\img\footer_logo.png" },
    @{ src = "img\logo.png"; dst = "public\img\logo.png" },
    @{ src = "img\favicon.png"; dst = "public\favicon.png" },
    @{ src = "img\favicon.ico"; dst = "public\favicon.ico" }
)

foreach ($pair in $files) {
    $srcPath = Join-Path $root $pair.src
    $dstPath = Join-Path $root $pair.dst
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "OK $($pair.src) -> $($pair.dst)"
    }
}

Write-Host ""
Write-Host "Assets migrados. Ejecuta 'npm install' y luego 'npm run dev'."
