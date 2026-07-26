# Create Desktop / Start Menu shortcuts for medley-manager.
#   pnpm desktop:install
# Note: keep this file ASCII-only so both Windows PowerShell 5.1 and pwsh parse it
# identically regardless of the console code page.
$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$vbs = Join-Path $PSScriptRoot 'medley-manager.vbs'
$icon = Join-Path $PSScriptRoot 'medley-manager.ico'

# Generate the icon (blue rounded square + music note) if missing.
if (-not (Test-Path $icon)) {
    Add-Type -AssemblyName System.Drawing
    $size = 256
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.TextRenderingHint = 'AntiAliasGridFit'
    $g.Clear([System.Drawing.Color]::Transparent)

    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(0, 119, 199))
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $r = 48
    $path.AddArc(0, 0, $r, $r, 180, 90)
    $path.AddArc(($size - $r), 0, $r, $r, 270, 90)
    $path.AddArc(($size - $r), ($size - $r), $r, $r, 0, 90)
    $path.AddArc(0, ($size - $r), $r, $r, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)

    $font = New-Object System.Drawing.Font 'Segoe UI Symbol', 140, ([System.Drawing.FontStyle]::Bold)
    $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $fmt = New-Object System.Drawing.StringFormat
    $fmt.Alignment = 'Center'
    $fmt.LineAlignment = 'Center'
    $rect = New-Object System.Drawing.RectangleF 0, 0, $size, $size
    $g.DrawString([string][char]0x266B, $font, $white, $rect, $fmt)
    $g.Dispose()

    # Write as .ico (a PNG wrapped in an ICO container; supported since Vista).
    $png = New-Object System.IO.MemoryStream
    $bmp.Save($png, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngBytes = $png.ToArray()
    $fs = [System.IO.File]::Create($icon)
    $bw = New-Object System.IO.BinaryWriter $fs
    $bw.Write([UInt16]0); $bw.Write([UInt16]1); $bw.Write([UInt16]1)  # ICONDIR
    $bw.Write([Byte]0); $bw.Write([Byte]0)                            # 256x256 is encoded as 0,0
    $bw.Write([Byte]0); $bw.Write([Byte]0)
    $bw.Write([UInt16]1); $bw.Write([UInt16]32)
    $bw.Write([UInt32]$pngBytes.Length)
    $bw.Write([UInt32]22)                                             # image data offset
    $bw.Write($pngBytes)                                              # the PNG itself
    $bw.Close(); $fs.Close(); $png.Dispose(); $bmp.Dispose()
    Write-Host "icon generated: $icon"
}

$shell = New-Object -ComObject WScript.Shell
$targets = @(
    (Join-Path ([Environment]::GetFolderPath('Desktop')) 'Medley Manager.lnk'),
    (Join-Path ([Environment]::GetFolderPath('StartMenu')) 'Programs\Medley Manager.lnk')
)

foreach ($t in $targets) {
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $t) | Out-Null
    $sc = $shell.CreateShortcut($t)
    $sc.TargetPath = 'wscript.exe'
    $sc.Arguments = "`"$vbs`""
    $sc.WorkingDirectory = $repo
    $sc.IconLocation = $icon
    $sc.Description = 'Medley Manager - nicomedo manager'
    $sc.Save()
    Write-Host "shortcut created: $t"
}
