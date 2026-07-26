' Launch the desktop app without showing a console window.
' Shortcuts point at this file.
' Note: keep this file ASCII-only - wscript reads .vbs using the system code page,
' so UTF-8 multibyte comments would corrupt the script.
Option Explicit
Dim fso, sh, repo
Set fso = CreateObject("Scripting.FileSystemObject")
Set sh = CreateObject("WScript.Shell")
' This script lives in <repo>/desktop/, so the grandparent folder is the repo root.
repo = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName))
' 0 = hidden window, False = do not wait for it to finish
sh.Run "cmd /c cd /d """ & repo & """ && pnpm desktop", 0, False
