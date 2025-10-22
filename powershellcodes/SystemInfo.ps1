# Prepare output folder
$out = "$env:USERPROFILE\Desktop\DeviceAudit_$(Get-Date -Format yyyyMMdd_HHmmss)"
New-Item -Path $out -ItemType Directory -Force | Out-Null

# System summary
systeminfo > "$out\systeminfo.txt"

# Installed programs (registry)
$keys = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall","HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall","HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall"
foreach ($k in $keys) { Get-ItemProperty -Path $k\* -ErrorAction SilentlyContinue | Select DisplayName,DisplayVersion,Publisher,InstallDate | Out-File -Append "$out\InstalledPrograms.txt" }

# Defender status + recent Defender events
Get-MpComputerStatus | Out-File "$out\DefenderStatus.txt"
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Windows Defender/Operational';StartTime=(Get-Date).AddDays(-7)} -MaxEvents 200 | Select TimeCreated,Id,Message | Out-File "$out\DefenderEvents.txt"

# Security log logons (last 7 days) - requires admin
$start=(Get-Date).AddDays(-7)
Get-WinEvent -FilterHashtable @{LogName='Security';StartTime=$start} -MaxEvents 1000 | Where-Object { $_.Id -in 4624,4625,4648,4672 } |
  Select TimeCreated,Id,Message | Out-File "$out\SecurityLogons_7days.txt"

# Network snapshot & public IP
Get-NetIPConfiguration | Out-File "$out\NetIPConfig.txt"
Get-NetTCPConnection -State Established | Select LocalAddress,LocalPort,RemoteAddress,RemotePort,OwningProcess,State | Out-File "$out\EstablishedConnections.txt"
(Invoke-RestMethod -Uri "https://ipinfo.io/json") | ConvertTo-Json | Out-File "$out\PublicIP.json"

# Recent files in common locations
Get-ChildItem -Path "$env:USERPROFILE\Desktop","$env:USERPROFILE\Downloads","$env:USERPROFILE\Documents" -Recurse -ErrorAction SilentlyContinue |
  Where-Object {!$_.PSIsContainer} | Sort-Object LastWriteTime -Descending | Select-Object FullName,LastWriteTime -First 200 | Out-File "$out\RecentFiles.txt"

# Compress into zip on Desktop
$zip = "$env:USERPROFILE\Desktop\DeviceAudit.zip"
If (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path "$out\*" -DestinationPath $zip -Force
Write-Host "Audit package created: $zip"
