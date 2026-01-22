# BELVRR Monorepo Setup Script for Windows PowerShell
# Run this from your cherry project folder

param(
    [string]$ZipPath = "$env:USERPROFILE\Downloads\belvrr-monorepo.zip",
    [switch]$SkipGitCommit,
    [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Step { param($msg) Write-Host "`n🚀 $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }

# Header
Write-Host ""
Write-Host "================================================" -ForegroundColor Magenta
Write-Host "   BELVRR Monorepo Setup Script" -ForegroundColor Magenta
Write-Host "   Bundle ID: com.huddler.belvrr" -ForegroundColor Magenta
Write-Host "   Firebase: cherry-76821" -ForegroundColor Magenta
Write-Host "================================================" -ForegroundColor Magenta
Write-Host ""

# Check if we're in a git repo
if (-not (Test-Path ".git")) {
    Write-Error "Not in a git repository. Please run this from your cherry project folder."
    exit 1
}

# Get current directory
$ProjectDir = Get-Location
Write-Host "📁 Project directory: $ProjectDir" -ForegroundColor Gray

# ============================================
# STEP 1: Commit current work
# ============================================
if (-not $SkipGitCommit) {
    Write-Step "Committing current work..."
    
    # Check for uncommitted changes
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "   Found uncommitted changes, staging..." -ForegroundColor Gray
        git add .
        git commit -m "feat: complete Perspective life visualization app

- Week grid visualization (4,160 weeks = 80 years)
- Life stats, cosmic perspective, natural world sections
- Weekly time budget and mastery calculations
- Multi-language support (en-US, es-ES, zh-CN)
- Deployed to cherry-76821.web.app"
        
        Write-Host "   Pushing to origin..." -ForegroundColor Gray
        git push origin main
        Write-Success "Committed and pushed to main"
    } else {
        Write-Host "   No uncommitted changes found" -ForegroundColor Gray
    }
    
    # Create migration branch
    Write-Host "   Creating migration branch..." -ForegroundColor Gray
    $branchExists = git branch --list "feature/belvrr-monorepo-migration"
    if ($branchExists) {
        git checkout feature/belvrr-monorepo-migration
        Write-Warning "Branch already exists, switched to it"
    } else {
        git checkout -b feature/belvrr-monorepo-migration
        Write-Success "Created branch: feature/belvrr-monorepo-migration"
    }
}

# ============================================
# STEP 2: Extract and copy monorepo files
# ============================================
Write-Step "Extracting monorepo files..."

# Check if zip exists
if (-not (Test-Path $ZipPath)) {
    Write-Error "ZIP file not found at: $ZipPath"
    Write-Host ""
    Write-Host "Please download belvrr-monorepo.zip and either:" -ForegroundColor Yellow
    Write-Host "  1. Place it in your Downloads folder" -ForegroundColor Yellow
    Write-Host "  2. Run with: .\setup-belvrr.ps1 -ZipPath 'C:\path\to\belvrr-monorepo.zip'" -ForegroundColor Yellow
    exit 1
}

# Create temp extraction folder
$TempDir = "$env:TEMP\belvrr-extract-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

Write-Host "   Extracting to temp folder..." -ForegroundColor Gray
Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force

# Copy files (excluding node_modules if exists)
Write-Host "   Copying files to project..." -ForegroundColor Gray
$SourceDir = "$TempDir\belvrr-monorepo"

# Copy all files and folders
Get-ChildItem -Path $SourceDir -Force | ForEach-Object {
    $dest = Join-Path $ProjectDir $_.Name
    if ($_.PSIsContainer) {
        Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
    } else {
        Copy-Item -Path $_.FullName -Destination $dest -Force
    }
    Write-Host "   Copied: $($_.Name)" -ForegroundColor Gray
}

# Cleanup temp folder
Remove-Item -Path $TempDir -Recurse -Force
Write-Success "Monorepo files extracted"

# ============================================
# STEP 3: Preserve existing Firebase config
# ============================================
Write-Step "Checking Firebase configuration..."

if (Test-Path ".firebaserc") {
    Write-Host "   Found existing .firebaserc" -ForegroundColor Gray
} else {
    # Create .firebaserc if it doesn't exist
    $firebaserc = @{
        projects = @{
            default = "cherry-76821"
        }
    } | ConvertTo-Json
    $firebaserc | Out-File -FilePath ".firebaserc" -Encoding utf8
    Write-Success "Created .firebaserc for cherry-76821"
}

# ============================================
# STEP 4: Install dependencies
# ============================================
if (-not $SkipInstall) {
    Write-Step "Installing dependencies..."
    
    # Check if npm is available
    try {
        $npmVersion = npm --version
        Write-Host "   npm version: $npmVersion" -ForegroundColor Gray
    } catch {
        Write-Error "npm not found. Please install Node.js first."
        exit 1
    }
    
    # Install root dependencies
    Write-Host "   Installing root dependencies..." -ForegroundColor Gray
    npm install
    
    # Install workspace dependencies
    Write-Host "   Installing workspace dependencies..." -ForegroundColor Gray
    npm install --workspaces
    
    Write-Success "Dependencies installed"
    
    # ============================================
    # STEP 5: Build core package
    # ============================================
    Write-Step "Building @belvrr/core package..."
    
    # Install tsup for core package build
    Set-Location "packages\core"
    npm install
    
    # Check if tsup is installed
    if (-not (Test-Path "node_modules\.bin\tsup.cmd")) {
        Write-Host "   Installing tsup..." -ForegroundColor Gray
        npm install tsup --save-dev
    }
    
    npm run build
    Set-Location $ProjectDir
    
    Write-Success "Core package built"
}

# ============================================
# STEP 6: Stage changes
# ============================================
Write-Step "Staging changes for commit..."
git add .
Write-Success "Changes staged"

# ============================================
# Summary
# ============================================
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   ✅ BELVRR Monorepo Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Structure:" -ForegroundColor Cyan
Write-Host "   packages/core/    - Shared TypeScript logic (BUILT)"
Write-Host "   packages/web/     - Vite + React + Tailwind"
Write-Host "   packages/mobile/  - Expo + React Native"
Write-Host ""
Write-Host "🔧 Next commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   # Start development server" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   # Or start just the web app" -ForegroundColor Yellow
Write-Host "   cd packages\web" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   # Commit the migration" -ForegroundColor Yellow
Write-Host "   git commit -m 'feat: migrate to BELVRR monorepo'" -ForegroundColor White
Write-Host "   git push -u origin feature/belvrr-monorepo-migration" -ForegroundColor White
Write-Host ""
Write-Host "📱 For iOS App Store:" -ForegroundColor Cyan
Write-Host "   cd packages\mobile" -ForegroundColor White
Write-Host "   npx eas-cli login" -ForegroundColor White
Write-Host "   npx eas-cli build --platform ios" -ForegroundColor White
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
